import React, { useState, useEffect } from "react";
import axios from "axios";
import zIndex from "@mui/material/styles/zIndex";

// Styles
const formContainerStyle = {
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
    zIndex:9999,
  };
  
  const formStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    textAlign: 'center',
    position: 'relative',
  };
  
  const labelStyle = {
      marginBottom: '8px',
      display: 'block',
      fontWeight: 'bold',
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


  
  const UpdateSales = ({ sale, onClose }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const response = await axios.get('http://127.0.0.1:8000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
    const selectedProductId = e.target.value;
    if (!selectedProducts.includes(selectedProductId)) {
      setSelectedProducts([...selectedProducts, selectedProductId]);
    }
  };

  const handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedProducts.forEach(productId => {
      const product = products.find(product => product.id === parseInt(productId));
      const quantity = quantities[productId] || 0;
      totalPrice += product ? product.sale_price * quantity : 0;
    });
    return totalPrice;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
  
      const selectedUserObject = users.find((user) => user.id === parseInt(selectedUser));
      const data = {
        user_id: selectedUser,
        user_name: selectedUserObject ? `${selectedUserObject.firstname} ${selectedUserObject.lastname}` : '',
        products: selectedProducts.map((productId) => ({
          id: productId,
          quantity: quantities[productId] || 1,
        })),
        total_price: calculateTotalPrice(),
      };
  
      const response = await axios.post(`http://127.0.0.1:8000/api/sales/update/${sale.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setSuccessMessage(response.data.message);
      setLoading(false);
      onClose(); 
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating sale:', error);
      setError('Error updating sale. Please try again.');
      setLoading(false);
    }
  };
  
  

  return (
    <div style={formContainerStyle} className="add-sales-container">
      <div style={formStyle} className="add-sales-card">
      <span style={closeButtonStyle} onClick={onClose}>X</span>
        <span className="add-sales-title">Add Sale</span>
        <form className="add-sales-form" onSubmit={handleSubmit}>
        <div htmlFor="user" style={labelStyle}>User</div>
          <div className="add-sales-group">
            <select value={selectedUser} onChange={handleUserChange} required>
              <option value="" disabled>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </select>
            
          </div>
          <div style={labelStyle}>Products</div>
          <div className="add-sales-group">
            <select value={selectedProduct} onChange={handleProductChange} size="3"  multiple>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} (Sale Price: ${product.sale_price})
                </option>
              ))}
            </select>
            
          </div>
          {selectedProducts.map(productId => {
            const product = products.find(product => product.id === parseInt(productId));
            return (
              <div key={productId} className="add-sales-group" style={{ marginBottom: '10px' }}>
                <div>
                  <div style={labelStyle}>Quantity of  {product?.name}</div>
                  <input
                    type="number"
                    min="1"
                    value={quantities[productId] || ''}
                    onChange={(e) => handleQuantityChange(e, productId)}
                    placeholder="Quantity"
                    required
                  />
                </div>
              </div>
            );
          })}
           <div className="add-sales-group">
            <div style={labelStyle}>Total Price</div>
            <input
              type="text"
              value={calculateTotalPrice()}
              readOnly
              placeholder="Total Price"
            />
          </div>
          <button style={updateButtonStyle} type="submit" disabled={loading}>Submit</button>
          {loading && <p>Loading...</p>}
          {successMessage && <p style={{ color : 'green'}}>{successMessage}</p>}
          {error && <p  style={{ color : 'red'}}>{error}</p>}
        </form>
      </div>
    </div>
  );
};




export default UpdateSales;