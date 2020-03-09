import React from 'react';

const ViewBuilding = (props) => {
    if(props.selectedBuildingId === 0)
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
                    <i> Name: {props.building.name}</i>
                    <br/>
                    <i> Code: {props.building.code}</i>
                    <br/>
                    {
                        !props.building.address || <i> Address: {props.building.address}</i>
                    }
                    <br/>
                    {
                        !props.building.coordinates || <i> longitude: {props.building.coordinates.longitude}</i>
                    }
                    <br/>
                    {
                        !props.building.coordinates || <i> latitude: {props.building.coordinates.latitude}</i>
                    }
                    <br/>
                    {
                        !props.building.keyterms || <i> keyterms: {props.building.keyterms.toString()}</i>
                    }
                </p>
            </div>
        )
    }

};
export default ViewBuilding;
