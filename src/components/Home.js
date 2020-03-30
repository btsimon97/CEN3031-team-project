import React, {useState, useEffect, Component, Fragment} from 'react';
import Search from './Search';
import ViewInstrument from './ViewInstrument';
import InstrumentList from './InstrumentList';
import Credit from './Credit';
import axios from 'axios';
import httpUser from './../httpUser'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

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
    //     console.log("List componented updated or mounted");
    //     axios.get('http://localhost:5000/api/listings/').then((res) => setCurrentAppData(currentAppData))
    //     let i = 0;
    //     for (i; i < currentAppData.length; i++) {
    //     currentAppData[i].id = currentAppData[i]._id;
    //     }
    // },[])
    
    return (
        <Fragment>
            <Row className="justify-content-center">
                <Col className="col-8">
                    <Search setFilterText={setFilterText}/>
                </Col>
            </Row>
            <Row>
                <Col>
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
                <Col>
                    {
                        <ViewInstrument instrument={instrument} />
                    }
                </Col>
            </Row>
        </Fragment>
    );
};

export default Home;
