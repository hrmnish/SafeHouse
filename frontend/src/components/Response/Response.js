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
  const [state, setState] = useState('');

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  // Send response content to database
  const sendResponse = () => {
    console.log("repsonse:", state);
    setOpen(true);
  };

  // Defines UI for Reply component
  return (
    <div className="response-container">
      <h1>Respond to a letter!</h1>
      <br />
      <div className="row">
        <Card sx={{ minWidth: 600, minHeight: 400 }}>
          {location.state.letter}
        </Card>
        <br />
        <TextField 
          multiline 
          style = {{width: 600}}
          rows={20} 
          placeholder="Write your response here" 
          onChange={e => setState(e.target.value)} 
        />
      </div>
      <br />
      <br />
      <div className="buttons">
        <Button variant="contained" onClick={() => navigate("/desk")}>Back</Button>
        <Button variant="contained" onClick={sendResponse}>Send</Button>
      </div>
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default Response;