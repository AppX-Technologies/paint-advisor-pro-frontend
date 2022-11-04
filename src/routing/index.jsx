import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageNotFound from '../components/404';
import { Counter } from '../features/counter/Counter';
import { SYSTEM_ROLES } from '../helpers/contants';
import ProtectedRouteLayout from '../layouts/ProtectedRouteLayout';
import PublicRouteLayout from '../layouts/PublicRouteLayout';
import CompanyDashboard from '../pages/CompanyDashboard';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import { Processes } from '../pages/Processes';
import Profile from '../pages/Profile';
import RegisterPage from '../pages/Register';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

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
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='processes' element={<Processes />} />
          <Route path='profile' element={<Profile />} />
          <Route path='company'>
            <Route path=':companyId' element={<CompanyDashboard isSystemAdmin />} />
          </Route>
        </Route>
        {/* FOR ALL ROLES */}
        <Route element={<ProtectedRoute />}>
          <Route path='company'>
            <Route path='' element={<CompanyDashboard />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
