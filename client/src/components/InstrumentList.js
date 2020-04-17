import React, { useEffect, Fragment, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import httpUser from '../httpUser';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import './InstrumentList.css';

// import { Button } from '@material-ui/core';

const InstrumentList = () => {
  const { currentAppData, deleteInstrument, filterText, setInstrument } = useContext(GlobalContext);

  let history = useHistory();

  const handleDelete = async (id) => {
    deleteInstrument(id);
  };

  let searchResults = currentAppData.filter((item) => {
    if (filterText && filterText.trim() !== '') {
      var t0 = new Date().getMilliseconds();
      console.log(currentAppData);
      let regExp = new RegExp(escape(filterText.trim().toLowerCase()));
      let searchText = filterText.split(',');
      if (searchText.length > 1) {
        let multipleSearch = '';
        let j = 0;
        for (; j < searchText.length; j++) {
          let word = '(?=.*' + searchText[j] + ')';
          multipleSearch += word.trim().toLowerCase().replace(/ /g, '');
        }
        regExp = new RegExp(multipleSearch + '.+', 'gi');
      }
      if (item) {
        if (regExp.test(item.keyterms.toString().replace(/,/g, ' ').toLowerCase().trim())) {
          return true;
        }
      } else return false;
      var t1 = new Date().getMilliseconds();
      console.log(t1);
      console.log(t0);
    } else return true;
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
            <Fragment key={item._id}>
              <tr key={item._id}>
                <td className="align-middle" onClick={() => setInstrument(currentAppData.find((x) => x._id === item._id))}>{item.keyterms.toString()}</td>
                <td className="align-middle" onClick={() => setInstrument(currentAppData.find((x) => x._id === item._id))}>
                  <Moment format="HH:mm A YYYY/MM/DD">{item.createdAt}</Moment>
                </td>
                <td className="d-flex flex-wrap">
                  <Button
                    variant="primary"
                    onClick={() => setInstrument(currentAppData.find((x) => x._id === item._id))}
                  >
                    View Info
                  </Button>
                  {httpUser.getCurrentUser() && (
                    <Fragment>
                      <Button variant="danger" onClick={() => handleDelete(item._id)}>
                        Delete Item
                      </Button>
                      <Button
                        variant="info"
                        onClick={(e) => {
                          e.preventDefault();
                          setInstrument(currentAppData.find((x) => x._id === item._id));
                          history.push('/update');
                        }}
                      >
                        Edit Item
                      </Button>
                    </Fragment>
                  )}
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
