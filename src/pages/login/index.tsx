import { useAppDispatch } from "../../app/hooks";
import { LoginProps } from "../../interfaces/auth";
import { userLogin } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { Card, Layout } from "antd";
import LoginForm from "../../components/forms/login";

import './LoginPage.css';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values:LoginProps) => {
    const res = await dispatch(userLogin(values))
    if (res.payload.id) {
      navigate('/home')
    }
  }

  return (
    <Layout style={{ width: '100%', height: '100vh', display: 'flex'}}>
      <div className="login-form-container">
        <Card>
          <LoginForm handleSubmit={handleSubmit} />
        </Card>
      </div>
    </Layout>
  )
}

export default LoginPage;