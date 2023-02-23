import { FC } from 'react';
import { Form, Input, Row, Col, Button, Typography } from 'antd';
import * as yup from 'yup';
import { LoginProps, loginInitialValues } from '../../../interfaces/auth';

import './LoginForm.css';

let schema = yup.object().shape({
  email: yup.string().required('Email is required.')
    .email('Invalid email.'),
  password: yup.string().required('Password is required')
})

const yupSync = {
  async validator({ field }:any, value: any) {
    await schema.validateSyncAt( field, { [field]: value })
  }
}

interface LoginFormProps {
  handleSubmit: (values: LoginProps) => void
}

const LoginForm:FC<LoginFormProps> = ({ handleSubmit }) => {

  return (
    <div className='login-form'>
      <Form
        name="login_form"
        initialValues={loginInitialValues}
        onFinish={handleSubmit}
        layout="vertical"
        wrapperCol={{ sm: 24 }}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Typography.Title level={2} style={{ textAlign: 'center' }}>Log in</Typography.Title>
          </Col>
        </Row>
        <Row gutter={[10, 5]}>
          <Col span={24}>
            <Form.Item name="email" label="Email" rules={[yupSync]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="password" label="Password" rules={[yupSync]}>
              <Input.Password />
            </Form.Item>
          </Col>
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType='submit'>
              Log in
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default LoginForm;