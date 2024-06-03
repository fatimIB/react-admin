import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

const PointsTable = ({ token }) => {
  const [points, setPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/points", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPoints(response.data);
    } catch (error) {
      console.error("Error fetching points:", error);
    }
  };

  const handleOpenModal = (point) => {
    setSelectedPoint(point);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPoint(null);
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedPoint) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found.");
      }
      const response = await axios.put(
        `http://127.0.0.1:8000/api/points/${selectedPoint.id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPoints((prevPoints) =>
        prevPoints.map((point) =>
          point.id === selectedPoint.id
            ? { ...point, status: response.data.status }
            : point
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusStyle = (status) => ({
    backgroundColor: status === "active" ? "#30a947" : "#e41125",
    color: "white",
    padding: "5px 10px",
    borderRadius: "5px",
    display: "inline-block",
    textAlign: "center",
    minWidth: "75px",
  });

  return (
    <div
      style={{ marginLeft: "9%", paddingTop: "7%", height: 400, width: "80%" }}
    >
      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">User Name</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell sx={{ width: "25%" }} align="center">
                Update Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.map((point) => (
              <TableRow key={point.id}>
                <TableCell align="center">
                  {point.user.firstname} {point.user.lastname}
                </TableCell>
                <TableCell align="center">{point.amount}</TableCell>
                <TableCell align="center">
                  <span style={getStatusStyle(point.status)}>
                    {point.status}
                  </span>
                </TableCell>
                <TableCell align="center">
                  <button
                    class="tooltip"
                    style={{ marginLeft: "20%" }}
                    onClick={() => handleOpenModal(point)}
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
                    <span class="tooltiptext">Change Status</span>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <h2>Change Status</h2>
          <p style={{ marginTop: 20 }}>Do you want to change the status to:</p>
          <Button
            onClick={() => handleUpdateStatus("active")}
            variant="contained"
            style={{
              backgroundColor: "#30a947",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Active
          </Button>
          <Button
            onClick={() => handleUpdateStatus("inactive")}
            variant="contained"
            style={{
              backgroundColor: "#e41125",
              marginLeft: "10px",
              marginTop: 20,
              marginBottom: 10,
            }}
          >
            Inactive
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PointsTable;
