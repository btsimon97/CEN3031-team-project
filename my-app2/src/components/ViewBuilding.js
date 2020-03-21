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
                    {
                        !building.keyterms || <i> keyterms: {building.keyterms.toString()}</i>
                    }
                </p>
            </div>
        )
    }

};
export default ViewBuilding;
