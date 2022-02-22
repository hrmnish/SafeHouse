import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './Reply.css';


const Reply = () => {
  // Local variables
  const navigate = useNavigate();

  // Total number of letters
  const maxLetters = 2;

  // Tracks the current letter in the stack
  const [index, setIndex] = useState(0);

  // Hardcoded values for letters
  const dict = [
    "1. This is the content of the first letter",
    "2. This is the content of the second letter",
    "3. This is the content of the third letter",
  ]

  // Custom made letter component
  function Letter(props) {
    const { content } = props;
    return (
    <Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} gutterBottom>
          {content}
        </Typography>
      </CardContent>
    </Fragment>
    );
  };

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

        <Card sx={{ minWidth: 600, minHeight: 400 }}>
          <Letter content={dict[index]} />
        </Card>

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
        <Button variant="contained" onClick={() => navigate("/response",  { state: {letter: dict[index]} })}>Reply</Button>
      </div>
    </div>
  );
};

export default Reply;