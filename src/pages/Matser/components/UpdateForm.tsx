import React, { useState } from 'react';
import { Form, Button, Input, Modal} from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  id?: number;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
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
    address: props.values.address,
    city: props.values.city,
    phone: props.values.phone,
    sex: props.values.sex,
    age: props.values.age,
  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    formVals.name = fieldsValue.name;
    formVals.address = fieldsValue.address;
    formVals.city = fieldsValue.city;
    formVals.phone = fieldsValue.phone;
    formVals.age = fieldsValue.age;
    formVals.sex = fieldsValue.sex;
    handleUpdate(formVals);
  };

  const renderContent = () => {
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
          name="age"
          label="年龄"
          rules={[{ required: true, message: '请输入年龄！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="sex"
          label="性别"
          rules={[{ required: true, message: '请输入性别！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="address"
          label="地址"
          rules={[{ required: true, message: '请输入地址！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="city"
          label="城市"
          rules={[{ required: true, message: '请输入城市！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="phone"
          label="手机号码"
          rules={[{ required: true, message: '请输入手机号码！' }]}
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
          address: formVals.address,
          city: formVals.city,
          phone: formVals.phone,
          age: formVals.age,
          sex: formVals.sex,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
