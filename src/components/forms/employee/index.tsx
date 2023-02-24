import { FC } from 'react';
import { Form, Input, Row, Col, Radio, DatePicker, Button } from 'antd';
import { EmployeeInitialValues, EmployeeProps } from '../../../interfaces/employee';
import * as yup from 'yup';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const phoneReg = /\+65(6|8|9)\d{7}/g;

let schema = yup.object().shape({
  first_name: yup.string().required('First name is required.')
    .min(6, "Minimum 6 characters.")
    .max(10, "Maximum 10 characters."),
  last_name: yup.string().required('Last name is required.')
    .min(6, "Minimum 6 characters.")
    .max(10, "Maximum 10 characters."),
  email: yup.string().email('Invalid email.')
    .required('Email is required.'),
  phone_number: yup.string()
    .required('Phone number is required.')
    .matches(phoneReg, 'Invalid phone number.'),
  gender: yup.string()
    .required('Gender is required.'),
  joined_date: yup.string()
    .required('Joined date is required.')
})

export const employeeSchemaSync = {
  async validator({ field }:any, value:any) {
    await schema.validateSyncAt( field, { [field]: value })
  }
}

interface EmployeeFormProps {
  target: EmployeeProps | null
  handleClose: () => void
  handleSave: (values:EmployeeProps) => void;
}

const EmployeeForm:FC<EmployeeFormProps> = ({
  target,
  handleClose,
  handleSave
}) => {

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current > dayjs().endOf('day');
  };

  return (
    <div>
      <Form
        name="employee_form"
        initialValues={target ?? EmployeeInitialValues}
        onFinish={handleSave}
        layout='vertical'
        requiredMark={false}
        wrapperCol={{
          sm: 24
        }}
      >
        <Row gutter={[20, 20]}>
          <Col sm={24} md={12}>
            <Form.Item name="first_name" label="First name" rules={[employeeSchemaSync]}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item name="last_name" label="Last name" rules={[employeeSchemaSync]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col sm={24} md={12}>
            <Form.Item name="email" label="Email" rules={[employeeSchemaSync]}>
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} md={12}>
            <Form.Item name="phone_number" label="Phone number" rules={[employeeSchemaSync]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item name="gender" label="Gender" rules={[employeeSchemaSync]}>
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <Form.Item name="joined_date" label="Joined date" rules={[employeeSchemaSync]}>
              <DatePicker disabledDate={disabledDate} format={'DD/MM/YYYY'}  />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[20, 20]}>
          <Col span={24} style={{ display: 'flex', justifyContent: 'end', gap: 20 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default EmployeeForm;