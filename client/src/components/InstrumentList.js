import React, { useEffect, Fragment, useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import httpUser from "../httpUser";
import Moment from "react-moment";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
import "./InstrumentList.css";

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
          <Table hover responsive="sm"> 
               <thead>
                    <tr>
                         <th>Device Keywords</th>
                         <th className="text-centered">Last Modification Date/Time</th>
                         <th className="text-centered">Device Options</th>
                    </tr>
               </thead>
               <tbody>
                    {searchResults.map((item, index) => {
                         return (
                              <Fragment>
                                   <tr  key={item._id}>
                                        <td>{item.keyterms.toString()}</td>
                                        <td>
                                             <Moment format="HH:mm A YYYY/MM/DD">
                                                  {item.createdAt}
                                             </Moment>
                                        </td>
                                        <td>
                                             <ul>
                                                  <li>
                                                       <Button   
                                                       variant="primary"
                                                            onClick={() => setInstrument(currentAppData.find(x => x._id === item._id))}>
                                                            View Info
                                                       </Button>
                                                  </li>
                                                  {httpUser.getCurrentUser() && (
                                                       <Fragment>
                                                            <li>
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
                                                            </li>
                                                            <li>
                                                                 <Button
                                                                      variant="info"
                                                                      onClick={(e) => 
                                                                           {
                                                                                e.preventDefault();
                                                                                setInstrument(currentAppData.find(x => x._id === item._id))
                                                                                history.push("/update")
                                                                           }}
                                                                 >
                                                                      Edit Item
                                                                 </Button>
                                                            </li>
                                                  </Fragment>
                                        )}
                                             </ul>
                                        </td>
                                   </tr>
                              </Fragment>
                         );
                    })}
               </tbody>
          </Table>
     );
};
export default InstrumentList;

