import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './Reply.css';

const Reply = () => {
  // Used to navigate between pages
  const navigate = useNavigate();

  // Total number of letters
  const [maxLetters, setMaxLetters] = useState(9);

  // Tracks the current letter in the stack
  const [index, setIndex] = useState(0);

  // Stores loaded letters and letter ids
  let [state, setState] = useState({
    letter_id: [],
    letter: []
  });

  // Controls arrows for letters
  function LetterButtons(props) {
    if(state.letter.length < 1) {
      return null;
    }
    else if(props.arrow === "back") {
      if(state.letter.length > 1) {
      return  <IconButton onClick={clickPreviousLetter} disableRipple>
                <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
              </IconButton>;
      } else {
        return <IconButton onClick={clickPreviousLetter} disabled disableRipple>
                <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
              </IconButton>;
      }
    } else {
      if(state.letter.length > 1) {
        return  <IconButton onClick={clickNextLetter} disableRipple>
                  <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
      } else {
        return  <IconButton onClick={clickNextLetter} disabled disableRipple>
                  <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
      }
    }
  }

  useEffect(() => {
    // Get at most ten letters from database
   const getLetters = async() => {
    try {
      const response = await fetch("http://localhost:3000/dashboard/requestletters",
        {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            token: localStorage.token
          },
        }
      );
      const parseResponse = await response.json();
      if(parseResponse) {
        let parsedJSON = JSON.parse(parseResponse);
        // Prepare to save letter and letter_id data
        setMaxLetters(Object.keys(parsedJSON).length - 1);
        let tempLetterId = [];
        let tempLetterContent = [];
        Object.keys(parsedJSON).forEach(i => {
          tempLetterId.push(parsedJSON[i].letter_id);
          tempLetterContent.push(parsedJSON[i].letter);
        })
        setState(() => ({ letter: tempLetterContent, letter_id: tempLetterId }));
      }

    } catch (err) {
      console.error(err.message);
    }
  };
  getLetters();
  }, []);

  // Displays the previous letter
  const clickPreviousLetter = () => {
    if(index !== 0) {
      setIndex(index - 1);
    } else {
      setIndex(maxLetters);
    }
  }

   // Displays the next letter
  const clickNextLetter = () => {
    if(index !== maxLetters) {
      setIndex(index + 1)
    } else {
      setIndex(0);
    }
  }

  // Defines UI for Reply component
  return (
    <div className="reply-container">
      { state.letter.length > 0 ?
      <Fragment>
        <div className="label">
          <div className="label-text">You've got mail!</div>
        </div>
        <div className="letters">
          <LetterButtons arrow="back"></LetterButtons>
          <Card>{state.letter[index]}</Card>
          <LetterButtons arrow="next"></LetterButtons>
        </div>
        <div className="buttons"> 
          <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
          <Button variant="outlined" onClick={() => navigate("/response",  
            { state: {letter: state.letter[index], 
              letter_id: state.letter_id[index]}})}>
            Reply
          </Button>
        </div>
      </Fragment>
      :
      <Fragment>
        <div className="label">
          <div className="label-text">
          Your letters are being delievered.<br />Please check again soon!
          </div>
        </div>
        <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
      </Fragment>
      }
    </div>
  );
};

export default Reply;