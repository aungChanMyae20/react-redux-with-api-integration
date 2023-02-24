import { Button, MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './Navbar.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearUserInfo } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { loggedOut, selectStoreAuth } from '../../features/auth/authSlice';
import { shallowEqual } from 'react-redux';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectStoreAuth, shallowEqual);

  const logout = () => {
    dispatch(clearUserInfo())  
    dispatch(loggedOut())
    localStorage.clear()
    navigate('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      danger: true,
      label: 'Log out',
      onClick: logout
    }
  ]

  return (
    <div className='navbar-container'>
      <Dropdown menu={{ items }} >
        <Button type="text">
          {user.auth.user?.first_name}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  )
}

export default Navbar;