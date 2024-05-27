import React, { useState } from 'react';
import axios from 'axios';
import "../../AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      const response = await axios.post(
        'http://127.0.0.1:8000/api/products',
        {
          name,
          price,
          code
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Handle success response
      console.log(response.data);
      setSuccessMessage('Product added successfully');
      window.location.reload(); 
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Error adding product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <span className="title">Add product</span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="group">
          <input
            placeholder=""
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="group">
          <input
            placeholder=""
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="name">Price</label>
        </div>
        <div className="group">
          <input
            placeholder=""
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <label htmlFor="name">Code</label>
        </div>
        <button type="submit" disabled={loading}>Submit</button>
        {loading && <p>Loading...</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
