import React, {useState, Component, Fragment} from 'react'
import httpUser from './httpUser'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


const LogIn = (props) => {
    const [fields, setFields] = useState({email: "", password: ""});

    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.logIn(fields);

        setFields({email: '', password: ''} );
        if(user) {
            props.onLoginSuccess(user);
            props.history.push('/');

        }
    };

    return(
        <Fragment>
        <Row className="justify-content-center">
            <Col className="col-5">
                <h1>Log In</h1>
                <Form onChange={onInputChange} onSubmit={onFormSubmit}>
                <Form.Group controlId="formbasicEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="email@example.com" value={fields.email} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={fields.password} />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
                </Form>
            </Col>
        </Row>
        </Fragment>
    )
};

export default LogIn;
