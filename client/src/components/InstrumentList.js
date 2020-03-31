import React, { useState, useEffect, Component, Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const InstrumentList = ({filterText, currentAppData, setCurrentAppData, setInstrument}) => {
    const [objectId, setObjectId] = useState(0);

    useEffect(() => {
      console.log("App mounted");
      async function fetchData() {
        const result = await axios.get("api/listings/");
        setCurrentAppData(result.data);
        let i = 0;
        for (i; i < currentAppData.length; i++) {
          currentAppData[i].id = currentAppData[i]._id;
        }
      }
      fetchData();
    }, []);

  const handleDelete = async (id) => {
    setObjectId(0);
    let res = await axios.delete(`api/listings/${id}`)
    const result = await axios.get('api/listings/')
    setCurrentAppData(result.data)
  };

  const instrumentList = currentAppData.filter(building => {
      if (filterText.trim() !== "") {
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
        console.log(building.keyterms.toString().replace(/,/g, " "));
        if (building) {
          if (
            regExp.test(
              building.keyterms
                .toString()
                .replace(/,/g, " ")
                .toLowerCase()
                .trim()
            )
          ) {
            return true;
          }
        }
        return false;
      }
      return true;
    })
    .map(item => {
      return (
        <Fragment>
          <tr
            key={item._id}
            onClick={() => {
                setInstrument(currentAppData.find(x => x._id === item._id))
                setObjectId(item._id)
            }}
          >
            <td>{item.keyterms.toString()}</td>
            <td key={item._id}>
              <Button
                variant="danger"
                onClick={() => handleDelete(item._id)}
              >
                Delete!
              </Button>
            </td>
          </tr>
        </Fragment>
      );
    });
  return <div>{instrumentList}</div>;
};
export default InstrumentList;
