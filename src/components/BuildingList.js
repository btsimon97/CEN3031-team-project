import React, {useState, useEffect, Component, Fragment} from 'react';
import DeleteItem from "./DeleteItem";
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'


const BuildingList = ({filterText, setBuildingSelectedId, selectedBuildingId, currentAppData, setCurrentAppData, setObjectId, building, setBuilding, objectId}) => {
    let i = 0
    for (i; i < currentAppData.length; i++) {
        currentAppData[i].id = i + 1
    }
    const buildingList = currentAppData.filter(building => {
        if (filterText.trim() !== '')
        {
            let regExp = new RegExp(escape(filterText.trim().toLowerCase()));
            let searchText = filterText.split(",");
            if(searchText.length>1){
                let multipleSearch = "";
                let j = 0;
                for (; j < searchText.length; j++) {
                    let word = "(?=.*" + searchText[j] + ")"
                    multipleSearch += word.trim().toLowerCase().replace(/ /g, "");
                }
                regExp = new RegExp(multipleSearch + ".+", "gi");
            }
            console.log(building.keyterms.toString().replace(/,/g, " "))
            if (building) {
                if(regExp.test(building.keyterms.toString().replace(/,/g, " ").toLowerCase().trim())){
                    return true
                }
            }
            return false
        }
        return true
    }).map(directory => {
        return (
            <Fragment>
            <tr key={directory._id} onClick={() => {
                setBuildingSelectedId(directory.id)
                setBuilding(currentAppData[directory.id-1])
                setObjectId(currentAppData[directory.id-1]._id)
            }}>
                <td>{directory.keyterms.toString()} </td>
                <td><Button variant="danger" onClick={ () =>  DeleteItem(currentAppData, setCurrentAppData, selectedBuildingId, objectId)}>Delete!</Button></td>
            </tr>
            </Fragment>
        );
    });
    return (
        <div>{buildingList}</div>
    )
};
export default BuildingList;
