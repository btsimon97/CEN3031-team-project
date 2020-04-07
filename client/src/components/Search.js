import React, { useState, useEffect, Fragment } from "react";
// import Row from 'react-bootstrap/Row'
import Form from "react-bootstrap/Form";
import InstrumentList from "./InstrumentList";
import axios from "axios";

import Button from "react-bootstrap/Button";
import { readFileSync } from "fs";

const Search = ({filterText,setFilterText,edit,instrument,setFetch,setEdit,}) => {
     const [value, setValue] = useState("");
     //Notes:
     // Figure out why its not getting the endpoint

     useEffect(() => {
          console.log("Search mounted or updated");
          if (edit) setValue(instrument.keyterms);
          return () => {
               setValue("");
          };
     }, [edit]);

     const handleChange = (e) => {
          e.preventDefault();
          console.log(e.target.value);
          if (edit) {
               setValue(e.target.value);
          } else {
               //Search mode
               setValue(e.target.value);
          }
     };

     const handleCancel = (e) => {
          e.preventDefault();
          setValue("");
          setEdit(false);
     }
     const handleSubmit = async (e) => {
          e.preventDefault();
          setValue(e.target.value);

          console.log("Handling submit ");

          if (edit) {
               if (value && value !== "") {
                    console.log(value);
                    let update = value.split(",");
                    update.forEach((element, index) => {
                         update[index] = element.trim().toLowerCase();
                    });
                    console.log(update);
                    //2. make axios call
                    let newInstrument = {
                         keyterms: update,
                    };
                    console.log(instrument._id);
                    axios.put(`/api/listings/${instrument._id}`,
                         newInstrument
                    ).catch((err) => {
                        console.log(err);
                    })

                    setFetch(true);
                    setFilterText("");
               }
               setValue("");
               setEdit(false);
          }
     };

     return (
          <Fragment>
               <Form onChange={e => handleChange(e)}
                              onSubmit={e => handleSubmit(e)}>
                    <Form.Group>
                         {edit && <Form.Label>Edit keyterm(s)</Form.Label>}
                         {!edit && <Form.Label>Search Term(s)</Form.Label>}
                         <Form.Control
                              type="text"
                              placeholder={"Enter search terms"}
                              value={value}
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
