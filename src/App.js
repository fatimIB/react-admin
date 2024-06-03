import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login.component';
import ForgotPassword from './components/ForgotPassword/forgotPasswordRequest.component';
import Home from './components/home.component';
import TwoFactorVerification from './components/ForgotPassword/digitsVerification.component';
import ChangePassword from './components/ForgotPassword/changePassword.component';
import Products from './components/Product.component';
import Team from './components/Team.component';
import SaleApp from './components/Sales.component';
import Points from './components/Points.component';
import Withdraw from './components/Withdraw.component';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Profile from './components/Profile.component';
import './App.css';
import './forgotPassword.css';
import './digits.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute element={Login} />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/TwoFactorVerification" element={<TwoFactorVerification />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="/home" element={<PrivateRoute element={Home} />} />
        <Route path="/Products" element={<PrivateRoute element={Products} />} />
        <Route path="/Team" element={<PrivateRoute element={Team} />} />
        <Route path="/SaleApp" element={<PrivateRoute element={SaleApp} />} />
        <Route path="/Points" element={<PrivateRoute element={Points} />} />
        <Route path="/Withdraw" element={<PrivateRoute element={Withdraw} />} />
        <Route path="/Profile" element={<PrivateRoute element={Profile} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
