import React from "react";
import Sidebar from "./SideBar.component";
import DataTable from "./Tables/TeamTable.component";

const Team = () => {
  return (
    <>
      <div style={{ backgroundColor: "#f0edee", minHeight: "100vh" }}>
        <Sidebar />
        <DataTable />
      </div>
    </>
  );
};

export default Team;
