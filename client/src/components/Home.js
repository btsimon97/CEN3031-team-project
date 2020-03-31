import React, {useState, useEffect, Component, Fragment} from 'react';
import Search from './Search';
import ViewInstrument from './ViewInstrument';
import InstrumentList from './InstrumentList';
import axios from 'axios';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Home = ({currentAppData,setCurrentAppData}) => {
    const [filterText, setFilterText] = useState('');
    const [instrument, setInstrument] = useState();

    // useEffect(() => {
    //     console.log("Home mounted");
    //     async function fetchData() {
    //       const result = await axios.get("/api/listings");
    //       setCurrentAppData(result.data);
    //       console.log(currentAppData)
    //       let i = 0;
    //       for (i; i < currentAppData.length; i++) {
    //         currentAppData[i].id = currentAppData[i]._id;
    //       }
    //     }
    //     fetchData();
    //   }, []);
    
    return (
        <Fragment>
            <Row className="justify-content-center">
                <Col className="col-8">
                    <Search setFilterText={setFilterText}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-md-auto">
                    <h2>Medical Device List</h2>
                    <Table bordered hover striped responsive>
                        <tbody>
                            <InstrumentList filterText={filterText}
                                            setCurrentAppData = {setCurrentAppData}
                                            currentAppData = {currentAppData}
                                            setInstrument = {setInstrument}/>
                        </tbody>
                    </Table>
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
