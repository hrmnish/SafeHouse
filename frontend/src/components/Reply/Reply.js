import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
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
    content: []
  });

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
      let parsedJSON = JSON.parse(parseResponse);

      setMaxLetters(Object.keys(parsedJSON).length - 1);

      let tempLetterId = [];
      let tempLetterContent = [];
      Object.keys(parsedJSON).forEach(i => {
        tempLetterId.push(parsedJSON[i].letter_id);
        tempLetterContent.push(parsedJSON[i].letter);
      })
      setState(prevState => ({ content: tempLetterContent, letter_id: tempLetterId }));
    } catch (err) {
      console.error(err.message);
    }
  };
  getLetters();
  }, []);

  // Displays the previous letter
  const clickBack = () => {
    console.log("back button clicked!")
    if(index !== 0) {
      setIndex(index - 1)
    }
  }

   // Displays the next letter
  const clickNext = () => {
    console.log("next button clicked!")
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
        { index > 0 ?
        <IconButton onClick={clickBack} disableRipple>
          <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
        </IconButton>
        : 
        <IconButton onClick={clickBack} disableRipple disabled>
          <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
        </IconButton>
        }

        { state.content.length > 0 ?
        <Card sx={{ minWidth: 600, minHeight: 400 }}>
          {state.content[index]}
        </Card>
        :
        null
        }

        { index < maxLetters ?
        <IconButton onClick={clickNext} disableRipple>
          <NavigateNextIcon sx={{ fontSize: "50px" }}/>
        </IconButton>
        : 
        <IconButton onClick={clickNext} disableRipple disabled>
          <NavigateNextIcon sx={{ fontSize: "50px" }}/>
        </IconButton>
        }
      </div>
      <br />
      <div className="buttons">
        <Button variant="contained" onClick={() => navigate("/desk")}>Back</Button>
        <Button variant="contained" onClick={() => navigate("/response",  
          { state: {letter: state.content[index], 
            letter_id: state.letter_id[index]}})}>
          Reply
        </Button>
      </div>
    </div>
  );
};

export default Reply;