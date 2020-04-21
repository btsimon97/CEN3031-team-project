import React, { useState, useEffect, useContext, Component, Fragment, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import httpUser from '../httpUser';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const Profile = (props) => {
  let history = useHistory();
  // const user = useRef(httpUser.getCurrentUser());

  const [value, setValue] = useState({});

  const { setCurrentUser, currentUser, setSelectedUser, selectedUser } = useContext(GlobalContext);

  useEffect(() => {
    console.log('currentuser', currentUser);
    console.log('selecteduser', selectedUser);
    if (!selectedUser) {
      setSelectedUser(currentUser);
    }

    let name = selectedUser ? selectedUser.name : '';
    let email = selectedUser ? selectedUser.email : '';

    if (currentUser && !currentUser.isAdmin) {
      name = currentUser.name;
      email = currentUser.email;
    }

    setValue({
      name: name,
      email: email,
      isAdmin: selectedUser && selectedUser.isAdmin ? selectedUser.isAdmin : false,
      password: selectedUser ? selectedUser.password : '',
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
  const handleAdmin = (e) => {
    e.persist();
    setValue({
      ...value,
      isAdmin: value.isAdmin ? false : true,
    });
    console.log('changing admin mode', selectedUser.isAdmin);

    selectedUser.isAdmin = selectedUser.isAdmin ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(value);
    const userBack = await httpUser.updateUser(value, selectedUser._id);
    console.log(userBack);
    if (userBack && !currentUser.isAdmin) {
      props.onSignUpSuccess(userBack);
      props.setLogin(true);
      props.setCurrentUser(userBack);
    }

    setValue({
      email: '',
      name: '',
    });
    if (!currentUser.isAdmin) {
      httpUser.logOut();
      setSelectedUser(null);
      history.push('/login');
    } else {
      history.push('/dashboard');
    }
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
              <Form.Label>Edit password</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="text" name="password" />
            </Form.Group>
            {currentUser && currentUser.isAdmin && selectedUser && selectedUser.isAdmin && (
              <Form.Group>
                <Button variant="danger" type="button" onClick={(e) => handleAdmin(e)}>
                  Remove Admin privileges
                </Button>
              </Form.Group>
            )}
            {currentUser && currentUser.isAdmin && selectedUser && !selectedUser.isAdmin && (
              <Form.Group>
                <Button variant="info" type="button" onClick={(e) => handleAdmin(e)}>
                  Give Admin privileges
                </Button>
              </Form.Group>
            )}
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
