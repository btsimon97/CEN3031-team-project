import React from 'react';

const DeleteItem = (currentAppData, setCurrentAppData, selectedBuildingId) => {
    let newList = currentAppData.filter(element => element.id !== selectedBuildingId)
    setCurrentAppData(newList)
};

export default DeleteItem;