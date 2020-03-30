import React, {Component, Fragment} from 'react';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
const Search = ({setFilterText}) => {

    return (
        <Fragment>
            <Form>
                <Form.Group>
                    <Form.Label>Search Term(s)</Form.Label>
                    <Form.Control type="text" placeholder="Enter search terms" onChange={(event) => {
                       setFilterText(event.target.value)
                   }}/>
                </Form.Group>
            </Form>
        </Fragment>
    );

};

export default Search;
