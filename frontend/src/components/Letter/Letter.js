import React, { useState }from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import SentLetter from '../../images/letter.svg';
import Pen from '../../images/pen.svg';
import './Letter.css';

function SimpleDialog(props) {

  // Local variables
  const { onClose, open } = props;
  
  const navigate = useNavigate();

  // Defines UI for confirmation dialog
  return (
    <Dialog fullWidth onClose={() => onClose()} open={open}>
      <DialogTitle align="center">Your letter has been mailed!</DialogTitle>
      <img src={SentLetter} className="letter-icon" width={200} alt="Mailing a letter"/>
      <button className="dialog-button" onClick={() => navigate("/desk")}>
        Return to Desk
      </button>
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

  // Send letter content to database
  const sendLetter = async(e) => {
    e.preventDefault();
    try {
      const body = {state};
      const response = await fetch("http://localhost:3000/dashboard/sendletter",
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

  // Defines UI for Letter component
  return (
    <div className="letter-container">
      <div className="label">
       <div className="label-text">
         What's on your mind?
       </div>
      </div>
      <div className="letter">
      <TextField 
        multiline 
        fullWidth 
        rows={23} 
        placeholder="Write your letter here" 
        onChange={e => setState(e.target.value)} 
      />
      <img src={Pen} className="pen" alt="Pen"/>
      </div>
      <div className="buttons">
        <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
        <Button variant="outlined" onClick={sendLetter}>Send</Button>
      </div>
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Letter;