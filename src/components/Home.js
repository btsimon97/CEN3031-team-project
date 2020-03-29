import React, {useState, useEffect, Component, Fragment} from 'react';
import Search from './Search';
import ViewBuilding from './ViewBuilding';
import BuildingList from './BuildingList';
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

const Home = () => {
    const [filterText, setFilterText] = useState('');
    const [selectedBuildingId, setBuildingSelectedId] = useState(0);
    const [currentAppData, setCurrentAppData] = useState([]);
    const [objectId, setObjectId] = useState("");
    const [building, setBuilding] = useState();
    
    useEffect(() => {
        console.log()
        axios.get('http://localhost:5000/api/listings/')
            .then(response => {
                setCurrentAppData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


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
                            <BuildingList filterText={filterText}
                                            setBuildingSelectedId={setBuildingSelectedId}
                                            selectedBuildingId={selectedBuildingId}
                                            setCurrentAppData = {setCurrentAppData}
                                            currentAppData = {currentAppData}
                                            setObjectId = {setObjectId}
                                            objectId = {objectId}
                                            setBuilding = {setBuilding}
                                            building = {building}
                                            selectedBuildingId = {selectedBuildingId}/>
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    {!selectedBuildingId ? (<ViewBuilding selectedBuildingId={0} />)
                        : (<ViewBuilding building={building} />)
                    }
                </Col>
            </Row>
        </Fragment>
    );
};

export default Home;
