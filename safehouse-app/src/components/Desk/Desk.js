import React from "react";
import { useNavigate } from "react-router-dom";

const Desk = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Logged in!</h1>
      <br />
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default Desk;