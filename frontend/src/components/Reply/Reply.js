import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Typography from '@mui/material/Typography';
import './Reply.css';


const Reply = () => {
  // Local variables
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

  function LetterButtons(props) {
    if(state.letter.length <= 1) {
      return null;
    }
    else if(props.arrow === "back") {
      if (index > 0) {
      return  <IconButton onClick={clickBack} disableRipple>
                <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
              </IconButton>;
      } else {
        return  <IconButton onClick={clickBack} disabled disableRipple>
                  <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
      }
    } else {
      if (index < maxLetters) {
        return  <IconButton onClick={clickNext} disableRipple>
                  <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
        } else {
          return  <IconButton onClick={clickNext} disabled disableRipple>
                    <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>
        }
    } 
  }

  useEffect(() => {
    // Get ten letters from database
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
  const clickBack = () => {
    if(index !== 0) {
      setIndex(index - 1)
    }
  }

   // Displays the next letter
  const clickNext = () => {
    if(index !== maxLetters) {
      setIndex(index + 1)
    }
  }

  // Defines UI for Reply component
  return (
    <div className="reply-container">
      <h1>Reply to a letter!</h1>
      <br />
      <div className="letters">
        <LetterButtons arrow="back"></LetterButtons>

        { state.letter.length > 0 ?
        <Card sx={{ minWidth: 600, minHeight: 400 }}>
          {state.letter[index]}
        </Card>
        :
        <Typography variant="h6">Your letters are being delievered.<br />Please check again soon!</Typography>
        }

        <LetterButtons arrow="next"></LetterButtons>
      </div>
      <br />
      <div className="buttons"> 
        { state.letter.length > 0 ?
        <Fragment>
          <Button variant="contained" onClick={() => navigate("/desk")}>Back</Button>
          <Button variant="contained" onClick={() => navigate("/response",  
            { state: {letter: state.letter[index], 
              letter_id: state.letter_id[index]}})}>
            Reply
          </Button>
        </Fragment>
        : 
        <Button variant="contained" onClick={() => navigate("/desk")}>Back</Button>
        }
      </div>
    </div>
  );
};

export default Reply;