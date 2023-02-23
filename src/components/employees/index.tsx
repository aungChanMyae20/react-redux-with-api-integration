import { FC, useState } from 'react';
import { Row, Col, Card, Statistic, Button, Modal, Typography } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

import './employees.css';
import EditableTable, { ColumnTypes } from '../table/editable';
import { EmployeeProps } from '../../interfaces/employee';
import EmployeeForm from '../forms/employee';
import { PlusOutlined } from '@ant-design/icons';

const Employees:FC = () => {

  const dataSet:EmployeeProps[] = [
    { id: '1', first_name: 'Joe', last_name: 'Biden', email: 'joe.biden@amil.omc', phone_number: '+658765498', gender: 'male', joined_date: dayjs() },
    { id: '2', first_name: 'Joe', last_name: 'Biden', email: 'joe.biden@amil.omc', phone_number: '+658765498', gender: 'male', joined_date: dayjs() },
    { id: '3', first_name: 'Joe', last_name: 'Biden', email: 'joe.biden@amil.omc', phone_number: '+658765498', gender: 'male', joined_date: dayjs() },
    { id: '4', first_name: 'Joe', last_name: 'Biden', email: 'joe.biden@amil.omc', phone_number: '+658765498', gender: 'male', joined_date: dayjs() },
    { id: '5', first_name: 'Joe', last_name: 'Biden', email: 'joe.biden@amil.omc', phone_number: '+658765498', gender: 'male', joined_date: dayjs() },
    { id: '6', first_name: 'Joe', last_name: 'Biden', email: 'joe.biden@amil.omc', phone_number: '+658765498', gender: 'male', joined_date: dayjs() }
  ]

  // const phoneReg = new RegExp(/\+65(6|8|9)\d{7}/g);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string, rules?: any, type?: string })[] = [
    { title: 'First name', dataIndex: 'first_name', width: 180, editable: true, rules: [
      { required: true, message: 'First name is required.' },
      { min: 6, message: 'Minimum 6 characters.' },
      { max: 10, message: 'Maximum 10 characters.' }
    ],
    },
    { title: 'Last name', dataIndex: 'last_name', width: 180, editable: true, rules: [
      { required: true, message: 'First name is required.' },
      { min: 6, message: 'Minimum 6 characters.' },
      { max: 10, message: 'Maximum 10 characters.' }
    ],
    },
    { title: 'Email', dataIndex: 'email', width: 200, editable: true, rules: [
      { required: true, message: 'Email is required.'},
      { type: 'email', message: 'Invalid email.'}
    ] },
    { title: 'Phone number', dataIndex: 'phone_number', width: 150, editable: true, rules: [
      { required: true, message: 'Phone number is required.'},
      // { type: 'regexp', pattern: /\+65(6|8|9)\d{7}/g, message: 'Invalid phone number.'}
    ] },
    { title: 'Gender', dataIndex: 'gender', width: 100,
      render: (value:string) => (
        <p style={{ textTransform: 'capitalize', margin: 0 }}>{value}</p>
      )
    },
    { title: 'Joined date', dataIndex: 'joined_date', width: 200,
      render: (value:Dayjs) => dayjs(value).format('DD/MM/YYYY')
    },
    { title: '', dataIndex: 'id', 
      render: (value:string) => (
        <div className='actions-container'>
          <Button type="primary" onClick={() => openForm(value)}>Edit</Button>
          <Button type="text">Remove</Button>
        </div>
      )
    }
  ];

  const [showForm, setShowForm] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);

  const handleSave = (values:any) => {
    console.log('save', values);
  }

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: EmployeeProps) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        rules: col.rules ? col.rules : null,
        handleSave,
      }),
    };
  });

  const openForm = (id:string) => {
    const target = dataSet.filter((employee) => employee.id === id);
    if (target.length > 0) {
      setEmployee(target[0]);
      setShowForm(true);
    }
  }

  const closeForm = () => {
    setEmployee(null);
    setShowForm(false);
  }

  return (
    <div className="home-features">
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Row gutter={15} justify={'space-between'}>
            <Col xs={24} md={24} lg={8} xl={8}>
              <Card bordered={false}>
                <Row gutter={5}>
                  <Col span={6}>
                    <Statistic title="Day Off" value={4} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Vacation" value={3} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Ill" value={2} />
                  </Col>
                  <Col span={6}>
                    <Statistic title="Total Attended" value={100} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={24} lg={4} xl={4} style={{ display: 'grid', justifyContent: 'end', alignItems: 'center', paddingRight: 20 }}>
              <Button type="primary" onClick={() => setShowForm(true)} icon={<PlusOutlined />}>Add New Employee</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={15}>
            <Col span={24}>
              <Card>
                <EditableTable title="Employees" dataSource={dataSet} columns={columns} />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        open={showForm}
        footer={null}
        destroyOnClose
        onCancel={closeForm}
      >
        <Typography.Title level={4} style={{ marginBottom: 20 }}>Employee Form</Typography.Title>
        <div>
          <EmployeeForm target={employee} handleClose={closeForm} handleSave={handleSave} />
        </div>
      </Modal>
    </div>
  )
}

export default Employees;