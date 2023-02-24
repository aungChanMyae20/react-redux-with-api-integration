import { ComponentType, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectStoreAuth } from '../../features/auth/authSlice';

interface Props {
  component: ComponentType
}

const protectedPath = '/charts';

const PrivateRoute:FC<Props> = ({ component: RouteComponent }) => {
  const location = useLocation();

  const auth = useAppSelector(selectStoreAuth);
  const token = localStorage.getItem("auth");

  const isProtected = () => {
    const { pathname } = location;
    return pathname.includes(protectedPath);
  }

  if (!auth.auth.isLoggedIn && !token) {
    return <Navigate to="/login" />;
  }

  !!isProtected && <Navigate to="/403" />

  return <RouteComponent />;
}

export default PrivateRoute;