import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import PremiumContent from "./PremiumContent";
import PrivateWrapper from './routes/PrivateWrapper';
import React, { useEffect, useState } from "react";
import { getUser, getToken, setUserSession, resetUserSession }  from "./service/AuthService";
import axios from "axios";


const verifyTokenAPIURL = 'https://1dm9lngs6g.execute-api.us-east-1.amazonaws.com/prod/verify';


function App() {

    const [isAuthenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token === 'undefined' || token === undefined || token === null || !token) {
      return;
    }

    const requestConfig = {
      headers: {
          'x-api-key': '58TEcBUZKGaipxa9nYEAT3whCCTGwPTz1jpKahv3'
      }
    };

    const requestBody = {
      user: getUser(),
      token: token
    }

    axios.post(verifyTokenAPIURL, requestBody, requestConfig).then(response => {
        setUserSession(response.data.user, response.data.token);
        setAuthenticating(false);
    }).catch(() => {
      resetUserSession();
      setAuthenticating(false);
    })
  }, []);


  const token = getToken();
  if (isAuthenticating && token) {
    return <div className="content">Authenticating...</div>
  }

  return (
    <div className="App">
      <Router> {/* Envuelve toda tu aplicación con BrowserRouter */}
        <div className="header">
          <NavLink exact activeClassName="active" to="/">Home</NavLink>
          <NavLink activeClassName="active" to="/register">Register</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink>
          <NavLink activeClassName="active" to="/premium-content">Premium Content</NavLink>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<PrivateWrapper />}>
                <Route path="/premium-content" element={<PremiumContent />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;