import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./SideBar.component";
import SaleTable from './Tables/SalesTables.component';
import AddSales from './SalesForms/AddSale.component';

function Sales() {

  return (
    <div>
     <div style={{ backgroundColor: "#f0edee", minHeight: "100vh" }}>
      <Sidebar/>
      <SaleTable/>
      <AddSales/>
      </div>
    </div>
  );
}

export default Sales;
