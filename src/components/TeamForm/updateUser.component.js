import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = ({ user, onClose }) => {
  const [userData, setUserData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    phone: user.phone
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const response = await axios.put(
        `http://127.0.0.1:8000/api/admin/users/${user.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('User updated successfully:', response.data);
      onClose(); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Failed to update user. Please try again.');
    }
  };

  // Styles
  const formContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(2px)', // backdrop filter for blur effect
  };

  const formStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    textAlign: 'center',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
    fontSize: '20px',
  };

  const updateButtonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '16px',
  };

  return (
    <div className="update-form">
      <div style={formContainerStyle}>
        <div style={formStyle}>
          <span style={closeButtonStyle} onClick={onClose}>X</span>
          <h2>Update User: {user.firstname} {user.lastname}</h2>
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
          />
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
          />
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
          />
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
          />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button style={updateButtonStyle} onClick={handleSubmit}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
