import React, { Fragment } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Moment from "react-moment";
import "./ViewUser.css";

const ViewUser = ({ user }) => {
  console.log(user);
  if (user) {
    return (
      <Fragment>
        <Card className="sticky-top sticky-top-pad">
          <Card.Header>User Details</Card.Header>
          <Card.Body>
            <Card.Text>
              The selected user has the following characteristics:
            </Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>User Name: <br></br>{user.name}</ListGroup.Item>
              <ListGroup.Item>User Email Address: <br></br>{user.email}</ListGroup.Item>
              <ListGroup.Item>
                User Creation Time:<br></br>
                <Moment format="HH:mm A YYYY/MM/DD">
                {user.createdAt}
                </Moment>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <Card className="sticky-top sticky-top-pad">
          <Card.Header>User Details</Card.Header>
          <Card.Body>
            <Card.Text>
              Select an user from the list on the left to see more information.
            </Card.Text>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
};
export default ViewUser;
