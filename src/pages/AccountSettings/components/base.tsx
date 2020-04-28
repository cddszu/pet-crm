import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Select, Upload, Form, message } from 'antd';
import { connect, FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';

import { CurrentUser } from '../data.d';
import PhoneView from './PhoneView';
import styles from './BaseView.less';

import { getAccountInfo, setAccountInfo} from '../../../utils/accountInfo'



const validatorPhone = (rule: any, value: string, callback: (message?: string) => void) => {
  const values = value.split('-');
  if (!values[0]) {
    callback('Please input your area code!');
  }
  if (!values[1]) {
    callback('Please input your phone number!');
  }
  callback();
};

interface BaseViewProps {
  currentUser?: CurrentUser;
}

class BaseView extends Component<BaseViewProps> {
  view: HTMLDivElement | undefined = undefined;
  state: any
  constructor(props: any) {
    super(props)
    this.state = {
      currentUser: getAccountInfo()
    }
  }

  getViewDom = (ref: HTMLDivElement) => {
    this.view = ref;
  };

  handleFinish = () => {
    message.success(formatMessage({ id: 'accountsettings.basic.update.success' }));
  };

  submitHandle = () => {
    setAccountInfo(this.state.currentUser)
  }

  formChange = (type: string, value: any) => {
    const {currentUser} = this.state
    currentUser[type] = value
    this.setState({
      currentUser: {...currentUser}
    })
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className={styles.baseView} ref={this.getViewDom}>
        <div className={styles.left}>
          <Form
            layout="vertical"
            onFinish={this.handleFinish}
            initialValues={currentUser}
            hideRequiredMark
          >
            <Form.Item
              name="name"
              label={formatMessage({ id: 'accountsettings.basic.nickname' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'accountsettings.basic.nickname-message' }, {}),
                },
              ]}
            >
              <Input 
                onChange={(value) => {this.formChange('name', value.target.value)}}
              />
            </Form.Item>
            <Form.Item
              name="password"
              label={formatMessage({ id: 'accountsettings.security.password' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'accountsettings.security.password-description' }, {}),
                },
              ]}
            >
              <Input 
                onChange={(value) => {this.formChange('password', value.target.value)}}
                type='password'
              />
            </Form.Item>
            <Form.Item
              name="desc"
              label={formatMessage({ id: 'accountsettings.basic.profile' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'accountsettings.basic.profile-message' }, {}),
                },
              ]}
            >
              <Input.TextArea
                placeholder={formatMessage({ id: 'accountsettings.basic.profile-placeholder' })}
                rows={4}
                onChange={(value) => {this.formChange('desc', value.target.value)}}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label={formatMessage({ id: 'accountsettings.basic.address' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'accountsettings.basic.address-message' }, {}),
                },
              ]}
            >
              <Input
                onChange={(value) => {this.formChange('address', value.target.value)}} 
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label={formatMessage({ id: 'accountsettings.basic.phone' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'accountsettings.basic.phone-message' }, {}),
                },
                { validator: validatorPhone },
              ]}
            >
              <Input 
                onChange={(value) => {this.formChange('phone', value.target.value)}}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" onClick={this.submitHandle}>
                <FormattedMessage
                  id="accountsettings.basic.update"
                  defaultMessage="Update Information"
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
        {/* <div className={styles.right}>
          <AvatarView avatar={this.getAvatarURL()} />
        </div> */}
      </div>
    );
  }
}

export default connect(
  ({ accountSettings }: { accountSettings: { currentUser: CurrentUser } }) => ({
    currentUser: accountSettings.currentUser,
  }),
)(BaseView);
