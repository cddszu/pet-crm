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
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [formVals] = useState({
    name: '',
    specially: '',
  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleAdd,
    onCancel: handleUpdateModalVisible,
    modalVisible,
    list,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    formVals.name = fieldsValue.name;
    formVals.specially = fieldsValue.specially;
    formVals.age = fieldsValue.age;
    formVals.sex = fieldsValue.sex;
    formVals.phone = fieldsValue.phone;
    handleAdd(formVals);
  };

  const onGenderChange = (value:any) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        return;
    }
  };

  const renderContent = () => {
    let optList = [];
    list.map((item:any)=>{
      optList.push(<Option value={item.value} key={item.value}>{item.value}</Option>);
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
          name="specially"
          label="特长"
          rules={[{ required: true, message: '请选择特长！' }]}
        >
          <Select
            placeholder="请选择特长！"
            onChange={onGenderChange}
          >
            {optList}
          </Select>
        </FormItem>
        <FormItem
          name="phone"
          label="手机号"
          rules={[{ required: true, message: '请输入手机号！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem><FormItem
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请输入性别！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem><FormItem
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄！' }]}
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
      title="新建兽医"
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
          specially: formVals.specially,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default CreateForm;
