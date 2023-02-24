import { Layout, Typography } from "antd"

const PageNotFound = () => {

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex'}}>
      <div style={{ textAlign: 'center', margin: 'auto' }}>
        <Typography.Title level={1}>404</Typography.Title>
        <Typography.Text>Page not found</Typography.Text>
      </div>
    </Layout>
  )
}

export default PageNotFound;