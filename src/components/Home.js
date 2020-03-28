import React, {useState, useEffect} from 'react';
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

const Home = () => {
    const [filterText, setFilterText] = useState('');
    const [selectedBuildingId, setBuildingSelectedId] = useState(0);
    const [currentAppData, setCurrentAppData] = useState([]);
    const [objectId, setObjectId] = useState("");
    const [building, setBuilding] = useState();
    

    
    useEffect(() => {
        axios.get('http://localhost:5000/api/listings/')
            .then(response => {
                setCurrentAppData(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    return (
        <Container>

            <Search setFilterText={setFilterText}/>
            <main>
                <Row>
                    <Col>
                        <h2>Medical Device List</h2>
                        <h3>Search Results</h3>
                        <Table bordered hover striped responsive>
                            <tbody>
                                <BuildingList filterText={filterText}
                                                setBuildingSelectedId={setBuildingSelectedId}
                                                selectedBuildingId={selectedBuildingId}
                                                setCurrentAppData = {setCurrentAppData}
                                                currentAppData = {currentAppData}
                                                setObjectId = {setObjectId}
                                                objectId = {objectId}
                                                setBuilding = {setBuilding}/>
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        {!selectedBuildingId ? (<ViewBuilding selectedBuildingId={0} />)
                            : (<ViewBuilding building={building} />)
                        }
                    </Col>
                </Row>
                <Credit/>
            </main>
        </Container>
    );
};

export default Home;
