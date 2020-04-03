import React, {Fragment} from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const ViewUser = ({user}) => {
    console.log(user)
    if(user)
    {
        return (
            <Fragment>
                <Card>
                <Card.Header>User Details</Card.Header>
                    <Card.Body>
                        <Card.Text>The selected user has the following characteristics:</Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>User Name: {user.name}</ListGroup.Item>
                            <ListGroup.Item>User Email Address: {user.email}</ListGroup.Item>
                            <ListGroup.Item>User Creation Time: {user.createAt}</ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }
    else 
    {
        return (
            <Fragment>
                <Card>
                    <Card.Header>User Details</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Select an user from the list on the left to see more information.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }

};
export default ViewUser;
