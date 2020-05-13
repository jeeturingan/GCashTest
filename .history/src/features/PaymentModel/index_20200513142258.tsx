import React from 'react';
import {} from 'formik'
import {
    InputField,
    Button,
    ButtonKind,
    Spinner,
    SelectField,
    DateTimeField,
    DateTimeFieldOption
} from 'modus-ui';

export type purchaseDetailModel = {
    currency: string,
    value: number,
    type: string,
    merchantAccount: string
    returnUrl: string,
    redirectUrl?: any
}

const PaymentModel = (): JSX.Element => {

    return (
        <div>
            <h1>Payment Model</h1>
            <div style={{display: 'flex', flexFlow: 'column '}}>
                <div>
                
                </div>
            </div>
        </div>
    );
}

export default PaymentModel;