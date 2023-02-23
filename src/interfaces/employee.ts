import dayjs, { Dayjs } from "dayjs"
import { EditableCellProps } from "./commons"

export interface UserDefaultProps {
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  joined_date: Dayjs
  role?: string
}

export interface EmployeeProps extends UserDefaultProps {
  id: string
}

export const EmployeeInitialValues:EmployeeProps = {
  id: '',
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  gender: '',
  joined_date: dayjs(),
  role: 'standard'
}

export interface EmployeeEditCellProps extends EditableCellProps {
  dataIndex: keyof UserDefaultProps;
  record: UserDefaultProps;
  handleSave: (record: UserDefaultProps) => void;
}