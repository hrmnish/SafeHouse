import React from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import WriteIcon from '../../images/write.svg';
import ReplyIcon from '../../images/reply.svg';
import InboxIcon from '../../images/inbox.svg';
import './Desk.css';

const Desk = ({ setAuth }) => {
  // Local variables
  const navigate = useNavigate();

  // Log out user and return to login 
  const clickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };

  // Defines UI for Desk component
  return (
    <div className="desk-container">
      <div className="button-row">
        <Button variant="contained" onClick={clickLogout}>Log out</Button>
        <br />
        <IconButton  onClick={() => navigate("/letter")} disableRipple>
          <img src={WriteIcon} height={150} width={150} alt="Write a letter"/>
        </IconButton>
        {/* <Button variant="contained" onClick={() => navigate("/letter")}>Write a letter</Button> */}
        <br />
        <br />
        <IconButton onClick={() => navigate("/reply")} disableRipple>
          <img src={ReplyIcon} height={150} width={150} alt="Reply to a letter"/>
        </IconButton>
        {/* <Button variant="contained" onClick={() => navigate("/reply")}>Reply to a letter</Button> */}
        <br />
        <br />
        <IconButton onClick={() => navigate("/inbox")} disableRipple>
        <img src={InboxIcon} height={150} width={150} alt="View inbox"/>
        </IconButton>
        {/* <Button variant="contained" onClick={() => navigate("/inbox")}>View Inbox</Button> */}
      </div>
    </div>
  );
};

export default Desk;