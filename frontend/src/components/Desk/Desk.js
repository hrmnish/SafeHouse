import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Desk = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Logged in!</h1>
      <br />
      <Button variant="contained" onClick={() => navigate("/")}>Go Back</Button>
      <br />
      <br />
      <Button variant="contained" onClick={() => navigate("/letter")}>Write a letter</Button>
      <br />
      <br />
      <Button variant="contained" onClick={() => navigate("/inbox")}>View Inbox</Button>
    </div>
  );
};

export default Desk;