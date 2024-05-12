import React from "react";
import Sidebar from "./SideBar.component";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 200rem; /* Adjust the margin as needed */
  padding: 1rem;
  
`;


const Home = () => {
  return (
    <>
    <Sidebar />
    <div >
    <h1>Home</h1>
    </div>
  </>
  );
};

export default Home;