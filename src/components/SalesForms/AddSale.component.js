import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../AddProduct.css";

const AddSales = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Calculate total price when quantities or products change
    let total = 0;
    selectedProducts.forEach(productId => {
      const product = products.find(p => p.id === parseInt(productId));
      const quantity = quantities[productId] || 0;
      total += product ? product.price * quantity : 0;
    });
    setTotalPrice(total);
  }, [quantities, selectedProducts, products]);

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
    const price = getProductPrice(selectedProductId);
    setTotalPrice(totalPrice + parseFloat(price));
  };

  const getProductPrice = (productId) => {
    const product = products.find((product) => product.id === parseInt(productId));
    return product ? product.price : '';
  };

  const handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
  
      const selectedUserObject = users.find(user => user.id === parseInt(selectedUser));
      const data = {
        user_id: selectedUser,
        user_name: selectedUserObject ? `${selectedUserObject.firstname} ${selectedUserObject.lastname}` : '', // Construct the user's name
        products: selectedProducts.map(productId => ({
          id: productId,
          quantity: quantities[productId] || 1
        })),
        total_price: totalPrice
      };
  
      const response = await axios.post('http://127.0.0.1:8000/api/sales/new', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      setSuccessMessage(response.data.message);
      setSelectedUser('');
      setSelectedProducts([]);
      setQuantities({});
      setLoading(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Error submitting sale:', error);
      setError('Error submitting sale. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <span className="title">Add Sale</span>
      <form className="form" onSubmit={handleSubmit}>
        <div className="group">
          <select value={selectedUser} onChange={handleUserChange} required>
            <option value="" disabled>Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname} {user.lastname}
              </option>
            ))}
          </select>
          <label htmlFor="user">User</label>
        </div>
        <div className="group">
          <select value={selectedProduct} onChange={handleProductChange} size="3" multiple>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} (Price: ${product.price})
              </option>
            ))}
          </select>
          <label htmlFor="products">Products</label>
        </div>
        {selectedProducts.map(productId => {
          const product = products.find(product => product.id === parseInt(productId));
          return (
            <div key={productId} style={{ marginBottom: '10px' }}>
              <div>
                <label>Quantity of  {product?.name}</label>
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
        <div>
          <label>Total Price</label>
          <input
            type="text"
            value={totalPrice}
            readOnly
            placeholder="Total Price"
          />
        </div>
        <button type="submit" disabled={loading}>Submit</button>
        {loading && <p>Loading...</p>}
        {successMessage && <p className="success">{successMessage}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddSales;
