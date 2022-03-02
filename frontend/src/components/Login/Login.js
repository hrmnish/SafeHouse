import React, { useState }from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import logo from '../images/logo.svg';
import './Login.css';

// Defines Sign In / Sign Up Tabs component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// Defines parameters for Tabs component
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

// Defines switching between Tabs
function a11yProps(index) {
  return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
  };
}

// Login component
const Login = ({setAuth}) => {

  // Local variables
  const [value, setValue] = useState(0);

  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
  });

  // Set which tab to display
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Verify user credentials and sign in
  const clickSignIn = async(e) => {
    e.preventDefault();
    let email = state.email;
    let password = state.password;
    try {
      const body = {email, password};
      const response = await fetch("http://localhost:3000/auth/login",
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
      );
      const parseResponse = await response.json();
      console.log(parseResponse);

      if(parseResponse.token) {
        localStorage.setItem('token', parseResponse.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Store new user credentials and sign in
  const clickSignUp = async(e) => {
    e.preventDefault();
    let email = state.email;
    let password = state.password;
    let name = state.name;
    try {
      const body = {email, name, password};
      
      const response = await fetch('http://localhost:3000/auth/register', {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(body)    
      });

      const parseResponse = await response.json();
      console.log(parseResponse);
        
      if(parseResponse.token) {
        localStorage.setItem('token', parseResponse.token);
        setAuth(true);
      } else {
        setAuth(false);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // Defines UI for Login component
  return (
    <div className="login-container">

      <div className="left-section">
        <img src={logo} alt="SafeHouse Logo"></img>
        <div className="small-title">This is</div>
        <div className="large-title">SafeHouse</div>
      </div>

      <div className="right-section"> 
        <div className="credentials">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Sign In" sx={{color: 'black'}} disableRipple {...a11yProps(0)} />
              <Tab label="Sign Up" disableRipple {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel className="tab-panel" value={value} index={0}>
            <div className="large-message">Welcome back</div>
            <div className="small-message">Sign in to your account</div>
            <Input placeholder="Email" disableUnderline onChange={e => setState({...state, email: e.target.value})}/>
            <Input placeholder="Password" disableUnderline onChange={e => setState({...state, password: e.target.value})}/>
            <Button variant="outlined" onClick={clickSignIn}>Sign In</Button>
          </TabPanel>
          <TabPanel className="tab-panel" value={value} index={1}>
            <div className="large-message">Welcome to SafeHouse</div>
            <div className="small-message">Create an account now</div>
            <Input placeholder="Name" disableUnderline onChange={e => setState({...state, name: e.target.value})}/>
            <Input placeholder="Email" disableUnderline onChange={e => setState({...state, email: e.target.value})}/>
            <Input placeholder="Password" disableUnderline onChange={e => setState({...state, password: e.target.value})}/>
            <Button variant="outlined" onClick={clickSignUp}>Sign Up</Button>
          </TabPanel>
        </div>
      </div>

    </div>
  );
}

export default Login;
