import React, { useState, useEffect } from "react";
import axios from "axios";

const Cards = () => {
  const [productOfTheMonth, setProductOfTheMonth] = useState("");
  const [totalSalesToday, setTotalSalesToday] = useState(0);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  const [profitToday, setProfitToday] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Fetch data for Product of the Month
    axios.get("http://127.0.0.1:8000/api/statistics/product-of-the-month")
      .then(response => {
        setProductOfTheMonth(response.data.name);
      })
      .catch(error => {
        console.error("Error fetching product of the month:", error);
      });

    // Fetch data for Total Sales Today
    axios.get("http://127.0.0.1:8000/api/statistics/total-sales-today")
      .then(response => {
        setTotalSalesToday(response.data.totalSalesToday);
      })
      .catch(error => {
        console.error("Error fetching total sales today:", error);
      });

    // Fetch data for Number of Users
    axios.get("http://127.0.0.1:8000/api/statistics/number-of-users")
      .then(response => {
        setNumberOfUsers(response.data.numberOfUsers);
      })
      .catch(error => {
        console.error("Error fetching number of users:", error);
      });

    // Fetch data for Profit Today
    axios.get("http://127.0.0.1:8000/api/statistics/profit-today")
      .then(response => {
        setProfitToday(response.data.profitToday);
      })
      .catch(error => {
        console.error("Error fetching profit today:", error);
      });
  }, []);

  const handleMouseEnter = (card) => {
    setHoveredCard(card);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardStyle = (card) => ({
    marginTop: "30px",
    width: "230px",
    height: "170px",
    borderRadius: "30px",
    background: hoveredCard === card ? "#d8b4a0" : "#fff",
    boxShadow: hoveredCard === card ? "0 15px 30px rgba(0, 0, 0, 0.2)" : "0 7px 25px rgba(0, 0, 0, 0.08)",
    display: "grid",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    transition: "background 0.3s, box-shadow 0.3s",
  });

  const getTitleStyle = (card) => ({
    fontSize: "1rem",
    marginBottom: "5px",
    color: hoveredCard === card ? "#fff" : "#999",
    transition: "color 0.3s",
  });

  const getValueStyle = (card) => ({
    fontSize: "3em",
    fontWeight: "500",
    color: hoveredCard === card ? "#fff" : "#2a2185",
    transition: "color 0.3s",
  });

  const getIconStyle = (card) => ({
    marginLeft: "10px", // Adjust the spacing between value and icon
    width: "47px",
    height: "47px",
    stroke: hoveredCard === card ? "#fff" : "#71717A",
    transition: "stroke 0.3s",
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" }}>
      <div
        style={getCardStyle("productOfTheMonth")}
        onMouseEnter={() => handleMouseEnter("productOfTheMonth")}
        onMouseLeave={handleMouseLeave}
      >
        <div style={getValueStyle("productOfTheMonth")}>
          {productOfTheMonth}
          <svg viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" style={getIconStyle("productOfTheMonth")}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M3.63383 12.746L4.06509 11.6007L3.05817 8.92604C2.98587 8.73312 2.98082 8.52099 3.04384 8.32476C3.10686 8.12853 3.23418 7.95999 3.40472 7.84703L5.77089 6.2826L6.50924 3.52023C6.56258 3.32102 6.68161 3.14627 6.84656 3.025C7.01151 2.90372 7.21246 2.84322 7.41605 2.85352L10.2385 2.99876L12.4391 1.20039C12.5979 1.07072 12.7958 1 12.9999 1C13.2039 1 13.4018 1.07072 13.5606 1.20039L15.7612 2.99876L18.5837 2.85645C18.7873 2.84614 18.9882 2.90665 19.1531 3.02792C19.3181 3.1492 19.4371 3.32394 19.4905 3.52316L20.2288 6.28552L22.595 7.84995C22.7657 7.96279 22.8931 8.13133 22.9561 8.3276C23.0192 8.52387 23.014 8.73607 22.9415 8.92897L21.9356 11.6036L22.9415 14.2773C23.0141 14.4703 23.0193 14.6827 22.9562 14.8791C22.8932 15.0755 22.7657 15.2443 22.595 15.3573L20.2288 16.9168L19.4866 19.6802C19.4336 19.8796 19.3147 20.0547 19.1497 20.1762C18.9847 20.2977 18.7836 20.3583 18.5798 20.3478L15.7573 20.2055L13.5825 21.979" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M1.24805 18.3714L3.74324 22.1142" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M16.79 16.872L3 21L2 19.5L11.158 8L16.79 16.872Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M10.5 7L17.5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M6 20.316L6.876 21.662C7.02084 21.8995 7.21269 22.1048 7.43977 22.2655C7.66685 22.4261 7.92437 22.5386 8.19651 22.5961C8.46865 22.6536 8.74967 22.6549 9.02231 22.5998C9.29496 22.5448 9.55348 22.4346 9.782 22.276C10.2492 21.9398 10.5702 21.4378 10.6793 20.8726C10.7884 20.3075 10.6774 19.722 10.369 19.236" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
        </div>
        <div style={getTitleStyle("productOfTheMonth")}>Product of the Month</div>
      </div>

      <div
        style={getCardStyle("totalSalesToday")}
        onMouseEnter={() => handleMouseEnter("totalSalesToday")}
        onMouseLeave={handleMouseLeave}
      >
        <div style={getValueStyle("totalSalesToday")}>
          {totalSalesToday}
          <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={getIconStyle("totalSalesToday")}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M18.119 19.6573H4.58034C3.24363 19.6573 2.15498 18.5686 2.15498 17.232V5.46745C2.15498 4.13075 3.24363 3.04211 4.58034 3.04211H18.119C19.4557 3.04211 20.5444 4.13075 20.5444 5.46745V17.232C20.5444 18.5686 19.4557 19.6573 18.119 19.6573Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M8.63542 1V5.46742" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M14.063 1V5.46742" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M8.42773 9.07178H14.2863" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M8.42773 12.5596H14.2863" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M11.3579 16.0474H14.2855" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M5.70605 16.0474H6.99878" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
        </div>
        <div style={getTitleStyle("totalSalesToday")}>Total Sales Today</div>
      </div>

      <div
        style={getCardStyle("numberOfUsers")}
        onMouseEnter={() => handleMouseEnter("numberOfUsers")}
        onMouseLeave={handleMouseLeave}
      >
        <div style={getValueStyle("numberOfUsers")}>
          {numberOfUsers}
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={getIconStyle("numberOfUsers")}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M12 11C14.7614 11 17 8.76142 17 6C17 3.23858 14.7614 1 12 1C9.23858 1 7 3.23858 7 6C7 8.76142 9.23858 11 12 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M6.19418 13.2001C3.55337 14.7352 1.80859 17.5374 1.80859 20.6667H22.1913C22.1913 17.5374 20.4465 14.7352 17.8057 13.2001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
        </div>
        <div style={getTitleStyle("numberOfUsers")}>Number of Users</div>
      </div>

      <div
        style={getCardStyle("profitToday")}
        onMouseEnter={() => handleMouseEnter("profitToday")}
        onMouseLeave={handleMouseLeave}
      >
        <div style={getValueStyle("profitToday")}>
          {profitToday}
          <svg fill="currentColor" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={getIconStyle("profitToday")}>
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> <g data-name="25 profit" id="_25_profit">
                 <path d="M58.51,58.5H53.95V28.19h2.79a1,1,0,0,0,.79-1.62l-6.31-8.08a1.047,1.047,0,0,0-1.58,0l-6.31,8.08a1,1,0,0,0,.79,1.62H46.9V58.5H36.79V37.28h2.78a.993.993,0,0,0,.9-.57.979.979,0,0,0-.11-1.05l-6.31-8.08a1.047,1.047,0,0,0-1.58,0l-6.31,8.08a1.006,1.006,0,0,0,.79,1.62h2.79V58.5H20.63V46.36h2.79a.994.994,0,0,0,.9-.56,1.021,1.021,0,0,0-.11-1.05l-6.32-8.08a1.022,1.022,0,0,0-1.57,0l-6.31,8.08A.979.979,0,0,0,9.9,45.8a.969.969,0,0,0,.89.56h2.79V58.5H6.49V6.99a1,1,0,0,0-2,0V59.5a1,1,0,0,0,1,1H58.51a1,1,0,0,0,0-2ZM18.63,45.36V58.5H15.58V45.36a1,1,0,0,0-1-1H12.85l4.26-5.45,4.26,5.45H19.63A1,1,0,0,0,18.63,45.36Zm16.16-9.08V58.5H31.74V36.28a1,1,0,0,0-1-1H29l4.26-5.46,4.26,5.46H35.79A.99.99,0,0,0,34.79,36.28Zm17.16-9.09V58.5H48.9V27.19a.99.99,0,0,0-1-1H46.17l4.26-5.46,4.26,5.46H52.95A1,1,0,0,0,51.95,27.19Z" stroke="currentColor" ></path> 
                 <path d="M22.2,24.91a2.912,2.912,0,0,1-2.21,2.04v.64a1,1,0,0,1-2,0v-.81a8.332,8.332,0,0,1-1.43-.74c-.17-.11-.34-.21-.5-.3a1,1,0,0,1,.97-1.75c.2.11.39.23.59.35a3.377,3.377,0,0,0,1.7.7,1,1,0,0,0,.95-.65c.04-.13.05-.34-.25-.54l-2.63-1.76a2.542,2.542,0,0,1-1.15-1.74,2.374,2.374,0,0,1,.52-1.89,2.854,2.854,0,0,1,1.23-.88v-.89a1,1,0,1,1,2,0v.78a2.806,2.806,0,0,1,.94.41l1.06.7a1,1,0,0,1-1.11,1.67l-1.06-.71a1.2,1.2,0,0,0-1.5.16.451.451,0,0,0-.11.34.663.663,0,0,0,.29.39l2.64,1.76A2.431,2.431,0,0,1,22.2,24.91Z" stroke="currentColor" ></path> 
                 <path d="M18.99,12.59a9.55,9.55,0,1,0,9.55,9.55A9.556,9.556,0,0,0,18.99,12.59Zm0,17.1a7.55,7.55,0,1,1,7.55-7.55A7.563,7.563,0,0,1,18.99,29.69Z" stroke="currentColor" ></path> 
                 <path d="M36.254,16.648c.165.092.333.2.506.3a8.277,8.277,0,0,0,1.425.743v.8a1,1,0,1,0,2,0v-.634A2.929,2.929,0,0,0,42.4,15.824,2.446,2.446,0,0,0,41.331,13.1l-2.637-1.765a.6.6,0,0,1-.284-.387.431.431,0,0,1,.106-.338,1.2,1.2,0,0,1,1.5-.161l1.053.705a1,1,0,1,0,1.112-1.662l-1.053-.7a3.06,3.06,0,0,0-.945-.409V7.6a1,1,0,1,0-2,0v.9a2.855,2.855,0,0,0-1.234.871,2.417,2.417,0,0,0-.517,1.891A2.569,2.569,0,0,0,37.582,13l2.635,1.764c.3.2.287.4.251.539a1.008,1.008,0,0,1-.954.651,3.408,3.408,0,0,1-1.7-.7c-.2-.125-.4-.247-.588-.354a1,1,0,0,0-.975,1.746Z" stroke="currentColor" ></path> 
                 <path d="M39.18,3.5a9.55,9.55,0,1,0,9.56,9.55A9.562,9.562,0,0,0,39.18,3.5Zm0,17.1a7.55,7.55,0,1,1,7.56-7.55A7.563,7.563,0,0,1,39.18,20.6Z" stroke="currentColor" ></path> 
            </g> 
            </g>
           </svg>
        </div>
        <div style={getTitleStyle("profitToday")}>Profit Today DH</div>
      </div>
    </div>
  );
};

export default Cards;
