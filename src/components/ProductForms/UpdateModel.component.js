import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateProductModal = ({ product, onUpdate, onClose }) => {
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      await axios.post(
        `http://127.0.0.1:8000/api/products/${product.id}`,
        updatedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Product updated successfully');
      window.location.reload(); 
    } catch (err) {
      console.error('Error updating product:', err);
      setError('Error updating product. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Update Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <div className="group">
          <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              required
            />
            
          </div>
          <div className="group">
          <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              required
            />
            
          </div>
          <div className="group">
          <label htmlFor="sale_price">Sale Price</label>
            <input
              type="text"
              name="sale_price"
              value={updatedProduct.sale_price}
              onChange={handleChange}
              required
            />
            
          </div>
          <div className="group">
          <label htmlFor="code">Code</label>
            <input
              type="text"
              name="code"
              value={updatedProduct.code}
              onChange={handleChange}
              required
            />
            
          </div>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
          {loading && <p>Loading...</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;
