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
import UpdateForm from "../TeamForm/updateUser.component";
import UserDetails from "../TeamForm/UserDetails.component";
import DeleteConfirmationModal from "../TeamForm/Delete.component";

const DataTable = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // New state variable for delete modal
  const [userToDeleteId, setUserToDeleteId] = useState(null); // New state variable to store user ID for deletion
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // New state variable for view modal



  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = users.filter((user) =>
      `${user.firstname} ${user.lastname}`
        .toLowerCase()
        .includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };
  const handleDeleteClick = (userId) => {
    setUserToDeleteId(userId); // Set the user ID to be deleted
    setIsDeleteModalOpen(true); // Open the delete confirmation modal
  };

  const handleDeleteConfirm = async () => {
    if (userToDeleteId) {
      // Check if user ID to delete is set
      deleteUser(userToDeleteId); // Delete the user
      setIsDeleteModalOpen(false); // Close the delete confirmation modal
    }
  };

  const deleteUser = async (userId) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Handle success response
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div
      style={{ marginLeft: "9%", paddingTop: "7%", height: 400, width: "80%" }}
    >
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
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center" component="th" scope="row">
                  {user.firstname} {user.lastname}
                </TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.phone}</TableCell>
                <TableCell align="center">Active</TableCell>

                <TableCell align="center">
                  <button class="tooltip" onClick={() => handleViewClick(user)}>
                    <svg
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 23 23"
                      height="16"
                      width="16"
                    >
                      <path
                        fill="blue"
                        d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12Z"
                      ></path>{" "}
                      <path
                        fill="blue"
                        d="M21.83 11.2807C19.542 7.15186 15.8122 5 12 5C8.18777 5 4.45796 7.15186 2.17003 11.2807C1.94637 11.6844 1.94361 12.1821 2.16029 12.5876C4.41183 16.8013 8.1628 19 12 19C15.8372 19 19.5882 16.8013 21.8397 12.5876C22.0564 12.1821 22.0536 11.6844 21.83 11.2807ZM12 17C9.06097 17 6.04052 15.3724 4.09173 11.9487C6.06862 8.59614 9.07319 7 12 7C14.9268 7 17.9314 8.59614 19.9083 11.9487C17.9595 15.3724 14.939 17 12 17Z"
                      ></path>
                    </svg>
                    <span class="tooltiptext">view</span>
                  </button>
                  <button
                    onClick={() => handleUpdateClick(user)}
                    class="tooltip"
                  >
                    <svg
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                    >
                      <path
                        fill="green"
                        d="M1 22C1 21.4477 1.44772 21 2 21H22C22.5523 21 23 21.4477 23 22C23 22.5523 22.5523 23 22 23H2C1.44772 23 1 22.5523 1 22Z"
                      ></path>{" "}
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M18.3056 1.87868C17.1341 0.707107 15.2346 0.707107 14.063 1.87868L3.38904 12.5526C2.9856 12.9561 2.70557 13.4662 2.5818 14.0232L2.04903 16.4206C1.73147 17.8496 3.00627 19.1244 4.43526 18.8069L6.83272 18.2741C7.38969 18.1503 7.89981 17.8703 8.30325 17.4669L18.9772 6.79289C20.1488 5.62132 20.1488 3.72183 18.9772 2.55025L18.3056 1.87868ZM15.4772 3.29289C15.8677 2.90237 16.5009 2.90237 16.8914 3.29289L17.563 3.96447C17.9535 4.35499 17.9535 4.98816 17.563 5.37868L15.6414 7.30026L13.5556 5.21448L15.4772 3.29289ZM12.1414 6.62869L4.80325 13.9669C4.66877 14.1013 4.57543 14.2714 4.53417 14.457L4.0014 16.8545L6.39886 16.3217C6.58452 16.2805 6.75456 16.1871 6.88904 16.0526L14.2272 8.71448L12.1414 6.62869Z"
                        fill="green"
                      ></path>
                    </svg>
                    <span class="tooltiptext">update</span>
                  </button>
                  <button class="tooltip"  onClick={() => handleDeleteClick(user.id)} >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                      height="16"
                      width="16"
                    >
                      <path
                        fill="red"
                        d="M8.78842 5.03866C8.86656 4.96052 8.97254 4.91663 9.08305 4.91663H11.4164C11.5269 4.91663 11.6329 4.96052 11.711 5.03866C11.7892 5.11681 11.833 5.22279 11.833 5.33329V5.74939H8.66638V5.33329C8.66638 5.22279 8.71028 5.11681 8.78842 5.03866ZM7.16638 5.74939V5.33329C7.16638 4.82496 7.36832 4.33745 7.72776 3.978C8.08721 3.61856 8.57472 3.41663 9.08305 3.41663H11.4164C11.9247 3.41663 12.4122 3.61856 12.7717 3.978C13.1311 4.33745 13.333 4.82496 13.333 5.33329V5.74939H15.5C15.9142 5.74939 16.25 6.08518 16.25 6.49939C16.25 6.9136 15.9142 7.24939 15.5 7.24939H15.0105L14.2492 14.7095C14.2382 15.2023 14.0377 15.6726 13.6883 16.0219C13.3289 16.3814 12.8414 16.5833 12.333 16.5833H8.16638C7.65805 16.5833 7.17054 16.3814 6.81109 16.0219C6.46176 15.6726 6.2612 15.2023 6.25019 14.7095L5.48896 7.24939H5C4.58579 7.24939 4.25 6.9136 4.25 6.49939C4.25 6.08518 4.58579 5.74939 5 5.74939H6.16667H7.16638ZM7.91638 7.24996H12.583H13.5026L12.7536 14.5905C12.751 14.6158 12.7497 14.6412 12.7497 14.6666C12.7497 14.7771 12.7058 14.8831 12.6277 14.9613C12.5495 15.0394 12.4436 15.0833 12.333 15.0833H8.16638C8.05588 15.0833 7.94989 15.0394 7.87175 14.9613C7.79361 14.8831 7.74972 14.7771 7.74972 14.6666C7.74972 14.6412 7.74842 14.6158 7.74584 14.5905L6.99681 7.24996H7.91638Z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                    <span class="tooltiptext">delete</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isUpdateModalOpen && selectedUser && (
        <UpdateForm user={selectedUser} onClose={handleCloseUpdateModal} />
      )}
       <DeleteConfirmationModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
       {isViewModalOpen && selectedUser && (
        <UserDetails
          user={selectedUser}
          onClose={handleCloseViewModal}
        />
      )}
    </div>
  );
};

export default DataTable;
