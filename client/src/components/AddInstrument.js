import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";


const AddInstrument = ({ currentAppData, setCurrentAppData }) => {
  const [keyterms, setKeyterms] = useState([]);

  let history = useHistory();
  useEffect(() => {
      console.log("App mounted")
      return () => {
        console.log("Add unmounted")

      }
  },[])

  const onChange = (e) =>{
    e.preventDefault();
    setKeyterms(e.target.value.split(','));
    console.log(keyterms)
  }

  const onSubmit = async  (event) => {
    console.log("handling submited")
    event.preventDefault();
    let newInstrument; 
    newInstrument = {
      keyterms: keyterms
    };

    await axios.post("/api/listings", newInstrument);
    history.push('/')
    
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Add New Instrument</h1>
          <Form onSubmit = {onSubmit} onChange = {onChange}>
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
            <Button variant="primary" type="submit">
              Add Instrument
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};
export default AddInstrument;
