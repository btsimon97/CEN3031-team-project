import React, { useState, useEffect } from "react";
import AddInstrument from "./components/AddInstrument";
import axios from "axios";
import httpUser from "./httpUser";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import LogIn from "./components/LogIn.js";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import Dashboard from "./components/Dashboard.js";
import NotFound from "./components/NotFound";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Container from "react-bootstrap/Container";

const App = () => {
  const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());
  const [currentAppData, setCurrentAppData] = useState([]);

  useEffect(() => {
    console.log("App mounted");
    async function fetchData() {
      const result = await axios.get("api/listings/");
      setCurrentAppData(result.data);
      let i = 0;
      for (i; i < currentAppData.length; i++) {
        currentAppData[i].id = currentAppData[i]._id;
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log("List componented updated or mounted");
    axios.get('api/listings/').then((res) => setCurrentAppData(currentAppData))
    let i = 0;
    for (i; i < currentAppData.length; i++) {
    currentAppData[i].id = currentAppData[i]._id;
    }
  },[])

  const onLoginSuccess = () => {
    setCurrentUser(httpUser.getCurrentUser());
  };

  const logOut = () => {
    httpUser.logOut();
    setCurrentUser(null);
  };

  //https://www.youtube.com/watch?v=Law7wfdg_ls&t=456s

  return (
    <Router>
      <NavBar currentUser={currentUser} />
      <body>
        <Container fluid>
          <Switch>
            <Route
              exact
              path="/home"
              render={() => (
                <Home
                  currentAppData={currentAppData}
                  setCurrentAppData={setCurrentAppData}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => (
                <Home
                  currentAppData={currentAppData}
                  setCurrentAppData={setCurrentAppData}
                />
              )}
            />
            <Route
              path="/login"
              render={props => {
                return (
                  <LogIn
                    {...props}
                    onLoginSuccess={onLoginSuccess}
                    Redirect
                    to="/home"
                  />
                );
              }}
            />
            <Route
              path="/signup"
              render={props => {
                return <SignUp {...props} onSignUpSuccess={onLoginSuccess} />;
              }}
            />
            <Route
              path="/logout"
              render={props => {
                return <LogOut onLogOut={logOut} />;
              }}
            />
            <Route
              path="/dashboard"
              render={() => {
                return currentUser ? <Dashboard /> : <Redirect to="/login" />;
              }}
            />
            <Route
              exact
              path="/add"
              render={() => (
                <AddInstrument
                  currentAppData={currentAppData}
                  setCurrentAppData={setCurrentAppData}
                />
              )}
            />
            <Route path="*" component={NotFound} />
          </Switch>
        </Container>
      </body>
    </Router>
  );
};

export default App;
