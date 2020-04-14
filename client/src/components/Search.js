import React, { useState, useContext, useEffect, Fragment } from "react";
// import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import InstrumentList from "./InstrumentList";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { readFileSync } from "fs";
import { GlobalContext } from "../context/GlobalState";

const Search = () => {
     const {setFilterText,filterText} = useContext(GlobalContext);

     useEffect(() => {
          return () => {
               setFilterText("");
          };
     }, []);   
     
     static var timeDiff = 0;

     const handleChange = (e) => {
          e.preventDefault();
          setFilterText(e.target.value);
          console.log(e.target.value)
     };

     

     return (
          <Fragment>
               <Form>
                    <Form.Group>
                         {<Form.Label>Search Term(s)</Form.Label>}
                         <Form.Control
                              type="text"
                              placeholder={"Enter search terms"}
                              onChange={(e) => handleChange(e)}
                              value={filterText}
                         />
                         {<Form.Label>Search took ${timeDiff} milliseconds</Form.Label>}
                    </Form.Group>
               </Form>
          </Fragment>
     );
};

export default Search;
