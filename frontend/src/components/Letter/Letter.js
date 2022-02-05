import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Letter = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Write a letter</h1>
      <br />
      <Button variant="contained" onClick={() => navigate("/desk")}>Go Back</Button>
      <br />
      <br />
    </div>
  );
};

export default Letter;