import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "./SideBar.component";
import PointsTable from './Tables/PointsTable.component';

function Points() {

  return (
    <div>
     <div style={{ backgroundColor: "#f0edee", minHeight: "100vh" }}>
      <Sidebar/>
      <PointsTable/>


      </div>
    </div>
  );
}

export default Points;
