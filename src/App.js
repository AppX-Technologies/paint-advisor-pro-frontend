import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/404";
import Header from "./components/Header";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomSnackBar from "./components/Snackbar";

function App() {
  return (
    <>
      <Router>
        <Header />
        <CustomSnackBar/>
        {/* Switch is changes to Routes in react router v6 */}
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
