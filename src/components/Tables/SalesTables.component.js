import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../../search.css";
import UpdateSales from "../SalesForms/Update.component";
import DeleteConfirmationModal from "../SalesForms/Delete.component";

const SaleTable = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const response = await axios.get('http://127.0.0.1:8000/api/sales/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSales(response.data);
      setFilteredSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = sales.filter((sale) =>
      sale.user_name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredSales(filtered);
  };

  const handleUpdateClick = (sale) => {
    setSelectedSale(sale);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const handleDeleteClick = (sale) => {
    setSaleToDelete(sale);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSaleToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      await axios.delete(`http://127.0.0.1:8000/api/sales/${saleToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDeleteModalOpen(false);
      setSaleToDelete(null);
      fetchSales(); // Refresh the sales list
    } catch (error) {
      console.error('Error deleting sale:', error);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div style={{ marginLeft: "9%", paddingTop: "7%", height: 400, width: '55%' }}>
      <div className="search" style={{ marginLeft: "20%", marginBottom: 20 }}>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                      fill="#fff"
                    />
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
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Sale Details</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Commission</TableCell> {/* Add commission column */}
              <TableCell align="center">Update</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSales.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell align="center">{sale.user_name}</TableCell>
                <TableCell align="center">{sale.products}</TableCell>
                <TableCell align="center">{sale.total_price}</TableCell>
                <TableCell align="center">{sale.commission}</TableCell> {/* Add commission data */}
                <TableCell align="center">
                  <button style={{ marginLeft: "9%" }} className="update" onClick={() => handleUpdateClick(sale)}>
                    Update
                  </button>
                </TableCell>
                <TableCell align="center">
                  <button style={{ marginLeft: "9%" }} className="delete" onClick={() => handleDeleteClick(sale)}>
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isUpdateModalOpen && selectedSale && (
        <UpdateSales sale={selectedSale} onClose={handleCloseUpdateModal} />
      )}
      <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SaleTable;
