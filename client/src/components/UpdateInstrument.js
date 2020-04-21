import React, { useState, useEffect, useContext, Component, Fragment } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';

import { GlobalContext } from '../context/GlobalState';
import Dropzone from './Dropzone.js';
import axios from 'axios';

const UpdateInstrument = () => {
  const { instrument, updateInstrument, getInstruments, uploadedImage } = useContext(GlobalContext);
  const [value, setValue] = useState('');

  let history = useHistory();

  useEffect(() => {
    setValue(instrument.keyterms);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value.split(','));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImage.fileName !== '') {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const img = new FormData();
      img.append('image', uploadedImage);
      let res = await axios.post(`api/uploads`, img, config);

      const { imageUrl } = res.data;

      let newInstrument = {
        keyterms: value,
        instrumentImage: imageUrl,
        createdAt: new Date().toLocaleString(),
      };
      updateInstrument(instrument._id, newInstrument);
      getInstruments();
      history.push('/home');
    } else if (uploadedImage.fileName == '') {
      let newInstrument = {
        keyterms: value,
        instrumentImage: instrument.instrumentImage,
        createdAt: new Date().toLocaleString(),
      };
      updateInstrument(instrument._id, newInstrument);
      getInstruments();
      history.push('/home');
    }
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Update Instrument</h1>
          <Dropzone />
          <Form onChange={handleChange} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Edit keyterms</Form.Label>
              <Form.Control onChange={(e) => handleChange(e)} type="text" value={value} />
            </Form.Group>
            <Form.Group>
              <Button variant="success" type="submit" onClick={handleSubmit}>
                Confirm
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UpdateInstrument;
