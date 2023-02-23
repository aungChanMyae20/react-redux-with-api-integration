import { FC } from "react"
import { Typography } from "antd";

import './pageHeader.css';

const { Title } = Typography;

interface PageHeaderProps {
  title: string
}

const PageHeader:FC<PageHeaderProps> = ({ title }) => {
  return (
    <div className="header-container">
      <Title level={2}>{title}</Title>
    </div>
  )
}

export default PageHeader;