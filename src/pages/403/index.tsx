import { Layout, Typography } from "antd"

const Forbidden = () => {

  return (
    <Layout style={{ display: 'flex', height: '100%' }}>
      <div style={{ textAlign: 'center', margin: 'auto' }}>
        <Typography.Title level={1}>403</Typography.Title>
        <Typography.Text>Forbidden</Typography.Text>
      </div>
    </Layout>
  )
}

export default Forbidden;