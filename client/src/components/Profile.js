
import React, {useState, useEffect,useContext, Component, Fragment} from 'react';
import Form from "react-bootstrap/Form";
import httpUser from "../httpUser";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";


const Profile = (props) => {
          let history = useHistory();
          let user = httpUser.getCurrentUser();

          const [value, setValue] = useState({
                    name: user ? user.name : "",
                    email: user ? user.email : ""
          })

          useEffect  (()=>{
                    user = httpUser.getCurrentUser();
                    setValue({
                             name: user.name,
                             email: user.email
                    });
                    

                    
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
                              email: "", 
                              name: "",
                    })
                    history.push("/dashboard")
                    
          };


          return (
          <Fragment>
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
          </Fragment>
          );
};

export default Profile;





