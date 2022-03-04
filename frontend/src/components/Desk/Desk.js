import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import WriteIcon from '../../images/write.svg';
import ReplyIcon from '../../images/reply.svg';
import InboxIcon from '../../images/inbox.svg';
import LogoutIcon from '../../images/logout.svg';
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
      <div className="button-group">
        <div className="button-row">
          <IconButton onClick={() => navigate("/letter")} disableRipple>
            <img src={WriteIcon} height={150} width={150} alt="Write a letter"/>
          </IconButton>
          <IconButton onClick={() => navigate("/inbox")} disableRipple>
           <img src={InboxIcon} height={150} width={150} alt="View inbox"/>
          </IconButton>
          </div>
          <div className="button-row">
          <IconButton onClick={clickLogout} disableRipple>
            <img src={LogoutIcon} height={150} width={150} alt="Logout"/>
          </IconButton>
          <IconButton onClick={() => navigate("/reply")} disableRipple>
            <img src={ReplyIcon} height={150} width={150} alt="Reply to a letter"/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Desk;