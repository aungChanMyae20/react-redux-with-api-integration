import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

const PublicLayout = () => {

  return (
    <Layout>
      <div className='public-page-container'>
        <Outlet />
      </div>
    </Layout>
  )
}

export default PublicLayout;