import React, {
     useState,
     useEffect,
     useContext,
     Component,
     Fragment,
} from "react";
import Search from "./Search";
import ViewInstrument from "./ViewInstrument";
import InstrumentList from "./InstrumentList";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import axios from "axios";

import { GlobalContext } from "../context/GlobalState";

const Home = () => {
     const { getInstruments, currentAppData } = useContext(GlobalContext);

     // useEffect(()=>{
     //      console.log("App mounted! ");
     //      console.log(currentAppData)
     //      // getInstruments();
     // },[]) 

     const [fetch, setFetch] = useState(false);

     

     return (
          <Fragment>
               <Row className="justify-content-center">
                    <Col className="col-8">
                         <Search
                              setFetch={setFetch}
                         />
                    </Col>
               </Row>
               <Row className="justify-content-center">
                    <Col className="col-md-auto">
                         <h2>Medical Device List</h2>
                         {/*<Table bordered hover striped responsive>*/}
                         {/*<tbody>*/}
                         <InstrumentList
                         />
                         {/*</tbody>*/}
                         {/*</Table>*/}
                    </Col>
                    <Col className="col-md-3 offset-md-1">
                         <h2>&nbsp;</h2>{" "}
                         {/* Empty Header to line up card w/ inventory table */}
                         {<ViewInstrument />}
                    </Col>
               </Row>
          </Fragment>
     );
};

export default Home;
