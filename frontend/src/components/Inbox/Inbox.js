import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import './Inbox.css';

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

  // Stores loaded letters and letter ids
  let [state, setState] = useState({
    letter_id: [],
    letter: [],
    response: [],
  });

  // Controls arrows for letters
  function LetterButtons(props) {
    if(state.letter.length < 1) {
      return null;
    }
    else if(props.arrow === "back") {
      return  <IconButton onClick={clickPreviousLetter} disableRipple>
                <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
              </IconButton>;
    } else {
        return  <IconButton onClick={clickNextLetter} disableRipple>
                  <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
    }
  }

  // Controls arrows for responses
  function ResponseButtons(props) {
    if(state.response.length < 1) {
      return null;
    }
    else if(props.arrow === "back") {
      if(state.response.length > 1) {
      return  <IconButton onClick={clickPreviousResponse} disableRipple>
                <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
              </IconButton>;
      } else {
        return <IconButton onClick={clickPreviousResponse} disabled disableRipple>
                <NavigateBeforeIcon sx={{ fontSize: "50px" }}/>
              </IconButton>;
      }
    } else { 
        if(state.response.length > 1) {
        return  <IconButton onClick={clickNextResponse} disableRipple>
                  <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                </IconButton>;
        } else {
          return  <IconButton onClick={clickNextResponse} disabled disableRipple>
                    <NavigateNextIcon sx={{ fontSize: "50px" }}/>
                  </IconButton>;
        }
    }
  }

  // Controls buttons on bottom row
  function ActionButtons(props) {
    if(state.letter.length === 0) {
      return <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
    }
    else if(sortByLetter) {
      return <Fragment>
        <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
        <Button variant="outlined" onClick={sortInbox}>Sort by Response</Button>
      </Fragment>
    } 
    else {
      return <Fragment>
        <Button variant="outlined" onClick={() => navigate("/desk")}>Back</Button>
        <Button variant="outlined" onClick={sortInbox}>Sort by Letter</Button>
      </Fragment>
    }
  }

  // Sort inbox by letter or response
  const sortInbox = () => {
    getResponses(maximum.letter);
    setIndex(() => ({ 
      letter: 0,
      response: 0
    }));
    console.log(state.letter.reverse());
    console.log(state.letter_id.reverse());
    setState(() => ({
      letter: state.letter.reverse(), 
      letter_id: state.letter_id.reverse(),
      response: state.response,
    }));
    setSort(!sortByLetter);
  }

  // Retrieve letters and initial response
  useEffect(() => {
    const getInbox = async() => {
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
        //console.log(parsedLetters);
        let parsedResponses = JSON.parse(responses);
        //console.log(parsedResponses);

        // Prepare to save response data
        setMaximum(() => ({ 
          letter: Object.keys(parsedLetters).length - 1,
          response: Object.keys(parsedResponses).length - 1 })
        );
        let tempResponseContent = [];
        Object.keys(parsedResponses).forEach(i => {
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
      //console.log(parseResponse);
      if(parseResponse) {
        let parsedJSON = JSON.parse(parseResponse);
        //console.log(parsedJSON);
        setMaximum(() => ({ 
          letter: maximum.letter,
          response: Object.keys(parsedJSON).length - 1 })
        );
        let tempResponseContent = [];
        Object.keys(parsedJSON).forEach(i => {
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

  // useEffect(() => {
  //   // console.log("logging!")
  //   // console.log(state.letter);
  //   // console.log(state.letter_id);
  //   // console.log(state.response);
  //   // console.log(maximum.letter);
  //   // console.log(maximum.response);
  //   // console.log("index.letter", index.letter);
  //   // console.log("index.response", index.response);
  //   // console.log(state.response[index.response])
  // }, [state.letter, state.letter_id, state.response, state.response_id, maximum.letter, maximum.response, index.letter, index.response])

  // Displays the previous letter
  const clickPreviousLetter = () => {
    if(index.letter !== 0) {
      getResponses(index.letter-1);
      setIndex({...index, letter: index.letter-1, response: 0});
    } else {
      getResponses(maximum.letter);
      setIndex({...index, letter: maximum.letter, response: 0});
    }
  }

  // Displays the next letter
  const clickNextLetter = () => {
    if(index.letter !== maximum.letter) {
      getResponses(index.letter+1);
      setIndex({...index, letter: index.letter+1, response: 0});
    } else {
      getResponses(0);
      setIndex({...index, letter: 0, response: 0});
    }
  }

  // Displays the previous response
  const clickPreviousResponse = () => {
    if(index.response !== 0) {
      setIndex({...index, response: index.response-1});
    } else {
      setIndex({...index, response: maximum.response});
    }
  }
  
  // Displays the next response
  const clickNextResponse = () => {
    if(index.response !== maximum.response) {
      setIndex({...index, response: index.response+1});
    } else {
      setIndex({...index, response: 0});
    }
  }

  // Defines UI for Inbox component
  return (
    <div className="inbox-container">
    { state.letter.length > 0 ?
      <Fragment>
        <div className="label">
          <div className="label-text">Look back at past letters</div>
        </div>
        <div className="row">
          <LetterButtons arrow={"back"} />
          <Card>{state.letter[index.letter]}</Card>
          <LetterButtons arrow={"next"} />
          <ResponseButtons arrow={"back"} />
          { state.response.length > 0 ?
          <Card>{state.response[index.response]}</Card>
          :
          null
          }
          <ResponseButtons arrow={"next"} />
        </div>
      </Fragment>
    :
    <div className="label">
      <div className="label-text">You have not sent any letters yet.</div>
    </div>
    }
    <div className="bottom-buttons">
      <ActionButtons></ActionButtons>
    </div>
    </div>
  );
};

export default Inbox;