import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select} from 'antd';

import { TableListItem } from '../data.d';

const { Option } = Select;
const FormItem = Form.Item;

interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: any) => void;
  onSubmit: (values: any) => void;
  modalVisible: boolean;
  list: any[];
  masterList: any[];
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formVals] = useState({
    name: '',
    id: '',
    type: '',
    master: '',
    birth: '',
    ill: '',
    desc: '',
  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleAdd,
    onCancel: handleUpdateModalVisible,
    modalVisible,
    list,
    masterList,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    formVals.name = fieldsValue.name;
    formVals.type = fieldsValue.type;
    formVals.master = fieldsValue.master;
    formVals.birth = fieldsValue.birth;
    formVals.ill = fieldsValue.ill;
    formVals.desc = fieldsValue.desc;
    handleAdd(formVals);
  };

  const renderContent = () => {
    let optionList = [];
    list.map((item:any)=>{
      optionList.push(<Option value={item.value} key={item.value}>{item.value}</Option>);
    })
    let mList = [];
    masterList.map((item:any)=>{
      mList.push(<Option value={item.value} key={item.value}>{item.value}</Option>);
    })
    return (
      <>
        <FormItem
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="type"
          label="类型"
          rules={[{ required: true, message: '请选择类型！' }]}
        >
          <Select
            placeholder="请选择类型！"
          >
            {optionList}
          </Select>
        </FormItem>
        <FormItem
          name="master"
          label="主人名称"
          rules={[{ required: true, message: '请选择主人名称！' }]}
        >
          <Select
            placeholder="请选择主人名称！"
          >
            {mList}
          </Select>
        </FormItem>
        <FormItem
          name="birth"
          label="生日"
          rules={[{ required: true, message: '请输入生日！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="ill"
          label="病例"
          rules={[{ required: true, message: '请输入病例！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="desc"
          label="描述"
          rules={[{ required: true, message: '请输入描述！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      destroyOnClose
      title="新建"
      visible={modalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          name: formVals.name,
          type: formVals.type,
          master: formVals.master,
          birth: formVals.birth,
          ill: formVals.ill,
          desc: formVals.desc,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
