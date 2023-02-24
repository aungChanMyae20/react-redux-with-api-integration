import { FC, useState } from 'react';
import type { MenuProps } from 'antd';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import './SidebarMenu.css';
import { useAppSelector } from '../../app/hooks';
import { shallowEqual } from 'react-redux';
import { selectStoreAuth } from '../../features/auth/authSlice';

const items: MenuProps['items'] = [
  {
    label: <RouterLink to="/home">Home</RouterLink>,
    key: 'home'
  },
  {
    label: <RouterLink to="/charts">Chart</RouterLink>,
    key: 'charts'
  }
]

const check = ["charts"]

const SideBarMenu:FC = () => {
  const location = useLocation();
  const authData = useAppSelector(selectStoreAuth, shallowEqual);

  const user = authData.auth.user;

  let preparedMenus = items;

  if ( user?.role !== 'admin' ){
    preparedMenus = items.filter((item:any) => !check.includes(item.key) )
  }

  return <Menu 
    className='sidebar-container' 
    // onClick={onClick} 
    selectedKeys={[location.pathname.replace('/', '')]} 
    mode="vertical" 
    items={preparedMenus} 
    theme='dark' 
    
  />
}

export default SideBarMenu;