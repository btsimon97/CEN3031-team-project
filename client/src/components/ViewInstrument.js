import React, {Component, Fragment} from 'react';
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const ViewInstrument = ({instrument}) => {
    console.log(instrument)
    if(instrument)
    {
        if(!instrument.keyterms)
        {
            return(
            <Fragment>
                <Card>
                    <Card.Header>Device Details</Card.Header>
                    { /* <Card.Img variant="top" src="TBD" /> */ }
                    <Card.Body>
                        <Card.Text>
                           There are no terms matching the selected device 
                          or the selected device does not exist in the system.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
            )
        }
        else
        {
            let instrumentTerms = instrument.keyterms.map((term) => <ListGroup.Item>{term}</ListGroup.Item>);
            return (
                <Fragment>
                    <Card>
                    <Card.Header>Device Details</Card.Header>
                        { /* <Card.Img variant="top" src="TBD" /> */ }
                        <Card.Body>
                            <Card.Text>This device has the following keywords associated with it:</Card.Text>
                            <ListGroup className="list-group-flush">
                                {instrumentTerms}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Fragment>
            )
        }
    }
    else 
    {
        return (
            <Fragment>
                <Card>
                    <Card.Header>Device Details</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Select a device from the device list on the left to see more information.
                            If needed, use the search box above to filter the results based on your search terms.
                            If you need to search using multiple terms, separate your terms with a comma.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Fragment>
        )
    }

};
export default ViewInstrument;
