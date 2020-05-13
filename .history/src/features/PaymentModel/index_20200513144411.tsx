import React, { useState, useEffect } from 'react';
import {Formik} from 'formik';
import {initiatePayment} from '../../api/checkout';
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
    redirectUrl: string
}

const purchaseDetailInitial: purchaseDetailModel = {};

const PaymentModel = (): JSX.Element => {

    const [purchaseDetail, setPurchaseDetail] = useState(purchaseDetailInitial);

    const optionsPaymentType = [
        {value: '0', label: 'Gcash'},
        {value: '1', label: 'Paymaya'}
    ];

    const x = purchaseDetail;
    const [inputPaymentType, setInputPaymentType] = useState(optionsPaymentType[0]);

    const initialValues = {
        currency: x.currency,
        value: x.value,
        type: optionsPaymentType[0],
        merchantAccount: x.merchantAccount,
        returnUrl: x.returnUrl,
        redirectUrl: x.redirectUrl
    }

    return (
        <div>
            <h1>Payment Model</h1>
            <div>
                <Formik initialValues={initialValues} onSubmit={()=>{}}>
                    {props => {
                        const { values, handleChange, handleSubmit } = props;
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default PaymentModel;