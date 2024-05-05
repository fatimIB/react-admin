import React, { useState } from 'react';

const TwoFactorVerification = () => {
  const [digits, setDigits] = useState(['', '', '', '']);

  const handleChange = (index, value) => {
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
  };

  const handleVerify = () => {
    // Check if all digits are entered
    const isVerified = digits.every(digit => digit !== '');
    if (isVerified) {
      // Implement verification logic here
      console.log('Verification successful');
    } else {
      console.log('Please enter all digits');
    }
  };

  const handleClear = () => {
    setDigits(['', '', '', '']);
  };

  return (
    <form className="form">
      <span className="close">X</span>

      <div className="info">
        <span className="title">Two-Factor Verification</span>
        <p className="description">
          Enter the two-factor authentication code provided by the authenticator app
        </p>
      </div>

      <div className="input-fields">
        {digits.map((digit, index) => (
          <input
            key={index}
            placeholder=""
            type="tel"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        ))}
      </div>

      <div className="action-btns">
        <button className="verify" type="button" onClick={handleVerify}>Verify</button>
        <button className="clear" type="button" onClick={handleClear}>Clear</button>
      </div>
    </form>
  );
};

export default TwoFactorVerification;
