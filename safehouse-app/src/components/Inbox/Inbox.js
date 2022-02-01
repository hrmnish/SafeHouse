import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Inbox = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Inbox</h1>
      <br />
      <Button variant="contained" onClick={() => navigate("/desk")}>Go Back</Button>
      <br />
      <br />
    </div>
  );
};

export default Inbox;