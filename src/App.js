import React, {useState, useEffect} from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';
import AddBuilding from "./components/AddBuilding";
import axios from 'axios';
import httpUser from './httpUser'
import Home from './components/Home';
import NavBar from './components/NavBar';
import LogIn from "./LogIn.js"
import SignUp from "./SignUp"
import LogOut from "./LogOut"
import Dashboard from "./Dashboard.js"
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'


const App = () => {
    const [currentUser, setCurrentUser] = useState(httpUser.getCurrentUser());

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
            <div className="container-fluid">
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
                    <Route path="/add" exact component={AddBuilding} />
                    <Route path="/" exact component={Home} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/login" exact component={LogIn}/>

                </Switch>
            </div>
            </body>            
        </Router>
    );
};

export default App;
