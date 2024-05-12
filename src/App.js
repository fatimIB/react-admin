import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Login from './components/login.component';
import ForgotPassword from './components/forgotPasswordRequest.component';
import Home from './components/home.component';
import TwoFactorVerification from './components/digitsVerification.component';
import ChangePassword from './components/changePassword.component';
import Products from './components/Product.component';
import Team from './components/Team.component';
import SaleApp from './components/Sales.component';
import './App.css';
import './forgotPassword.css';
import './digits.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/TwoFactorVerification" element={<TwoFactorVerification />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Team" element={<Team />} /> 
        <Route path="/SaleApp" element={<SaleApp />} /> 

      </Routes>
    </BrowserRouter>
);
}

export default App;
