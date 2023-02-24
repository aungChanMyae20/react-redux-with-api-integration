import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const PublicLayout = () => {

  return (
    <Layout>
      <div>
        <Outlet />
      </div>
    </Layout>
  )
}

export default PublicLayout;