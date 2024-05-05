import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();

    const formData = {
      firstname,
      lastname,
      email,
      address,
      phone,
      password,
    };

    try {
      
      const response = await axios.post('http://127.0.0.1:8000/api/admin/register', formData);

      
      toast.success('Registration successful!');
      const token = response.data.access_token; 
      sessionStorage.setItem('token', token);
      navigate('/home');
    } catch (error) {
      console.error('Error registering:', error);
      toast.error('Failed to register. Please try again later.');
    }
  };

  return (
    <div className="container1">
      <div className="container2">
        <form onSubmit={signup} className="form">
          <p className="title">Register</p>
          <div className="flex">
            <label>
              <input required placeholder="" type="text" className="input" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
              <span>Firstname</span>
            </label>

            <label>
              <input required placeholder="" type="text" className="input" value={lastname} onChange={(e) => setLastname(e.target.value)} />
              <span>Lastname</span>
            </label>
          </div>
          <label>
            <input required placeholder="" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
            <span>Email</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input" value={address} onChange={(e) => setAddress(e.target.value)} />
            <span>Address</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <span>Mobile Phone</span>
          </label>

          <label>
            <input required placeholder="" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span>Password</span>
          </label>
            <button type="submit" className="submit">Submit</button>
          <p className="signin">
            You already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
