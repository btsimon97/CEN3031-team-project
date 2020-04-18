import React, { Fragment, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './ViewInstrument.css';

import { GlobalContext } from '../context/GlobalState';

const ViewInstrument = () => {
  const { instrument, uploadedImage } = useContext(GlobalContext);
  console.log(instrument, uploadedImage);
  if (instrument) {
    if (!instrument.keyterms) {
      return (
        <Fragment>
          <Card className="sticky-top sticky-top-pad">
            <Card.Header>Device Details</Card.Header>
            <Card.Img
              variant="top"
              src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_171327149d1%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_171327149d1%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22108.51666641235352%22%20y%3D%2297.5%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            />
            <Card.Body>
              <Card.Text>
                There are no terms matching the selected device or the selected device does not
                exist in the system.
              </Card.Text>
            </Card.Body>
          </Card>
        </Fragment>
      );
    } else {
      const instrumentTerms = instrument.keyterms.map((term) => (
        <ListGroup.Item key={term.id}>{term}</ListGroup.Item>
      ));
      return (
        <Fragment>
          <Card className="sticky-top sticky-top-pad">
            <Card.Header>Device Details</Card.Header>
            <Card.Img variant="top" src={instrument.instrumentImage} />
            <Card.Body>
              <Card.Text>This device has the following keywords associated with it:</Card.Text>
              <ListGroup className="list-group-flush">{instrumentTerms}</ListGroup>
            </Card.Body>
          </Card>
        </Fragment>
      );
    }
  } else {
    return (
      <Fragment>
        <Card className="sticky-top sticky-top-pad">
          <Card.Header>Device Details</Card.Header>
          <Card.Body>
            <Card.Text>
              Select a device from the device list on the left to see more information. If needed,
              use the search box above to filter the results based on your search terms. If you need
              to search using multiple terms, separate your terms with a comma.
            </Card.Text>
          </Card.Body>
        </Card>
      </Fragment>
    );
  }
};
export default ViewInstrument;
