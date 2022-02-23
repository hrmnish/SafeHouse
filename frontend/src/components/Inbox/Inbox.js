import React, { Fragment, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import './Inbox.css';

function SimpleDialog(props) {

  // Local variables
  const { onClose, open } = props;
  
  const navigate = useNavigate();

  // Defines UI for confirmation dialog
  return (
    <Dialog fullWidth onClose={() => onClose()} open={open}>
      <div className="centered">
        <DialogTitle align="center">Are you sure you want to archive this?</DialogTitle>
        <br />
        <br />
        <br />
        <div className="buttons">
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button onClick={() => navigate("/desk")}>Archive</Button>
        </div>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const Inbox = (props) => {
  // Local variables
  const navigate = useNavigate();

  // Total number of letters
  const maxLetters = 2;

  // Tracks the current letter in the stack
  const [index, setIndex] = useState({
    letter: 0,
    response: 0,
  });

  // Tracks if users want to sort by letter
  const [sortByLetter, setSort] = useState(false);

  // Defines whether the dialog is open/closed
  const [open, setOpen] = React.useState(false);

  // Hardcoded values for letters
  const letterDict = [
    "1. This is the content of the first letter",
    "2. This is the content of the second letter",
    "3. This is the content of the third letter",
  ];

  // Hardcoded values for responses
  const responsesDict = [
    "1. This is the content of the first response",
    "2. This is the content of the second response",
    "3. This is the content of the third response",
  ];

  function LetterButtons(props) {
    if(sortByLetter) {
      if(props.arrow === "back") {
        if (index.letter > 0) {
        return  <IconButton onClick={clickPreviousLetter} disableRipple>
                  <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
        } else {
          return  <IconButton onClick={clickPreviousLetter} disabled disableRipple>
                    <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>;
        }
      } else {
        if (index.letter < maxLetters) {
          return  <IconButton onClick={clickNextLetter} disableRipple>
                    <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>;
          } else {
            return  <IconButton onClick={clickNextLetter} disabled disableRipple>
                      <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                    </IconButton>
          }
      }
    } else {
      return null;
    }
  }

  function ResponseButtons(props) {
    if(!sortByLetter) {
      if(props.arrow === "back") {
        if (index.response > 0) {
        return  <IconButton onClick={clickPreviousResponse} disableRipple>
                  <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
        } else {
          return  <IconButton onClick={clickPreviousResponse} disabled disableRipple>
                    <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>;
        }
      } else {
        if (index.response < maxLetters) {
          return  <IconButton onClick={clickNextResponse} disableRipple>
                    <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>;
          } else {
            return  <IconButton onClick={clickNextResponse} disabled disableRipple>
                      <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                    </IconButton>
          }
      }
    } else {
      return null;
    }
  }

  // Displays the previous letter
  const clickPreviousLetter = () => {
    console.log("back button clicked!")
    if(index.letter !== 0) {
      setIndex({...index, letter: index.letter-1});
    }
  }

  // Displays the next letter
  const clickNextLetter = () => {
    console.log("next button clicked!")
    if(index.letter !== maxLetters) {
      setIndex({...index, letter: index.letter+1});
    }
  }

  // Displays the previous response
  const clickPreviousResponse = () => {
    console.log("back button clicked!")
    if(index.response !== 0) {
      setIndex({...index, response: index.response-1});
    }
  }
  
  // Displays the next response
  const clickNextResponse = () => {
    console.log("next button clicked!")
    if(index.response !== maxLetters) {
      setIndex({...index, response: index.response+1});
    }
  }


  // Defines UI for Reply component
  return (
    <div className="inbox-container">
      <h1>Inbox</h1>
      <br />
      <div className="row">
        <div className="centered">
          <div className="row">
            <LetterButtons arrow={"back"} />

            <Card sx={{ minWidth: 600, minHeight: 400 }}>
              {letterDict[index.letter]}
            </Card>

            <LetterButtons arrow={"next"} />
          </div>
          <br />
          <div className="buttons">
            <Button variant="contained" onClick={() => setOpen(true)}>Archive Letter</Button>
          </div>
        </div>
        <div className="centered">
          <div className="row">
            <ResponseButtons arrow={"back"} />

            <Card sx={{ minWidth: 600, minHeight: 400 }}>
              {responsesDict[index.response]}
            </Card>

            <ResponseButtons arrow={"next"} />
          </div>
          <br />
          <div className="buttons">
            <Button variant="contained" onClick={() => setOpen(true)}>Archive Response</Button>
          </div>
        </div>
      </div>
      <br />
      <div className="bottom-buttons">
        <Button variant="contained" onClick={() => navigate("/desk")}>Back</Button>
        { sortByLetter ? 
        <Button variant="contained" onClick={() => setSort(!sortByLetter)}>Sort by Response</Button>
        :
        <Button variant="contained" onClick={() => setSort(!sortByLetter)}>Sort by Letter</Button>
        }
        <Button variant="contained">Say Thanks</Button>
      </div>
      <SimpleDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default Inbox;