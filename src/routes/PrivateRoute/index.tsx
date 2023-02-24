import { ComponentType, FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectStoreAuth } from '../../features/auth/authSlice';
import { shallowEqual } from 'react-redux';

interface Props {
  component: ComponentType
}

const protectedPath = '/charts';

const PrivateRoute:FC<Props> = ({ component: RouteComponent }) => {
  const location = useLocation();

  const auth = useAppSelector(selectStoreAuth, shallowEqual);
  
  const token = localStorage.getItem("auth");

  const isProtected = () => {
    const { pathname } = location;
    return pathname.includes(protectedPath);
  }

  if (!auth.auth.isLoggedIn && !token) {
    return <Navigate to="/login" />;
  }

  if (isProtected() && auth.auth.user?.role !== 'admin') {
    return <Navigate to='/403' />
  }

  !!isProtected && <Navigate to="/403" />

  return <RouteComponent />;
}

export default PrivateRoute;