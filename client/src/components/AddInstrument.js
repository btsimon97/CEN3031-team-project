import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { FileDrop } from 'react-file-drop';
import Dropzone from './Dropzone.js';

const AddInstrument = () => {
  const [keyterms, setKeyterms] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const { addInstrument, uploadedImage, setUploadedImage } = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    return () => {};
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    if (e.target.placeholder == 'scalpel') {
      setName(e.target.value);
    } else if (e.target.placeholder === 'scalpel,single-use') {
      setKeyterms(e.target.value.split(','));
    } else if (e.target.placeholder == 'description') {
      setDesc(e.target.value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

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
      name: name,
      keyterms: keyterms,
      description: desc,
      instrumentImage: imageUrl,
    };

    addInstrument(newInstrument);
    history.push('/');
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Add New Instrument</h1>
          <Dropzone />
          <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
              <Form.Label>Instrument Name</Form.Label>
              <Form.Control type="text" placeholder="scalpel"></Form.Control>

              <Form.Label>Instrument Description (Optional)</Form.Label>
              <Form.Control type="text" placeholder="description"></Form.Control>

              <Form.Label>Instrument Keywords</Form.Label>
              <Form.Control type="text" placeholder="scalpel,single-use"></Form.Control>

              <Form.Text className="text">
                Enter the keywords or phrases you want to use to find this instrument. Separate your
                keywords with a comma if using multiple keywords.
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
