import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SaleApp() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all sales
    axios.get('http://127.0.0.1:8000/api/sales/')
      .then(response => {
        setSales(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching sales:', error));
  }, []);

  const handleUpdateSale = (id, newData) => {
    axios.post(`http://127.0.0.1:8000/api/sales/update/${id}`, newData)
      .then(response => {
        console.log(response.data.message);
        // Update sales after modification
        setSales(sales.map(sale => sale.id === id ? response.data.sale : sale));
      })
      .catch(error => console.error('Error updating sale:', error));
  };

  const handleNewSale = (newData) => {
    axios.post('http://127.0.0.1:8000/api/sales/new', newData)
      .then(response => {
        console.log(response.data.message);
        // Add the new sale to the list of sales
        setSales([...sales, response.data.sale]);
      })
      .catch(error => console.error('Error creating sale:', error));
  };

  const handleDeleteSale = (id) => {
    axios.post(`http://127.0.0.1:8000/sales/delete/${id}`)
      .then(response => {
        console.log(response.data.message);
        // Update sales after deletion
        setSales(sales.filter(sale => sale.id !== id));
      })
      .catch(error => console.error('Error deleting sale:', error));
  };

  return (
    <div>
      <h1>Sales</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {sales.map(sale => (
              <li key={sale.id}>
                <p>{sale.title}</p>
                <button onClick={() => handleDeleteSale(sale.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <button onClick={() => handleNewSale({ title: 'New Sale' })}>Add New Sale</button>
        </div>
      )}
    </div>
  );
}

export default SaleApp;
