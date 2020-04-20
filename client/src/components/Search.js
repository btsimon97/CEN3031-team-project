import React, { useState, useContext, useEffect, Fragment } from "react";
// import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import InstrumentList from "./InstrumentList";
import { timeSearch } from "./InstrumentList";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { readFileSync } from "fs";
import { GlobalContext } from "../context/GlobalState";
import { time } from "../context/GlobalState";



const Search = () => {

     const {setFilterText,filterText} = useContext(GlobalContext);

     // var timeD = 0;
     const [timeD, setTimeD] = useState(0);
     useEffect(() => {
          initTimeD();
          return () => {
               setFilterText("");
          };
     }, []);   

     const initTimeD = (timee) => {
          setTimeout(() => { setTimeD(time); }, 400);// may need to increase timeout based on amount of metadata
     }

     const handleChange = (e) => {
          e.preventDefault();
          setFilterText(e.target.value);
          setTimeout(() => { setTimeD(timeSearch) }, 5);  // may need to increase timeout based on amount of metadata
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
                         {<Form.Label>Search took {timeD} milliseconds</Form.Label>}
                    </Form.Group>
               </Form>
          </Fragment>
     );
};

export default Search;
