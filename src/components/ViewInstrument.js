import React from 'react';

const ViewInstrument = ({instrument}) => {
    console.log(instrument)
    if(!instrument)
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
                        !instrument.keyterms || <i> keyterms: {instrument.keyterms.toString()}</i>
                    }
                </more>
            </div>
        )
    }

};
export default ViewInstrument;
