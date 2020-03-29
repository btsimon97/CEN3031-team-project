import React, { useState, useEffect, Component, Fragment } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const BuildingList = ({filterText,currentAppData,setCurrentAppData,setObjectId,setBuilding,objectId}) => {

  const handleDelete = async id => {
    setObjectId(id);
    console.log(id);
    let res = await axios
      .delete(`http://localhost:5000/api/listings/${id}`)
      .then(res => console.log(res.data))
      .then(console.log("Delete successful!"));
  };

  let i = 0;
  for (i; i < currentAppData.length; i++) {
    currentAppData[i].id = i + 1;
  }
  const buildingList = currentAppData
    .filter(building => {
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
    .map(instrument => {
      return (
        <Fragment>
          <tr
            key={instrument._id}
            onClick={() => {
              setObjectId(instrument._id);
            }}
          >
            <td>{instrument.keyterms.toString()}</td>
            <td key={instrument._id}>
              <Button
                variant="danger"
                onClick={() => handleDelete(instrument._id)}
              >
                Delete!
              </Button>
            </td>
          </tr>
        </Fragment>
      );
    });
  return <div>{buildingList}</div>;
};
export default BuildingList;
