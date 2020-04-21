import React, { useState, useEffect, Fragment } from 'react';
import httpUser from './../httpUser';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const LogIn = (props) => {
  const [fields, setFields] = useState({ email: '', password: '' });

  useEffect(() => {
    console.log('Login mounted');
  }, []);

  // used to update user input for either password or email
  const onInputChange = (e) => {
    e.persist();
    setFields((fields) => ({ ...fields, [e.target.name]: e.target.value }));
    console.log(fields);
  };

  // used to submit user values for password and email
  const onFormSubmit = async (e) => {
    console.log(fields);
    e.preventDefault();
    const user = await httpUser.logIn(fields);
    setFields({ email: '', password: '' });
    console.log(user);
    if (user) {
      props.onLoginSuccess(user);
      if (user.isAdmin) {
        props.history.push('/dashboard');
      } else {
        props.history.push('/home');
      }
      console.log('Login successful');
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Log In</h1>
          <Form onChange={onInputChange} onSubmit={onFormSubmit}>
            <Form.Group controlId="formbasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="email@example.com" name="email" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default LogIn;
