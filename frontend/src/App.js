import React, { Fragment, useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Desk from './components/Desk/Desk';
import Letter from './components/Letter/Letter';
import Reply from './components/Reply/Reply';
import Response from './components/Response/Response';
import Inbox from './components/Inbox/Inbox';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

function App() {

  // Stores whether user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to change value of isAuthenticated
  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  // Verify that the user is valid with JWT
  async function isAuth() {
    try {
      const response = await fetch("http://localhost:3000/auth/is-verified", {
        method: "GET",
        headers: { token: localStorage.token }
      });
      
      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message); 
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

  // Decides which page to display
  return (
    <Fragment>
      <Router>
        <div className="App">
          <Routes>
            <Route 
              path="/" 
              element={
                !isAuthenticated ? (
                <Login setAuth={setAuth}/>
                ) : (
                <Navigate to="/desk" />
              )}
            />
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                <Login setAuth={setAuth}/>
                ) : (
                <Navigate to="/desk" />
              )}
            />
            <Route 
              path="/desk" 
              element={
                isAuthenticated ? (
                <Desk setAuth={setAuth}/>
                ) : (
                <Navigate to="/login" />
              )}
            />
            <Route 
              path="/letter" 
              element={
                isAuthenticated ? (
                <Letter setAuth={setAuth}/>
                ) : (
                <Navigate to="/login" />
              )}
            />
             <Route 
              path="/reply" 
              element={
                isAuthenticated ? (
                <Reply setAuth={setAuth}/>
                ) : (
                <Navigate to="/login" />
              )}
            />
             <Route 
              path="/response" 
              element={
                isAuthenticated ? (
                <Response setAuth={setAuth}/>
                ) : (
                <Navigate to="/login" />
              )}
            />
            <Route 
              path="/inbox" 
              element={
                isAuthenticated ? (
                <Inbox setAuth={setAuth}/>
                ) : (
                <Navigate to="/login" />
              )}
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
