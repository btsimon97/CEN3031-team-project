import React from 'react';

const ViewBuilding = ({building, objectId, selectedBuildingId}) => {
    if(selectedBuildingId === 0)
    {
        return (
        <div>
            <p>
                {' '}
                <i>Click on a name to view more information</i>
            </p>
        </div>
    )} else {
        return (
            <div>
                <p>
                    {' '}
                    <i> Name: {building.name}</i>
                    <br/>
                    <i> Code: {building.code}</i>
                    <br/>
                    {
                        !building.address || <i> Address: {building.address}</i>
                    }
                    <br/>
                    {
                        !building.coordinates || <i> longitude: {building.coordinates.longitude}</i>
                    }
                    <br/>
                    {
                        !building.coordinates || <i> latitude: {building.coordinates.latitude}</i>
                    }
                    <br/>
                    {
                        !building.keyterms || <i> keyterms: {building.keyterms.toString()}</i>
                    }
                </p>
            </div>
        )
    }

};
export default ViewBuilding;
