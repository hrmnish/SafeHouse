import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Card from '@mui/material/Card';

import './Response.css';

function SimpleDialog(props) {

    // Local variables
    const { onClose, open } = props;
    
    const navigate = useNavigate();
  
    // Defines UI for confirmation dialog
    return (
      <Dialog fullWidth onClose={() => onClose()} open={open}>
        <DialogTitle align="center">Your letter has been mailed!</DialogTitle>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button onClick={() => navigate("/desk")}>Return to Desk</Button>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  };

const Response = (props) => {

  // Local variables
  const navigate = useNavigate(); 

  const location = useLocation();

  // Store the user's response
  const [state, setState] = useState('');

  // Defines whether the dialog is open/closed
  const [open, setOpen] = React.useState(false);

  // Send response content to database
  const sendResponse = async(e) => {
    e.preventDefault();
    let letter_id = location.state.letter_id;
    let letter = state;
    try {
      const body = {letter_id, letter};
      const response = await fetch("http://localhost:3000/dashboard/sendresponse",
        {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token
          },
          body: JSON.stringify(body)
        }
      );
      const parseResponse = await response.json();
      if(parseResponse) {
        setOpen(true);
      } else {
        console.log("Error: unable to send letter. Please try again")
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Defines UI for Reply component
  return (
    <div className="response-container">
      <div className="label">
       <div className="label-text">
         Send some kind words
       </div>
      </div>
      <div className="row">
        <Card>{location.state.letter}</Card>
        <div className="space"></div>
        <TextField 
          multiline 
          fullWidth
          rows={23} 
          placeholder="Write your response here" 
          onChange={e => setState(e.target.value)} 
        />
      </div>
      <div className="buttons">
        <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
        <Button variant="outlined" onClick={sendResponse}>Send</Button>
      </div>
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default Response;