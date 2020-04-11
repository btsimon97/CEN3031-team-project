import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useHistory } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';


const AddInstrument = () => {
  const [keyterms, setKeyterms] = useState([]);
  const { addInstrument } = useContext(GlobalContext);

  let history = useHistory();
  useEffect(() => {
      return () => {
      }
  },[])

  const onChange = (e) =>{
    e.preventDefault();
    setKeyterms(e.target.value.split(','));
  }

  const onSubmit = async  (event) => {
    event.preventDefault();
    let newInstrument; 
    newInstrument = {
      keyterms: keyterms
    };
    addInstrument(newInstrument)
    // await axios.post("/api/listings", newInstrument);
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
