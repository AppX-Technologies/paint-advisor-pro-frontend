import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./components/404";
import Layout from "./routing/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomSnackBar from "./components/Snackbar";
import RegisterPage from "./pages/Register";
import ProtectedRoute from './routing/ProtectedRoute'
import CompanyDashboard from "./pages/CompanyDashboard";

function App() {
  const {token} = JSON.parse(localStorage.getItem("user")) || {token: null};
  
  return (
    <>
      <Router>
      <CustomSnackBar/>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Counter />} />
            <Route path="login" element={token ? <Navigate to="/" /> :<Login />} />
            <Route path="register" element={token ? <Navigate to="/" /> : <RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="company" >
            <Route path="/company" element={<CompanyDashboard orgAdmin />} />
              <Route path=":companyId" element={<CompanyDashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
