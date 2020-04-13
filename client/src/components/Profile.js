import React, { useState, useEffect, useContext, Component, Fragment, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import httpUser from '../httpUser';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';

const Profile = ({ props, currentUser }) => {
  let history = useHistory();
  const user = useRef(httpUser.getCurrentUser());

  const [value, setValue] = useState({});

  useEffect(() => {
    let name = user.current.name;
    let email = user.current.email;

    setValue({
      name: name,
      email: email,
    });

    // return () => {
    //      setValue({
    //           name: user.name,
    //           email: user.email
    //  });
    // }
  }, []);

  const handleChange = (e) => {
    e.persist();
    console.log(value);
    setValue({
      ...value,
      [e.target.name]: e.target.value,

      createdAt: Date.now(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userBack = await httpUser.updateUser(value, currentUser._id);
    if (userBack) {
      props.onSignUpSuccess(userBack);
      props.setLogin(true);
      props.setCurrrentUser(userBack);
    }

    setValue({
      email: '',
      name: '',
    });
    history.push('/dashboard');
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Edit My Profile</h1>
          <Form onChange={(e) => handleChange(e)} onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
              <Form.Label>Edit name</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="text"
                name="name"
                defaultValue={value.name}
              />
              <Form.Label>Edit email</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="text"
                name="email"
                defaultValue={value.email}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="success" type="submit" onClick={(e) => handleSubmit(e)}>
                Confirm
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Profile;
