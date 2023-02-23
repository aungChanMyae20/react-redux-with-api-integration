import { FC } from "react";
import PageHeader from "../../components/commons/pageHeader";

import './home.css';
import Employees from "../../components/employees";

const HomePage:FC = () => {

  

  return (
    <div>
      <PageHeader title="Home" />

      <Employees />
    </div>
  )
}

export default HomePage;