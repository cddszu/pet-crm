import React, { useState } from 'react';
import { Form, Button, Input, Modal, Select} from 'antd';

import { TableListItem } from '../data.d';

const { Option } = Select;

export interface FormValueType extends Partial<TableListItem> {
  id?: number;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
  list: any[];
  masterList: any[];
}
const FormItem = Form.Item;

export interface UpdateFormState {
  formVals: FormValueType;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals] = useState<FormValueType>({
    name: props.values.name,
    id: props.values.id,
    type: props.values.type,
    master: props.values.master,
    birth: props.values.birth,
    ill: props.values.ill,
    desc: props.values.desc,
  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
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
    handleUpdate(formVals);
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
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="编辑"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
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

export default UpdateForm;
