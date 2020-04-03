import React, {Fragment} from 'react';
import { LinkContainer } from 'react-router-bootstrap'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'

//https://medium.com/@rose.espiritu1/creating-a-custom-404-notfound-page-with-react-routers-3cc9106de84

const NotFound = () => (
        <Fragment>
                <br></br>
                <Row className="justify-content-center">
                        <Col className="col-7">
                        <Jumbotron>
                                <h1>Page Not Found</h1>
                                <p>We're sorry, but the page you're attempting to access could not be found.</p>
                                <p>If you followed an external link to get here, double-check your typing and try again.</p> 
                                <p>
                                        You may also be getting this message if you are attempting to access a page that requires authentication and are not signed in.
                                Try logging in or creating an account and retry the operation again.
                                </p>
                                <p>If you're not sure where to go from here, click the button below to return to the home page.</p>
                                <LinkContainer to='/Home'><Button variant="primary">Return to Homepage</Button></LinkContainer>
                        </Jumbotron>
                        </Col>
                </Row>
        </Fragment>
);
export default NotFound;
