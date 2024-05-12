import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State variable to track loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true when form is submitted

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/login",
        {
          email,
          password,
        }
      );

      const { user, token } = response.data;
      sessionStorage.setItem("token", token);
      window.location.href = "/home";
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Wrong credentials. Please try again.");
      } else {
        setError("Failed to login. Please try again later.");
      }
    } finally {
      setLoading(false); // Reset loading state whether request succeeds or fails
    }
  };

  return (
    <div className="container1">
      <div className="container2">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Login</p>
          <label>
            <input
              required
              placeholder=""
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </label>
          <Link className="forgotpass" to="/ForgotPassword">
            Forgot Password
          </Link>
          <button type="submit" className="submit" disabled={loading}>
            {loading ? "Logging in..." : "Submit"} {/* Display loading indicator or submit text */}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
