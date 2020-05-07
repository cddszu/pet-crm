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
    specially: props.values.specially,
    age: props.values.age,
    sex: props.values.sex,
    phone: props.values.phone,
  });


  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
    list,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    formVals.name = fieldsValue.name;
    formVals.specially = fieldsValue.specially;
    formVals.age = fieldsValue.age;
    formVals.sex = fieldsValue.sex;
    formVals.phone = fieldsValue.phone;

    console.log(formVals)
    handleUpdate(formVals);
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
          specially: formVals.specially,
          age: formVals.age,
          sex: formVals.sex,
          phone: formVals.phone,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
