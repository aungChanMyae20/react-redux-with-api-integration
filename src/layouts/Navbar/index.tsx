import { Button, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Navbar.css';

const items: MenuProps['items'] = [
  {
    key: 'logout',
    label: 'Log out',
    danger: true
  }
]

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <Dropdown menu={{items}}>
        <Button type="text">
          User Name
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}

export default Navbar;