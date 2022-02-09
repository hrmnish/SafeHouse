import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Desk = ({ setAuth }) => {
  // Local variables
  const navigate = useNavigate();

  // Log out user and return to login 
  const clickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

  // Defines UI for Desk component
  return (
    <div>
      <h1>Logged in!</h1>
      <br />
      <Button variant="contained" onClick={clickLogout}>Log out</Button>
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