import { FC } from "react";

import PageHeader from "../../components/commons/pageHeader";
import Employees from "../../components/employees";
import './home.css';

const HomePage:FC = () => {

  return (
    <div>
      <PageHeader title="Home" />

      <Employees />
    </div>
  )
}

export default HomePage;