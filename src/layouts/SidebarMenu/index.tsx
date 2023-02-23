import { FC, useState } from 'react';
import type { MenuProps } from 'antd';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Menu } from 'antd';

import './SidebarMenu.css';

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

const SideBarMenu:FC = () => {
  // const [current, setCurrent] = useState<string>('home');
  const location = useLocation();

  // const onClick:MenuProps['onClick'] = (e) => {
  //   setCurrent(e.key);
  // }

  return <Menu 
    className='sidebar-container' 
    // onClick={onClick} 
    selectedKeys={[location.pathname.replace('/', '')]} 
    mode="vertical" 
    items={items} 
    theme='dark' 
    
  />
}

export default SideBarMenu;