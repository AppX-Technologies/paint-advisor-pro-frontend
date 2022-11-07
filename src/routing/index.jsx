import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import PageNotFound from '../components/404';
import { Counter } from '../features/counter/Counter';
import { COMPANY_ROLES, SYSTEM_ROLES } from '../helpers/contants';
import AdminRouteLayout from '../layouts/AdminRouteLayout';
import CompanyRouteLayout from '../layouts/CompanyRouteLayout';
import ProtectedRouteLayout from '../layouts/ProtectedRouteLayout';
import PublicRouteLayout from '../layouts/PublicRouteLayout';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import { Processes } from '../pages/Processes';
import Profile from '../pages/Profile';
import RegisterPage from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import { companyRoutes } from './routes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicRouteLayout />}>
        <Route path='/' element={<Counter />} />
        <Route element={<PublicRoute />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Route>
      {/* PRIVATE ROUTES */}
      <Route element={<ProtectedRouteLayout />}>
        {/* ONLY FOR SYSTEM ADMINS */}
        <Route element={<ProtectedRoute rolesAllowed={SYSTEM_ROLES} />}>
          <Route element={<AdminRouteLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='processes' element={<Processes />} />
          </Route>
          <Route path='company'>
            <Route path=':companyId'>
              <Route element={<CompanyRouteLayout isSystemAdmin />}>
                {companyRoutes().map(({ relLink, element: Element }) => (
                  <Route key={relLink} path={relLink} element={<Element />} />
                ))}
                <Route path='*' element={<PageNotFound />} />
              </Route>
              <Route path='' element={<Navigate to='bids' />} />
            </Route>
            <Route path='' element={<PageNotFound />} />
          </Route>
        </Route>
        {/* FOR COMPANY ROLES */}
        <Route element={<ProtectedRoute rolesAllowed={COMPANY_ROLES} />}>
          <Route path='company'>
            <Route element={<CompanyRouteLayout />}>
              {companyRoutes().map(({ relLink, element: Element }) => (
                <Route path={relLink} element={<Element />} />
              ))}
              <Route path='*' element={<PageNotFound />} />
            </Route>
            <Route path='' element={<Navigate to='bids' />} />
          </Route>
        </Route>
        {/* <Route path='profile' element={<Profile />} /> */}
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
