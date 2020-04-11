
import React, {useState, useEffect,useContext, Component, Fragment} from 'react';
import Form from "react-bootstrap/Form";
import httpUser from "../httpUser";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";


const Profile = (props) => {
          let history = useHistory();
          let user = httpUser.getCurrentUser();

          const [value, setValue] = useState({
                    name: user ? user.name : "",
                    email: user ? user.email : ""
          })

          useEffect  (()=>{
                    user = httpUser.getCurrentUser()
                    console.log(user)
                    setValue({
                             name: user.name,
                             email: user.email
                    });
                    // return () => {
                    //      setValue({
                    //           name: user.name,
                    //           email: user.email
                    //  });
                    // }
          },[])
          

          const handleChange = (e) => {
                    e.preventDefault();
                    setValue({
                              ...value, 
                              [e.target.name]: e.target.value});

               };

          const handleSubmit = async (e) => {
                    e.preventDefault();
                    const userBack = await httpUser.updateUser(value, user._id);
                    if (userBack) {
                      props.onSignUpSuccess(userBack);
                      props.setLogin(true);
                      props.setCurrrentUser(userBack)
                    }
                    
                    setValue({
                              email: userBack.email, 
                              name: userBack.name,
                    })
                    history.push("/dashboard")
                    
          };


          return (
          <Fragment>
               <Row className="justify-content-center">
                    <Col className="col-5">
                         <h1>Edit My Profile</h1>
                         <Form onChange={e => handleChange(e)}
                              onSubmit={e => handleSubmit(e)}>
                              <Form.Group>
                                   <Form.Label>Edit name</Form.Label>
                                   <Form.Control
                                        onChange={e => handleChange(e)}
                                        type="text"
                                        placeholder={"Enter name"}
                                        name="name"
                                        value={value.name}
                                   />

                                   <Form.Label>Edit email</Form.Label>
                                   <Form.Control
                                        onChange={e => handleChange(e)}
                                        type="text"
                                        placeholder={"Enter email"}
                                        name="email"
                                        value={value.email}
                                   />
                              </Form.Group>
                              <Form.Group>
                                   <Button variant="success" type="submit" onClick = {e => handleSubmit(e)}>
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





