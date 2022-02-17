import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Reply = ({ setAuth }) => {
  // Local variables
  const navigate = useNavigate();

  // Defines UI for Desk component
  return (
    <div>
      <h1>Reply to a letter!</h1>
      <br />
      <Button variant="contained" onClick={() => navigate("/desk")}>Back to Desk</Button>
    </div>
  );
};

export default Reply;