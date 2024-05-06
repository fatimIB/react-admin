import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const TwoFactorVerification = () => {
  const [digits, setDigits] = useState(['', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate(); 

  const handleChange = (index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerify = () => {
    const isVerified = digits.every((digit) => digit !== '');
    if (isVerified) {
      const code = digits.join('');
      const email = localStorage.getItem('email'); 
      axios.post('http://127.0.0.1:8000/api/password/reset/verify', { email, code })
        .then((response) => {
          console.log(response.data.message);
          
          navigate('/changePassword');
        })
        .catch((error) => {
          console.error(error.response.data.error);
        });
    } else {
      console.log('Please enter all digits');
    }
  };

  const handleClear = () => {
    setDigits(['', '', '', '']);
    inputRefs[0].current.focus();
  };

  return (
    <div className="container">
      <form className="formD">
        <div className="info">
          <span className="title">Email Verification</span>
          <p className="description">Enter the four-digit code sent to your email for verification</p>
        </div>

        <div className="input-fields">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              placeholder=""
              type="tel"
              maxLength="1"
              value={digit}
              onChange={(e) => {
                const input = e.target.value;
                if (/^\d*$/.test(input)) {
                  handleChange(index, input);
                }
              }}
              pattern="\d"
            />
          ))}
        </div>

        <div className="action-btns">
          <button className="verify" type="button" onClick={handleVerify}>Verify</button>
          <button className="clear" type="button" onClick={handleClear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default TwoFactorVerification;
