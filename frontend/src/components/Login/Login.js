import React, { useState }from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
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

  // Local functions
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function setEmail(event) {
    setState({...state, email: event.target.value});
  };

  function setPassword(event) {
    setState({...state, password: event.target.value});
  };

  function setName(event) {
    setState({...state, name: event.target.value});
  };

  const clickSignIn = async(e) => {
    e.preventDefault();
    let email = state.email;
    let password = state.password;
    try {
      const body = {email, password};
      const response = await fetch("http://localhost:5000/auth/login",
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

  const clickSignUp = async(e) => {
    e.preventDefault();
    let email = state.email;
    let password = state.password;
    let name = state.name;
    try {
      const body = {email, name, password};
      
      const response = await fetch('http://localhost:5000/auth/register', {
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
        <div className="logo">Logo</div>
        <div className="title">This is SafeHouse</div>
      </div>

      <div className="right-section"> 
        <div className="credentials">
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Sign In" {...a11yProps(0)} />
              <Tab label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className="tab-panel">
            <div>Welcome back</div>
            <div className="welcome">Sign in to your account</div>
            <TextField onChange={setEmail} label="Email" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
            <TextField onChange={setPassword} label="Password" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
            <Button variant="contained" onClick={clickSignIn}>Sign In</Button>
          </TabPanel>
          <TabPanel value={value} index={1} className="tab-panel">
            <div>Welcome to SafeHouse</div>
            <div className="welcome">Create an account now</div>
            <TextField onChange={setName} label="Full name" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
            <TextField onChange={setEmail} label="Email" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
            <TextField onChange={setPassword} label="Password" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
            <Button variant="contained" onClick={clickSignUp}>Sign Up</Button>
          </TabPanel>
        </div>
      </div>

    </div>
  );
}

export default Login;
