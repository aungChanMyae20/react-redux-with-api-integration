import React, { useContext, useEffect, useRef, useState } from 'react';
import { InputRef, Typography } from 'antd';
import { Form, Input, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
import { EmployeeEditCellProps, EmployeeProps } from '../../../interfaces/employee';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form key={`${index}_editTable`} form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell: React.FC<EmployeeEditCellProps> = (props) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  const {
    title,
    editable,
    children,
    dataIndex,
    record,
    rules,
    handleSave,
    ...restProps
  } = props;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={rules!}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {children}
      </div>
    );
  }

  return <td key={`${title}_${dataIndex}`} {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

interface EditTableProps {
  title: string
  dataSource: EmployeeProps[]
  columns: any
}

const EditableTable: React.FC<EditTableProps> = ({
  title,
  dataSource,
  columns
}) => {

  const [data, setDate] = useState(dataSource);

  useEffect(() => {
    setDate(dataSource.map((item:any) => ({ ...item, key: `${item.id}_${item.email}` })))
  }, [dataSource])

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 20 }}>{title}</Typography.Title>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data}
        columns={columns as ColumnTypes}
        pagination={{
          position: ["bottomCenter"],
          hideOnSinglePage: true
        }}
      />
    </div>
  );
};

export default EditableTable;