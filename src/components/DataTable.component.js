import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteConfirmationModal from './DeleteModal.component'; // Import the delete confirmation modal
import "../search.css";
import UpdateProductModal from './UpdateModel.component';

const DataTable = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null); // State to store the id of the product to be deleted
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete confirmation modal

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleDeleteClick = async (productId) => {
    // Set the deleteProductId state to the id of the product to be deleted
    setDeleteProductId(productId);
    // Open the delete confirmation modal
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }

      // Delete the product
      await axios.delete(`http://127.0.0.1:8000/api/products/${deleteProductId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update the filtered products after deletion
      const updatedProducts = filteredProducts.filter(product => product.id !== deleteProductId);
      setFilteredProducts(updatedProducts);

      // Close the delete confirmation modal
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div style={{ marginLeft: '9%', paddingTop: '7%', height: 400, width: 700 }}>
      <div className="search" style={{ marginLeft: '20%', marginBottom: 20 }}>
        <div className="search-box">
          <div className="search-field">
            <input
              type="text"
              placeholder="Search..."
              className="input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="search-box-icon">
              <button className="btn-icon-content">
                <i className="search-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" fill="#fff"/>
                  </svg>
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Sale Price</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.sale_price}</TableCell>
                <TableCell align="right">{product.code}</TableCell>
                <TableCell align="right">
                  <button className="update" onClick={() => handleUpdateClick(product)}>Update</button>
                </TableCell>
                <TableCell align="right">
                  <button className="delete" onClick={() => handleDeleteClick(product.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
      <DeleteConfirmationModal 
        open={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
        onDelete={handleDeleteConfirmation} 
      />
    </div>
  );
};

export default DataTable;
