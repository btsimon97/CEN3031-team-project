import React, { useState, useEffect, Component, Fragment } from "react";
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



  const handleSubmit = (event) => {
    console.log(event.target.value)
    event.preventDefault();
    let keytermsArr = keyterms.split(",");
    setKeyterms(keytermsArr);
    let newInstrument;
    newInstrument = {
      keyterms: keytermsArr
    };
    axios
      .post("https://cen3031-team-project.herokuapp.com/api/listings/", newInstrument)
      .then(res => console.log(currentAppData))
      .then(console.log("success!"));
    
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Add New Instrument</h1>
          <Form >
            <Form.Group>
              <Form.Label>Instrument Keywords</Form.Label>
              <Form.Control
                type="text"
                placeholder="scalpel,single-use"
                onSubmit={handleSubmit}
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
