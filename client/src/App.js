import React, { useState, useEffect, useContext } from 'react';
import AddInstrument from './components/AddInstrument';
import Home from './components/Home';
import NavBar from './components/NavBar';
import LogIn from './components/LogIn.js';
import SignUp from './components/SignUp';
import LogOut from './components/LogOut';
import Dashboard from './components/Dashboard.js';
import NotFound from './components/NotFound';
import Admin from './components/Admin.js';
import Profile from './components/Profile.js';
import httpUser from './httpUser';

import { Switch, Route, Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import { GlobalContext } from './context/GlobalState';
import UpdateInstrument from './components/UpdateInstrument';

const App = () => {
  const { getUsers, users, getInstruments } = useContext(GlobalContext);
  const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());

  // useEffect(()=>{
  //      console.log("App mounted! ");
  //      getInstruments();
  // },[])

  useEffect(() => {
    getUsers();
    getInstruments();
  }, []);

  const onLoginSuccess = () => {
    console.log(httpUser.getCurrentUser());
    setCurrentUser(httpUser.getCurrentUser());
  };

  const logOut = () => {
    httpUser.logOut();
    setCurrentUser(null);
  };

  return (
    <body>
      <NavBar currentUser={currentUser} />
      <Container fluid>
        <Switch>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/Home" />
          </Route>
          <Route exact path="/update">
            <UpdateInstrument />
          </Route>
          <Route exact path="/admin" component={Admin} />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile props={props} currentUser={currentUser} />}
          />
          <Route
            path="/login"
            render={(props) => {
              return <LogIn {...props} onLoginSuccess={onLoginSuccess} Redirect to="/home" />;
            }}
          />
          <Route
            path="/signup"
            render={(props) => {
              return <SignUp {...props} onSignUpSuccess={onLoginSuccess} />;
            }}
          />
          <Route
            path="/logout"
            render={(props) => {
              return <LogOut onLogOut={logOut} />;
            }}
          />
          <Route
            path="/dashboard"
            render={(props) => {
              return currentUser ? (
                <Dashboard
                  {...props}
                  users={users}
                  fetch={fetch}
                  // filterText={filterText}
                  // setFilterText={
                  //      setFilterText
                  // }
                />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route exact path="/add" component={AddInstrument} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Container>
    </body>
  );
};

export default App;
