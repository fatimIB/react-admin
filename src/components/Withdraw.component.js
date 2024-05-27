import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./SideBar.component";
import WithdrawTable from './Tables/WithdrawsTable.component';

function Withdraw() {

  return (
    <div>
     <div style={{ backgroundColor: "#f0edee", minHeight: "100vh" }}>
      <Sidebar/>
      <WithdrawTable/>


      </div>
    </div>
  );
}

export default Withdraw;
