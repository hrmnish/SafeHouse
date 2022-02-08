import React, { Fragment, useState, useEffect } from 'react';
import Login from './components/Login/Login';
import Desk from './components/Desk/Desk';
import Letter from './components/Letter/Letter';
import Inbox from './components/Inbox/Inbox';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verified", {
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
