import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Signup from './components/signup.component'; 
import Login from './components/login.component';
import ForgotPassword from './components/forgotPasswordRequest.component';
import Home from './components/home.component';
import './App.css';
import './forgotPassword.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
);
}

export default App;
