import React, { useState, useEffect, Component, Fragment} from "react";
import axios from "axios";

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddBuilding = ({ currentAppData, setCurrentAppData }) => {
  const [keyterms, setKeyterms] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/listings/")
      .then(response => {
        setCurrentAppData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleSubmit = event => {
    let keytermsArr = keyterms.split(",")
    
    event.preventDefault();

    let newInstrument;

    newInstrument = {
        keyterms: keytermsArr
    }

    axios
      .post("http://localhost:5000/api/listings/", newInstrument)
      .then(res => console.log(currentAppData))
      .then(console.log("success!"));
    console.log("Added!");

  };

  return (
    <Fragment>
      <div className="row justify-content-center">
        <div className="col-5">
          <h1>Add New Instrument</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Instrument Keywords</Form.Label>
              <Form.Control type="text" placeholder="scalpel,single-use"></Form.Control>
              <Form.Text className="text-muted">Enter the keywords you want to use to find this instrument. Separate your keywords with a comma if using multiple keywords.</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">Add Instrument</Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};
export default AddBuilding;
