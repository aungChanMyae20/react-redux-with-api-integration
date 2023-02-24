import React, { ComponentType, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectStoreAuth } from '../../features/auth/authSlice';

interface Props {
  component: ComponentType
}

const PublicRoute: FC<Props> = ({ component: RouteComponent }) => {
  const auth = useAppSelector(selectStoreAuth);

  if (auth.auth.isLoggedIn) {
    return <Navigate to="/home" />
  }

  return <RouteComponent />;
}

export default PublicRoute;