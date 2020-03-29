import React, {useState, useEffect} from 'react';
import AddInstrument from "./components/AddInstrument";
import axios from 'axios';
import httpUser from './httpUser'
import Home from './components/Home';
import NavBar from './components/NavBar';
import LogIn from "./LogIn.js"
import SignUp from "./SignUp"
import LogOut from "./LogOut"
import Dashboard from "./Dashboard.js"
import NotFound from "./NotFound"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Container from 'react-bootstrap/Container'
// {currentAppData,ssetCurrentAppData}
const App = () => {
    const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());
    const [currentAppData, setCurrentAppData] = useState([]);
    
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
            
            <NavBar currentUser={currentUser}/>
            <body>
            <Container fluid>
                <Switch> 
                    <Route path="/login" render={(props) => {
                    return <LogIn {...props} onLoginSuccess={onLoginSuccess} Redirect to="/home"/>
                    }} />
                    <Route path="/signup" render={(props) => {
                    return <SignUp {...props} onSignUpSuccess={onLoginSuccess} />
                    }} />
                    <Route path="/logout" render={(props) => {
                    return <LogOut onLogOut={logOut} />
                    }}/>
                    <Route path="/dashboard" render={() => {
                    return currentUser ? <Dashboard /> : <Redirect to="/login" />
                    }}/>
                    <Route path="/add" render={() => {
                    return <AddInstrument currentAppData={currentAppData} setCurrentAppData={setCurrentAppData}/>
                    }}/>
                    <Route path="/home" render={() => {
                    return <Home currentAppData={currentAppData} setCurrentAppData={setCurrentAppData}/>
                    }}/>
                    <Route path="/" render={() => {
                    return <Home currentAppData={currentAppData} setCurrentAppData={setCurrentAppData}/>
                    }}/>
                    
                    <Route path= "*" component={NotFound}/>


                </Switch>
            </Container>
            </body>            
        </Router>
    );
};

export default App;
