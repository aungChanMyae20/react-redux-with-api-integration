import { Navigate, RouteObject } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import PrivateLayout from '../layouts/PrivateLayout';
import HomePage from '../pages/home';
import ChartsPage from '../pages/chart';
import PublicLayout from '../layouts/PublicLayout';
import LoginPage from '../pages/login';
// import Login from '../pages/Login';
// import PublicLayout from '../layouts/PublicLayout';
// import PrivateLayout from '../layouts/PrivateLayout';
// import Employees from '../pages/employees';
// import PageNotFound from '../pages/404';
// import Forbidden from '../pages/403';
// import EmployeeReport from '../pages/charts';

const routes: RouteObject[] = [
  {
    path: '/',
    // element: <PrivateRoute component={PrivateLayout} />,
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
        element: <div>Page not found - 404</div>
      },
      {
        path: '403',
        element: <div>Forbidden - 403</div>
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
        element: <div>Page not found - 404</div>
      }
    ]
  },
  {
    path: '*',
    element: <div>Page not found - 404</div>
  }
];

export default routes;