import React from "react";
import Sidebar from "./SideBar.component";
import DataTable from "./DataTable.component";
import AddProduct from "./AddProduct.component";

const Products = () => {
  
  return (
    <>
       <div style={{ backgroundColor: "#f0edee", minHeight: "100vh" }}>
      <Sidebar />
      <DataTable />
      <AddProduct />
    </div>
    </>
  );
};

export default Products;