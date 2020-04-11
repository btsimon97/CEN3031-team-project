import React, { useState, useContext, useEffect, Fragment } from "react";
// import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import InstrumentList from "./InstrumentList";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { readFileSync } from "fs";
import { GlobalContext } from '../context/GlobalState'

const Search = () => {
     const { setFilterText, filterText, getInstruments, edit , setEditMode, instrument } = useContext(GlobalContext);
     const [keyterms, setKeyterms] = useState("");

     useEffect(() => {
          if (edit) setKeyterms(instrument.keyterms);

          return () => {
               setKeyterms("")
          };
     }, [edit]);

     const handleChange = (e) => {
          e.preventDefault();
          if (edit) {
               setKeyterms(e.target.value);
          } else {
               //Search mode
               setFilterText(e.target.value);
          }
     };

     const handleCancel = (e) => {
          e.preventDefault();
          setKeyterms("");
          setEditMode(false);
     }

     const handleSubmit = async (e) => {
          e.preventDefault();
          setKeyterms(e.target.value);
          if (edit) {
               if (filterText && filterText !== "") {
                    let update = filterText.split(",");
                    update.forEach((element, index) => {
                         update[index] = element.trim().toLowerCase();
                    });
                    //2. make axios call
                    let newInstrument = {
                         keyterms: update,
                    };
                    axios.put(`/api/listings/${instrument._id}`,
                         newInstrument
                    ).catch((err) => {
                        console.log(err);
                    })
                    getInstruments();
               }
               filterText("");
               setEditMode(false);
          }
     };

     return (
          <Fragment>
               <Form >
                    <Form.Group>
                         {edit && <Form.Label>Edit keyterm(s)</Form.Label>}
                         {!edit && <Form.Label>Search Term(s)</Form.Label>}
                         <Form.Control
                              type="text"
                              placeholder={"Enter search terms"}
                              onChange={e => handleChange(e)}
                              onSubmit={e => handleSubmit(e)}
                              value = {edit ? keyterms : filterText}
                         />
                    </Form.Group>
                    {edit && (
                         <Form.Group>
                              <Button variant="success" type="submit"name="confirm">
                                   Confirm
                              </Button>
                              <Button variant="danger" type="button" name="cancel" onClick = {handleCancel}>
                                   Cancel
                              </Button>
                         </Form.Group>
                    )}
                    
               </Form>
          </Fragment>
     );
};

export default Search;
