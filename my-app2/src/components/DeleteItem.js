import axios from 'axios';

import React, {
    useState,
    useEffect
} from 'react';

const DeleteItem = (currentAppData, setCurrentAppData, selectedBuildingId, objectId) => {
    

    console.log(objectId)
    // let newList = currentAppData.filter(element => element.id !== selectedBuildingId)
    // setCurrentAppData(newList)
    axios.delete(`http://localhost:5000/api/listings/${objectId}`)
    .then(res => console.log(res.data))
    .then(console.log("success!"));
    
    //Fix me
 
};

export default DeleteItem;