import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError(""); // Clear error message

    try {
      const email = localStorage.getItem("email");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/password/reset",
        { email, password }
      );
      console.log(response.data.message); 
      
      alert("Password updated successfully!");
      
      localStorage.removeItem("email");
      
      navigate("/");
    } catch (error) {
      console.error("Error updating password:", error);
      console.error("Failed to update password. Please try again later.");
    }
  };

  return (
    <div className="container1">
      <div className="container2">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Change Password</p>

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

          <label>
            <input
              required
              placeholder=""
              type="password"
              className="input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span>Confirm password</span>
          </label>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="submit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
