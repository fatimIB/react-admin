import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Store email in local storage
      localStorage.setItem('email', email);

      const response = await axios.post('http://127.0.0.1:8000/api/password/reset/request', {
        email: email
      });
      
      console.log('Verification code sent successfully:', response.data.message); 
      navigate('/TwoFactorVerification');
    } catch (error) {
      console.error('Error sending verification code:', error);
      console.error('Failed to send verification code. Please try again later.');
    }
  };

  return (
    <div className="containerE">
      <div className="form-container">
        <div className="logo-container">
          Forgot Password
        </div>

        <form className="formE" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input style={{width:200}} 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <button className="form-submit-btn" type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
