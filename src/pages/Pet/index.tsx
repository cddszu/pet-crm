import { PlusOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Button, Divider, message, Modal, Input } from 'antd';
import React, { useState, useRef, useCallback } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule, getList, getMasList } from './service';

const { Search } = Input;
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在提交');
  try {
    await updateRule({
      name: fields.name,
      id: fields.id,
      type: fields.type,
      master: fields.master,
      birth: fields.birth,
      ill: fields.ill,
      desc: fields.desc,
    });
    hide();

    message.success('提交成功');
    return true;
  } catch (error) {
    hide();
    message.error('提交失败请重试！');
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (item : TableListItem) => {
  const hide = message.loading('正在删除');
  if (!item) return true;
  try {
    await removeRule({
      id: item.id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};



const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [speLists, getSpeLists] = useState<Array<string>>([]);
  const [masterLists, getMasterLists] = useState<Array<string>>([]);
  const actionRef = useRef<ActionType>();

  const [searchKey, SetSearchKey] = useState<string>('')


  const columns: ProColumns<TableListItem>[] = [ 
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '宠物名',
      dataIndex: 'name',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '宠物名为必填项',
        },
      ],
    },
    {
      title: '宠物类别',
      dataIndex: 'type',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '宠物类别为必填项',
        },
      ],
    },
    {
      title: '主人',
      dataIndex: 'master',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '主人为必填项',
        },
      ],
      render: (text: any) => {
        return <a onClick={() => showMaster(text)} >{text.name}</a>
      }
    },
    {
      title: '生日',
      dataIndex: 'birth',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '生日为必填项',
        },
      ],
    },
    {
      title: '病例',
      dataIndex: 'ill',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '病例为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '描述为必填项',
        },
      ],
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              addDo('edit')
              setStepFormValues(record);
            }}
          >
            编辑
          </a>
          <Divider type="vertical" />
          <a
            onClick={async (e) => {
              await handleRemove(record);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            删除
          </a>
        </>
      ),
    },
  ];

  const getMasterL = async () => {
    const list = await getMasList();
    if(list.data.length>0){
      getMasterLists(list.data);
    }
  }

  const getDate = useCallback(async (params) => {
    const newParams = {
      ...params,
      searchKey
    }
    return queryRule(newParams)
  }, [searchKey]) 

  const showMaster = useCallback((info: any) => {
    Modal.info({
      title: info.name,
      content: (
        <div>
          <p>城市： {info.city}</p>
          <p>地址： {info.address}</p>
          <p>手机号： {info.phone}</p>
        </div>
      )
    });
  },[]) 

  const search = useCallback((sk: string) => {
    console.log(sk)
    SetSearchKey(sk)
    actionRef.current?.reload(true)
  }, [])

  const addDo = async (type:string) => {
    getMasterL();
    const list = await getList();
    if(list.data.length>0){
      getSpeLists(list.data);
    }
    if(type === 'edit'){
      handleUpdateModalVisible(true);
    }else{
      handleModalVisible(true);
    }
  }

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle=""
        actionRef={actionRef}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<TableListItem>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        search={false}
        dateFormatter={'string'}
        toolBarRender={(action, { selectedRows }) => [
          <Search onSearch={search} placeholder="请输入宠物或者主人的姓名" />,
          <Button type="primary" onClick={() => addDo('add')}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => getDate(params)}
        columns={columns}
        rowSelection={false}
        options={false}
      />
    
      {createModalVisible && <CreateForm 
        modalVisible={createModalVisible}
        list = {speLists}
        masterList = {masterLists}
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
          setStepFormValues({});
        }}
      >}
      </CreateForm>}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          list = {speLists}
          masterList = {masterLists}
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default TableList;
