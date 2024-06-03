import React from "react";
import Sidebar from "./SideBar.component";
import Cards from "./HomeStatictics/Cards.component";
import SalesGraph from "./HomeStatictics/SalesGraph.component";

const Home = () => {
  return (
    <>
    <div style={{ backgroundColor: "#f0edee", minHeight: "100vh" }}>
        <Sidebar />
        <Cards />
        <SalesGraph />
      </div>
  </>
  );
};

export default Home;