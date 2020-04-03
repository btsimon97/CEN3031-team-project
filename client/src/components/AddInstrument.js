import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AddInstrument = ({ currentAppData, setCurrentAppData }) => {
  const [keyterms, setKeyterms] = useState([]);

  useEffect(() => {
      console.log("App mounted")
      return () => {
        console.log("Add unmounted")

      }
  },[])

  const handleChange = (e) =>{
    e.preventDefault();
    setKeyterms(e.target.value.split(','));
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let newInstrument; 
    newInstrument = {
      keyterms: keyterms
    };

    console.log(currentAppData)
    axios
      .post("/api/listings/", newInstrument)
      .then(res => console.log(currentAppData))
      .then(console.log("success!"));
    
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Add New Instrument</h1>
          <Form onSubmit = {(event) =>{handleSubmit(event)}} onChange = {(e) =>{handleChange(e)}}>
            <Form.Group>
              <Form.Label>Instrument Keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="scalpel,single-use"
              ></Form.Control>
              <Form.Text className="text-muted">
                Enter the keywords you want to use to find this instrument.
                Separate your keywords with a comma if using multiple keywords.
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" href="/">
              Add Instrument
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AddInstrument;
