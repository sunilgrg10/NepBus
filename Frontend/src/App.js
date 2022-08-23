import React from "react";
import BusHireFooter from "./Components/Bus hire Main Page/Bus Hire Footer Section/BusHireFooter";
import Navbar from "./Components/Navbar/Navbar";
import Routes from "./Routes/Routes";

const App = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Routes />
      <BusHireFooter />
    </div>
  );
};

export default App;
