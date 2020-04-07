import React, {useState, useEffect, Component, Fragment} from 'react';
import Search from './Search';
import ViewInstrument from './ViewInstrument';
import InstrumentList from './InstrumentList';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import axios from "axios"

const Home = ({currentAppData,setCurrentAppData, filterText, setFilterText, instrument, setInstrument}) => {
  const [edit, setEdit]  = useState(false);
  const [fetch, setFetch] = useState(false);
    
  const fetchData = async () => {
    const result = await axios.get("api/listings/");
    setCurrentAppData(result.data.data);
    setFetch(false);
  };

  useEffect(() => {
    console.log("List mounted or updated");
    fetchData();
  }, [setFetch, fetch]);


    return (
        <Fragment>
            <Row className="justify-content-center">
                <Col className="col-8">
                    <Search setFilterText={setFilterText} setEdit = {setEdit} edit = {edit} instrument = {instrument} setFetch = {setFetch}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-md-auto">
                    <h2>Medical Device List</h2>
                    {/*<Table bordered hover striped responsive>*/}
                        {/*<tbody>*/}
                            <InstrumentList filterText={filterText}
                                            setCurrentAppData = {setCurrentAppData}
                                            currentAppData = {currentAppData}
                                            setInstrument = {setInstrument}
                                            instrument = {instrument}
                                            setFilterText = {setFilterText}
                                            setEdit = {setEdit}
                                            edit = {edit}
                                            fectch={fetch}
                                            setFetch = {setFetch}/>
                        {/*</tbody>*/}
                    {/*</Table>*/}
                </Col>
                <Col className="col-md-3 offset-md-1">
                    <h2>&nbsp;</h2> {/* Empty Header to line up card w/ inventory table */}
                    {
                        <ViewInstrument instrument={instrument} />
                    }
                </Col>
            </Row>
        </Fragment>
    );
};

export default Home;
