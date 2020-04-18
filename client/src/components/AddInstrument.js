import React, { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { FileDrop } from 'react-file-drop';

const AddInstrument = () => {
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
  const [keyterms, setKeyterms] = useState([]);
  const [image, setImage] = useState('');

  const { addInstrument, uploadedImage, setUploadedImage } = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    return () => {};
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    setKeyterms(e.target.value.split(','));
    console.log(uploadedImage);
  };

  const onDropHandler = (files, event) => {
    console.log(files[0]);
    setImage(files[0]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let newInstrument;
    newInstrument = {
      keyterms: keyterms,
      instrumentImage: image,
    };
    const data = new FormData();
    data.append('instrumentImage', image);
    data.append('keyterms', keyterms);
    addInstrument(data);
    history.push('/');
  };

  return (
    <Fragment>
      <Row className="justify-content-center">
        <Col className="col-5">
          <h1>Add New Instrument</h1>
          <Form onSubmit={onSubmit} onChange={onChange}>
            <Form.Group>
              <div>
                <div style={styles}>
                <FileDrop
                  /* onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
                  onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
                  onFrameDrop={(event) => console.log('onFrameDrop', event)}
                  onDragOver={(event) => console.log('onDragOver', event)}
                  onDragLeave={(event) => console.log('onDragLeave', event)} */
                  onDrop={(files, event) => onDropHandler(files, event)}
                >
                Drop some files here!
                </FileDrop>
                </div>
              </div>
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
      {/* <Row>
        <FileDrop onDrop={(files, event) => onDropHandler(files, event)}>
          Drop some files here!
        </FileDrop>
      </Row> */}
    </Fragment>
  );
};
export default AddInstrument;
