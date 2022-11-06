import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import PageNotFound from './components/404';
import CustomSnackBar from './components/Snackbar';
import { Counter } from './features/counter/Counter';
import CompanyDashboard from './pages/CompanyDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Processes } from './pages/Processes';
import Profile from './pages/Profile';
import RegisterPage from './pages/Register';
import Layout from './routing/Layout';
import ProtectedRoute from './routing/ProtectedRoute';
import RestrictedRoutes from './routing/RestrictedRoute';

function App() {
  const [userDetails, setUserDetails] = useState();
  const { pathname } = useLocation();
  useEffect(() => {
    setUserDetails(
      JSON.parse(localStorage.getItem('user')) || {
        token: null
      }
    );
  }, [pathname]);

  return (
    <>
      <CustomSnackBar />
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Counter />} />
          <Route element={<RestrictedRoutes />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route
              path='dashboard'
              element={
                userDetails && userDetails.token && userDetails.role === 'Admin' && <Dashboard />
              }
            />
            <Route
              path='processes'
              element={
                userDetails && userDetails.token && userDetails.role === 'Admin' && <Processes />
              }
            />{' '}
            <Route
              path='profile'
              element={
                userDetails && userDetails.token && userDetails.role === 'Admin' && <Profile />
              }
            />
          </Route>
        </Route>
        <Route path='*' element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route path='company'>
            <Route path='/company' element={<CompanyDashboard />} />
            <Route path='/company/:companyId' element={<CompanyDashboard isSystemAdmin />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
