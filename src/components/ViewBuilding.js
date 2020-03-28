import React from 'react';

const ViewBuilding = ({building,selectedBuildingId}) => {
    if(selectedBuildingId === 0)
    {
        return (
        <div>
            <vmore>
                {' '}
                <i>Click on a tool to view more information</i>
            </vmore>
        </div>
    )} else {
        return (
            <div>
                <more>
                    {' '}
                    {
                        !building.keyterms || <i> keyterms: {building.keyterms.toString()}</i>
                    }
                </more>
            </div>
        )
    }

};
export default ViewBuilding;
