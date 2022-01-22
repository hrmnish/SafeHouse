import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';

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
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

function Login() {

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    

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
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
                <Button variant="contained">Sign In</Button>
            </TabPanel>
            <TabPanel value={value} index={1} className="tab-panel">
                <div>Welcome to SafeHouse</div>
                <div className="welcome">Create an account now</div>
                <TextField id="outlined-basic" label="Full name" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
                <TextField id="outlined-basic" label="Password" variant="outlined" sx={{marginBottom: 2, width: 300 }}/>
                <Button variant="contained">Sign Up</Button>
            </TabPanel>
        </div>
    </div>

    </div>
  );
}

export default Login;