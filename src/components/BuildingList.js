import React, {useState, useEffect} from 'react';
// import DeleteItem from "./DeleteItem";

const BuildingList = ({data, filterText, setBuildingSelectedId, selectedBuildingId}) => {
    const [list, setList] = useState(data)

    const deleteItem = (id) => {
        let newlist = list.filter(element => element.id !== id)
        console.log(newlist)
        setList(newlist)
    }

    const buildingList = list.filter(building => {
        // Got from https://stackoverflow.com/questions/8808783/regex-javascript-match-multiple-search-terms-ignoring-their-order
        if (filterText.trim() !== '') {
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
            <tr key={directory.id} onClick={() => setBuildingSelectedId(directory.id)}>
                <td>{directory.code} </td>
                <td> {directory.name} </td>
                <button style = {{backgroundColor: 'red', color:"white",borderRadius: "25px"}} onClick={() => deleteItem(directory.id)}>
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
