import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserDetails = ({ user, onClose }) => {
  const [points, setPoints] = useState(null);
  const [sales, setSales] = useState(null);

  useEffect(() => {
    fetchPoints();
    fetchSales();
  }, []);

  const fetchPoints = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/points/${user.id}`);
      setPoints(response.data.total_points); // Setting the total points from the response
    } catch (error) {
      console.error('Error fetching points:', error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/sales/total/${user.id}`);
      setSales(response.data); // Assuming the sales endpoint returns the total sales amount
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(2px)', 
  };

  const detailsStyle = {
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

  const squareStyle = {
    background: '#efe9f4',
    color: '#333',
    padding: '10px',
    borderRadius: '5px',
    margin: '10px auto',
    width: '80%',
  };

  return (
    <div style={containerStyle}>
      <div style={detailsStyle}>
        <span style={closeButtonStyle} onClick={onClose}>X</span>
        <h2>User Details</h2>
        <p><strong>Name:</strong> {user.firstname} {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <div style={squareStyle}>
          <p><strong>Sales:</strong> {sales !== null ? sales : 'Loading...'}</p>
        </div>
        <div style={squareStyle}>
          <p><strong>Points:</strong> {points !== null ? points : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
