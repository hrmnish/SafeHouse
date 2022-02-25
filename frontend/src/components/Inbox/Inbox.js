import React, { useState, useEffect, Fragment } from "react";
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
  const [maximum, setMaximum] = useState({
    letter: 1,
    response: 1
  });

  // Tracks the current letter in the stack
  const [index, setIndex] = useState({
    letter: 0,
    response: 0,
  });

  // Tracks if users want to sort by letter
  const [sortByLetter, setSort] = useState(false);

  // Defines whether the dialog is open/closed
  const [open, setOpen] = React.useState(false);

  // Stores loaded letters and letter ids
  let [state, setState] = useState({
    letter_id: [],
    letter: [],
    response: [],
  });

  function LetterButtons(props) {
    if(sortByLetter) {
      if(state.letter.length <= 1) {
        return null;
      }
      else if(props.arrow === "back") {
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
        if (index.letter < maximum.letter) {
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
    if(state.response.length <= 1) {
      return null;
    }
    else if(props.arrow === "back") {
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
      if (index.response < maximum.letter) {
        return  <IconButton onClick={clickNextResponse} disableRipple>
                  <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
        } else {
          return  <IconButton onClick={clickNextResponse} disabled disableRipple>
                    <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>
        }
    }
  }

  useEffect(() => {
    const getInbox = async() => {
     console.log("get inbox")
    try {
      // Get ten letters from database
      const letters = await fetch("http://localhost:3000/dashboard/getinboxletters",
      {
        method: "GET",
        headers: {
          'Content-type': 'application/json',
          token: localStorage.token
        },
      })
      .then(response => response.json());
      let parsedJSON = JSON.parse(letters);
      // Prepare to save letter and letter_id data
      setMaximum(() => ({ letter: Object.keys(parsedJSON).length - 1 }));
      let tempLetterId = [];
      let tempLetterContent = [];
      Object.keys(parsedJSON).forEach(i => {
        tempLetterId.push(parsedJSON[i].letter_id);
        tempLetterContent.push(parsedJSON[i].letter);
      })
      
      // Get responses from database
      let letter_id = tempLetterId[index.letter];
      console.log("letter_id", letter_id);
      const body = {letter_id};
      const responses = await fetch("http://localhost:3000/dashboard/getinboxresponses",
        {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token
          },
        body: JSON.stringify(body)
        }
      )
      .then(value => value.json());

      Promise.all([letters, responses])
      .then(()=> {
        let parsedLetters = JSON.parse(letters);
        console.log(parsedLetters);
        let parsedResponses = JSON.parse(responses);
        console.log(parsedResponses);

        // Prepare to save response data
        setMaximum(() => ({ 
          letter: Object.keys(parsedLetters).length - 1,
          response: Object.keys(parsedResponses).length - 1 })
        );
        let tempResponseContent = [];
        Object.keys(parsedResponses).forEach(i => {
          console.log(parsedResponses[i])
          tempResponseContent.push(parsedResponses[i].response);
        })

        setState(() => ({
          letter: tempLetterContent, 
          letter_id: tempLetterId,
          response: tempResponseContent,
        }));
        }
      )
    } catch (err) {
      console.error(err.message);
    }
  }
  getInbox();
  }, []);

  // Send response content to database
  const getResponses = async(e) => {
    try {
      let letter_id = state.letter_id[e];
      console.log("letter_id", letter_id);
      const body = {letter_id};
      const response = await fetch("http://localhost:3000/dashboard/getinboxresponses",
        {
          method: "POST",
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token
          },
        body: JSON.stringify(body)
        }
      )
      const parseResponse = await response.json();
      console.log(parseResponse);
      if(parseResponse) {
        console.log("response received!")
        let parsedJSON = JSON.parse(parseResponse);
        console.log(parsedJSON);
        setMaximum(() => ({ 
          letter: maximum.letter,
          response: Object.keys(parsedJSON).length - 1 })
        );
        let tempResponseContent = [];
        Object.keys(parsedJSON).forEach(i => {
          console.log(parsedJSON[i])
          tempResponseContent.push(parsedJSON[i].response);
        })
        setState(() => ({
          letter: state.letter, 
          letter_id: state.letter_id,
          response: tempResponseContent,
        }));
      } else {
        setState(() => ({
          letter: state.letter, 
          letter_id: state.letter_id,
          response: [],
        }));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("logging!")
    console.log(state.letter);
    console.log(state.letter_id);
    console.log(state.response);
    console.log(maximum.letter);
    console.log(maximum.response);
    console.log(index.letter);
    console.log(index.response);
    console.log(state.response[index.response])
  }, [state.letter, state.letter_id, state.response, state.response_id, maximum.letter, maximum.response, index.letter, index.response])

  // Displays the previous letter
  const clickPreviousLetter = () => {
    console.log("back button clicked!")
    if(index.letter !== 0) {
      getResponses(index.letter-1);
      setIndex({...index, letter: index.letter-1});
    }
  }

  // Displays the next letter
  const clickNextLetter = () => {
    console.log("next button clicked!")
    if(index.letter !== maximum.letter) {
      getResponses(index.letter+1);
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
    if(index.response !== maximum.letter) {
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

            { state.letter ?
            <Fragment>
              <LetterButtons arrow={"back"} />
              <Card sx={{ minWidth: 600, minHeight: 400 }}>
                {state.letter[index.letter]}
              </Card>
              <LetterButtons arrow={"next"} />
            </Fragment>
            :
            null
            }

          </div>
          <br />
        </div>
        <div className="centered">
          <div className="row">

            { state.response.length > 0 ?
            <Fragment>
              <ResponseButtons arrow={"back"} />
              <Card sx={{ minWidth: 600, minHeight: 400 }}>
                {state.response[index.response]}
              </Card>
              <ResponseButtons arrow={"next"} />
            </Fragment>
            :
            null
            }

          </div>
          <br />
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