export interface LoginProps {
  email: string
  password: string
}

export const loginInitialValues = {
  email: '',
  password: ''
}

export interface LoggedInProps {
  id: string
  first_name: string
  last_name: string
  email: string
  phone_number: string
  gender: string
  role: string
  token: string
}