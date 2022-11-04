import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PageNotFound from '../components/404';
import { ALL_ROLES } from '../helpers/contants';

const ProtectedRoute = ({ rolesAllowed = ALL_ROLES }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to='login' />;
  }

  if (rolesAllowed && !rolesAllowed.includes(user.role)) {
    return <PageNotFound />;
  }
  // returns child route elements
  return <Outlet />;
};

export default ProtectedRoute;
