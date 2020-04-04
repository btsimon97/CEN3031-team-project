import React, { useState, useEffect, Fragment } from "react";
import httpUser from "./../httpUser";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import axios from "axios";

const SignUp = props => {
  const [fields, setFields] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState(false);

  useEffect(() => {
    return () => {
        console.log("Signup unmount!")
        setLogin(false);
    };
  },[login]);

  // used to update user input for either password or email
  const onInputChange = e => {
    e.persist();
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // used to submit user values for password and email
  const onFormSubmit = async e => {
    console.log(fields);
    console.log(process.env.PORT)
    e.preventDefault();
    const user = await httpUser.signUp(fields);
    if (user) {
      props.onSignUpSuccess(user);
      
      setLogin(true);
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Sign Up</h1>
          <Form
            onChange={e => {
              onInputChange(e);
            }}
            onSubmit={onFormSubmit}
          >
            <Form.Group controlId="">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Alex Smith" name="name" />
            </Form.Group>
            <Form.Group controlId="formbasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                name="email"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>`
      </Row>
    </Fragment>
  );
};

export default SignUp;
