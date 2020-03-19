import React, {useState, useEffect} from 'react';
import DeleteItem from "./DeleteItem";
import axios from 'axios';

const BuildingList = ({filterText, setBuildingSelectedId, selectedBuildingId, currentAppData, setCurrentAppData, setObjectId, building, setBuilding, objectId}) => {
    console.log(currentAppData)

    currentAppData = currentAppData.sort((left, right) => {
        return left.code.localeCompare(right.code)
    })
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
            <tr style={{fontSize: "24px", fontFamily:"New Times Roman", textAlign:"center"}} key={directory._id} onClick={() => {
                setBuildingSelectedId(directory.id)
                setBuilding(currentAppData[directory.id-1])
                setObjectId(currentAppData[directory.id-1]._id)
            }}>
                <td>{directory.code} </td>
                <td> {directory.name} </td>
                <button style = {{backgroundColor: 'red', color:"white",borderRadius: "25px"}}
                        onClick={ () =>  DeleteItem(currentAppData, setCurrentAppData,selectedBuildingId, objectId)}>
                DELETE
                </button>
            </tr>
        );
    });
    return (
        <div>{buildingList}</div>
    )
};
export default BuildingList;
