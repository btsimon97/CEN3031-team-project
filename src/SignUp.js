import React, {useState, Component, Fragment} from 'react'
import httpUser from './httpUser'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = (props) => {
    const [fields, setFields] = useState({name: '', email: "", password: ""});

    // used to update user input for either password or email
    const onInputChange = (e) => {
        e.persist();
        setFields(fields => ({...fields, [e.target.name]: e.target.value}))
    };

    // used to submit user values for password and email
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const user = await httpUser.signUp(fields);

        setFields({name: '', email: '', password: ''} );
        if(user) {
            props.onSignUpSuccess(user);
            props.history.push('/');
        }
    };

    return(
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-5">
                    <h1>Sign Up</h1>
                    <Form onChange={onInputChange} onSubmit={onFormSubmit}>
                        <Form.Group controlId="">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Alex Smith" value={fields.name} />
                        </Form.Group>
                        <Form.Group controlId="formbasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="email@example.com" value={fields.email} />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={fields.password} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </Form>
                </div>
            </div>
        </Fragment>
    )
};

export default SignUp;