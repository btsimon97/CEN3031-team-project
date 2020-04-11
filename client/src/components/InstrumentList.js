import React, { useState, useEffect, Fragment, useContext } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import httpUser from "../httpUser";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const InstrumentList = () => {
     const {
          currentAppData,
          deleteInstrument,
          getInstruments,
          filterText,
          editMode, 
          setInstrument,
          setEditMode
     } = useContext(GlobalContext);

     let history = useHistory();

     useEffect(()=> {
          getInstruments();
     }, [])

 

     const handleDelete = async (id) => {
          deleteInstrument(id);
     };

     const handleUpdate = async (id) => {
          if (editMode) {
               setEditMode(false);
          } else {
               setEditMode(true);
               let instrument = currentAppData.filter((x) => x._id === id)[0];
               setInstrument(instrument);
          }
     };

     const handleClick = (id) => {
          let instrument = currentAppData.filter((x) => x._id === id)[0];
          setInstrument(instrument);
     };

     let searchResults = currentAppData.filter((building) => {
          if (filterText && filterText.trim() !== "") {
               let regExp = new RegExp(escape(filterText.trim().toLowerCase()));
               let searchText = filterText.split(",");
               if (searchText.length > 1) {
                    let multipleSearch = "";
                    let j = 0;
                    for (; j < searchText.length; j++) {
                         let word = "(?=.*" + searchText[j] + ")";
                         multipleSearch += word
                              .trim()
                              .toLowerCase()
                              .replace(/ /g, "");
                    }
                    regExp = new RegExp(multipleSearch + ".+", "gi");
               }
               if (building) {
                    if (
                         regExp.test(
                              building.keyterms
                                   .toString()
                                   .replace(/,/g, " ")
                                   .toLowerCase()
                                   .trim()
                         )
                    )
                         return true;
               } else return false;
          }
          return true;
     });

     return (
          <Table hover striped responsive>
               <thead>
                    <tr>
                         <th>Device Keywords</th>
                         <th>Last Modification Date/Time</th>
                         <th>Device Info</th>
                         {httpUser.getCurrentUser() && (
                              <th>Device Management</th>
                         )}
                    </tr>
               </thead>
               <tbody>
                    {searchResults.map((item, index) => {
                         return (
                              <Fragment key={index}>
                                   <tr key={index}>
                                        <td>{item.keyterms.toString()}</td>
                                        <td>
                                             <Moment format="HH:mm A YYYY/MM/DD">
                                                  {item.createdAt}
                                             </Moment>
                                        </td>
                                        <td>
                                             <Button
                                                  variant="primary"
                                                  onClick={() =>
                                                       handleClick(item._id)
                                                  }
                                             >
                                                  View Info
                                             </Button>
                                        </td>
                                        {httpUser.getCurrentUser() && (
                                             <td>
                                                  <Button
                                                       variant="danger"
                                                       onClick={() =>
                                                            handleDelete(
                                                                 item._id
                                                            )
                                                       }
                                                  >
                                                       Delete Item
                                                  </Button>
                                                  &nbsp;
                                                  <Button
                                                       variant="info"
                                                       onClick={() =>
                                                            handleUpdate(
                                                                 item._id
                                                            )
                                                       }
                                                  >
                                                       Edit Item
                                                  </Button>
                                             </td>
                                        )}
                                   </tr>
                              </Fragment>
                         );
                    })}
               </tbody>
          </Table>
     );
};
export default InstrumentList;

