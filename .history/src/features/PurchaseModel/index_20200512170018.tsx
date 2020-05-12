import React from 'react'

type Props = {};

const PurchaseModel = (props: Props): JSX.Element => {
    return(
        <div>
            <h1>Purchase Methods</h1>
            <div style={{display: 'flex', flexFlow: 'column '}}>
                <div>
                    <label>Contents in this div</label>
                </div>
            </div>
        </div>
    );
}

export default PurchaseModel;