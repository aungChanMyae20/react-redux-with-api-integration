import { FC, useState, useEffect } from 'react';
import { App, Row, Col, Card, Statistic, Button, Modal, Typography, Popconfirm } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { EmployeeProps } from '../../interfaces/employee';
import { getAllEmployees, removeEmployee, selectEmployees, selectPageInfo } from '../../features/employees/employeesSlice';
import { shallowEqual } from 'react-redux';
import { ListProps, } from '../../interfaces/commons';

import EditableTable, { ColumnTypes } from '../table/editable';
import EmployeeForm, { employeeSchemaSync } from '../forms/employee';
import { PlusOutlined } from '@ant-design/icons';
import './employees.css';
import { addNewEmployee, updateEmployee } from '../../features/employees/employeesSlice';

const Employees:FC = () => {

  // const phoneReg = new RegExp(/\+65(6|8|9)\d{7}/g);

  const defaultColumns: (ColumnTypes[number] & { editable?: boolean; dataIndex: string, rules?: any, type?: string })[] = [
    { title: 'First name', dataIndex: 'first_name', width: 180, editable: true, rules: [employeeSchemaSync],
    },
    { title: 'Last name', dataIndex: 'last_name', width: 180, editable: true, rules: [employeeSchemaSync],
    },
    { title: 'Email', dataIndex: 'email', width: 200, editable: true, rules: [employeeSchemaSync] },
    { title: 'Phone number', dataIndex: 'phone_number', width: 200, editable: true, rules: [employeeSchemaSync] },
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
          <Button type="primary" onClick={() => openEditForm(value)}>Edit</Button>
          <Popconfirm
            title="Are you sure?"
            description="Please confirm to remove employee"
            onConfirm={() => handleRemove(value)}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Button type="text">Remove</Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  const { message } = App.useApp();

  const [employees, setEmployees] = useState<EmployeeProps[]>([]);
  const [listInfo, setListInfo] = useState<ListProps>({ page: 1, size: 10 })
  const [showForm, setShowForm] = useState<boolean>(false);
  const [employee, setEmployee] = useState<EmployeeProps | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const getEmployees = async ({ size, page }:ListProps) => {
    await dispatch(getAllEmployees({ size, page }))
  }

  useEffect(() => {
    getEmployees({ size: 10, page: 1 })
  }, [])

  const allEmployees = useAppSelector(selectEmployees, shallowEqual);
  const pageInfo = useAppSelector(selectPageInfo, shallowEqual);

  useEffect(() => {
    if (allEmployees.length > 0) {
      setEmployees(allEmployees)
    }
  }, [allEmployees])

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

  const handleSave = (values:any) => {
    update(values)
  }

  useEffect(() => {
    getEmployees(listInfo)
  }, [listInfo, pageInfo])

  const openNewForm = () => {
    setShowForm(true)
    setEmployee(null)
  }

  const openEditForm = (id:string) => {
    const target = employees.filter((employee) => employee.id === id);
    if (target.length > 0) {
      setEmployee({ ...target[0], joined_date: dayjs(target[0].joined_date)});
      setShowForm(true);
    }
  }

  const closeForm = () => {
    setEmployee(null);
    setShowForm(false);
  }

  // form submit

  const create = async (values:EmployeeProps) => {
    const res = await dispatch(addNewEmployee({ 
      ...values, 
      joined_date: dayjs(values.joined_date).valueOf()
    }))
    if (res) {
      message.success('Employee added')
      setShowForm(false)
      setEmployee(null)
    }
  }

  const update = async (values:EmployeeProps) => {
    const res = await dispatch(updateEmployee({ 
      id: employee?.id, 
      ...values, 
      joined_date: dayjs(values.joined_date).valueOf()
    }))
    if (res) {
      message.success('Employee updated')
      setShowForm(false)
      setEmployee(null)
    }
  }

  const remove = async (id: string) => {
    const res = await dispatch(removeEmployee(id))
    if (res) {
      message.success('Employee removed')
      getEmployees(listInfo);
    }
  }

  const handleSubmit = (values:EmployeeProps) => {
    employee ? update(values) : create(values)
  }

  const handleRemove = (id: string) => {
    remove(id)
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
            <Col xs={24} md={24} lg={4} xl={4} 
              style={{ 
                display: 'grid', 
                justifyContent: 'end', 
                alignItems: 'center', 
                paddingRight: 20 
              }}
            >
              <Button type="primary" onClick={openNewForm} icon={<PlusOutlined />}>Add New Employee</Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={15}>
            <Col span={24}>
              <Card>
                <EditableTable 
                  title="Employees" 
                  dataSource={employees} 
                  columns={columns} 
                  pageInfo={pageInfo}
                  handlePageChange={setListInfo}
                />
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
          <EmployeeForm 
            target={employee} 
            handleClose={closeForm} 
            handleSave={handleSubmit} 
          />
        </div>
      </Modal>
    </div>
  )
}

export default Employees;