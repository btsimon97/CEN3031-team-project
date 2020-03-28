import React, {Component, Fragment} from 'react';
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
const Search = ({setFilterText}) => {
    // const filterUpdate = (event) => {
    //     //Here you will need to update the value of the filter with the value from the textbox
    //     props.callBack(event.target.value)
    // };
    //You will need to save the value from the textbox and update it as it changes
    //You will need the onChange value for the input tag to capture the textbox value

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
