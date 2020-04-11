import React, {useState, useEffect, Component, Fragment} from 'react'
import UserList from './UserList';
import Search from './Search';
import ViewUser from './ViewUser';

import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'

const Dashboard = ({setFetch, fetch, filterText, setFilterText, users, setUsers}) => {
    const [user, setUser] = useState();
    return (
        <Fragment>
            <Row className="justify-content-center">
                <Col className="col-8">
                    <Search setFilterText={setFilterText} filterText = {filterText}/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="col-md-auto">
                    <h2>User List</h2>
                    <UserList filterText={filterText} setUser={setUser} users = {users}setFetch = {setFetch} />
                </Col>
                <Col className="col-md-3 offset-md-1">
                    <h2>&nbsp;</h2>
                    <ViewUser user={user}/>
                </Col>
            </Row>
        </Fragment>
    )
};

export default Dashboard;