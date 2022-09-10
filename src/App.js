import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageNotFound from './components/404';

function App() {
  return (
    <div className="App">
      <Router>
				<Routes>
					<Route path="/" element={<Counter/>}/>
					<Route path="*" element={<PageNotFound/>}/>
				</Routes>
			</Router>
    </div>
  );
}

export default App;
