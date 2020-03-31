import React, {Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'

const NavBar = (props) => {
    return (
            <Fragment>
                <Navbar expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#">Medical Image Search</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to='/Home'><Nav.Link href="#">Home</Nav.Link></LinkContainer>
                        <LinkContainer to='/add'><Nav.Link href="#">Add</Nav.Link></LinkContainer>
                        {props.currentUser ?
                        (
                            <NavDropdown title="Account" id="basic-nav-dropdown" bg="dark" variant="dark">
                            <LinkContainer to='/dashboard'><NavDropdown.Item href="#">Profile</NavDropdown.Item></LinkContainer>
                            <LinkContainer to='/logout'><NavDropdown.Item href="#">Logout</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        ) :
                        ( 
                            <NavDropdown title="Login/Register" id="basic-nav-dropdown" bg="dark" variant="dark">
                            <LinkContainer to='/login'><NavDropdown.Item href="#">Login</NavDropdown.Item></LinkContainer>
                            <LinkContainer to='/signup'><NavDropdown.Item href="#">Sign-Up</NavDropdown.Item></LinkContainer>
                            </NavDropdown>
                        )
                    }
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Fragment>
    )
};

export default NavBar;
