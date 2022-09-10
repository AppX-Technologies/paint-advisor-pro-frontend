import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/404";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Router>
        <Header />
        {/* Switch is changes to Routes in react router v6 */}
        <Routes>
          <Route path="/" element={<Counter />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
