import React, { Fragment } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Nav
const NavBar = (props) => {
  return (
    <Fragment>
      <Navbar expand="lg" bg="dark" variant="dark" sticky="top">
        <Navbar.Brand to="/home" href="/">
          Medical Image Search
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/Home">
              <Nav.Link href="#">Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link href="#">Add</Nav.Link>
            </LinkContainer>
            {props.currentUser ? (
              <NavDropdown title="My Places" id="basic-nav-dropdown" bg="dark" variant="dark">
                <LinkContainer to="/dashboard">
                  <NavDropdown.Item href="#">Admin Dashboard</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <NavDropdown.Item href="#">My Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/logout">
                  <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            ) : (
              <NavDropdown title="Login/Register" id="basic-nav-dropdown" bg="dark" variant="dark">
                <LinkContainer to="/login">
                  <NavDropdown.Item href="#">Login</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <NavDropdown.Item href="#">Sign-Up</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default NavBar;
