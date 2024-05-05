import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Login = () => {
  return (
    <div className="container1">
       <div className="container2">
      <form className="form">
        <p className="title">Login</p>
        <label>
          <input required placeholder="" type="email" className="input" />
          <span>Email</span>
        </label>

        <label>
          <input required placeholder="" type="password" className="input" />
          <span>Password</span>
        </label>
        <Link className="forgotpass" to="/ForgotPassword">Forgot Password</Link> {/* Use Link instead of <a> */}
        <button className="submit">Submit</button>
        <p className="signin">
          You don't have an account? <Link to="/signup">Signup</Link> {/* Use Link instead of <a> */}
        </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
