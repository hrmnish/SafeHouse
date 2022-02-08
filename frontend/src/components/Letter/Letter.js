import React, { useState }from 'react';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Letter.css';

const Letter = (props) => {

  // Local variables
  const [state, setState] = useState('');

  const navigate = useNavigate();

  // Local functions
  const sendLetter = async(e) => {
    console.log("letter content:", state);
  }

  return (
    <div className="letter-container">
      <h1>Write a letter</h1>
      <br />
      <TextField 
        multiline 
        fullWidth 
        rows={20} 
        placeholder="What's on your mind?" 
        onChange={e => setState(e.target.value)}
      />
      <br />
      <br />
      <div className="buttons">
        <Button variant="contained" onClick={() => navigate("/desk")}>Go Back</Button>
        <Button variant="contained" onClick={sendLetter}>Send</Button>
      </div>
    </div>
  );
};

export default Letter;