import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import SideBarMenu from '../SidebarMenu';
import Navbar from '../Navbar';

import './PrivateLayout.css';

const { Header, Sider, Content } = Layout;

const PrivateLayout = () => {
  return (
    <Layout hasSider>
      <Sider className="container" width={260} >
        <SideBarMenu />
      </Sider>
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header">
          <Navbar />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default PrivateLayout;