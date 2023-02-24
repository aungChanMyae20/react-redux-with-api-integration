import { Navigate, RouteObject } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import PrivateLayout from '../layouts/PrivateLayout';
import HomePage from '../pages/home';
import ChartsPage from '../pages/chart';
import PublicLayout from '../layouts/PublicLayout';
import LoginPage from '../pages/login';
import PageNotFound from '../pages/404';
import Forbidden from '../pages/403';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <PrivateRoute component={PrivateLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/home" />,
      },
      {
        path: 'home',
        element: <HomePage />
      },
      {
        path: 'charts',
        element: <ChartsPage />
      },
      {
        path: '404',
        element: <PageNotFound />
      },
      {
        path: '403',
        element: <Forbidden />
      }
    ]
  },
  {
    path: '/',
    element: <PublicRoute component={PublicLayout} />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" />
      },
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: '404',
        element: <PageNotFound />
      }
    ]
  },
  {
    path: '*',
    element: <PageNotFound />
  }
];

export default routes;