import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import './Letter.css';

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

const Letter = (props) => {

  // Local variables
  const [state, setState] = useState('');

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  // Save letter content
  const sendLetter = async(e) => {
    console.log("letter content:", state);
    setOpen(true);
  }

  // Defines UI for Letter component
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
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Letter;