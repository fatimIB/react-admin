import React from 'react';
import { Link } from "react-router-dom"; 

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div className="container">
    <div className="form-container">
      <div className="logo-container">
        Forgot Password
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required />
        </div>

        <button className="form-submit-btn" type="submit">Send Email</button>
      </form>

      <p class="signin">
          You don't have an account? <Link to="/signup">Sign up right now</Link> {/* Use Link instead of <a> */}
        </p>
    </div>
    </div>
  );
};

export default ForgotPassword;
