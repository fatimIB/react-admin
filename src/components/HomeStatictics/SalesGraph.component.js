import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = () => {
  const [salesData, setSalesData] = useState({
    labels: [],
    totalSales: [],
    numberOfSales: [],
    profit: []
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistics/monthly-sales-data')
      .then(response => {
        const data = response.data;

        // Helper function to convert month names to Date objects for sorting
        const parseMonth = (monthName) => {
          return new Date(Date.parse(monthName + " 1, 2020"));
        };

        // Sort the data by month
        const sortedData = data.sort((a, b) => parseMonth(a.month) - parseMonth(b.month));

        setSalesData({
          labels: sortedData.map(item => item.month),
          totalSales: sortedData.map(item => item.totalSales),
          numberOfSales: sortedData.map(item => item.numberOfSales),
          profit: sortedData.map(item => item.profit)
        });
      })
      .catch(error => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  const chartData = {
    labels: salesData.labels,
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.totalSales,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Number of Sales',
        data: salesData.numberOfSales,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Profit',
        data: salesData.profit,
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales and Profit Data',
      },
    },
  };

  return (
    <div className="chart-container" style={{ position: "relative", height: "60vh", width: "90vw", paddingLeft:"40vh",paddingTop:"20px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesGraph;
