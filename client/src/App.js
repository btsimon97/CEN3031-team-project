import React, { useState, useEffect } from "react";
import AddInstrument from "./components/AddInstrument";
import httpUser from "./httpUser";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import LogIn from "./components/LogIn.js";
import SignUp from "./components/SignUp";
import LogOut from "./components/LogOut";
import Dashboard from "./components/Dashboard.js";
import NotFound from "./components/NotFound";
import Admin from "./components/Admin.js"

import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Container from "react-bootstrap/Container";


const App = () => {
  const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());
  const [currentAppData, setCurrentAppData] = useState([]);
  const [filterText, setFilterText] = useState("");

  const onLoginSuccess = () => {
    setCurrentUser(httpUser.getCurrentUser());
  };

  const logOut = () => {
    httpUser.logOut();
    setCurrentUser(null);
  };

  return (
    <div>
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
                  filterText = {filterText}
                  setFilterText = {setFilterText}
                  currentUser = {currentUser}
                />
              )}
            />
            <Route exact path="/">
                    <Redirect to="/Home" />
            </Route>
              )}
            />
            <Route
              exact
              path="/admin"
              render={() => (
                <Admin
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
              render={props => {
                return currentUser ? <Dashboard {...props} filterText = {filterText} setFilterText = {setFilterText}/> : <Redirect to="/login" />;
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
    </div>
  );
};

export default App;
