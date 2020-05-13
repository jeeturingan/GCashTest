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
        {value: 'gcash', label: 'Gcash'},
        {value: 'paymaya', label: 'Paymaya'}
    ];

    const optionsCurrencyType = [
        {value: 'PHP', label: 'PHP'},
        {value: 'Paymaya', label: 'Paymaya'}
    ]

    const x = purchaseDetail;
    const [inputPaymentType, setInputPaymentType] = useState(optionsPaymentType[0]);
    const [inputCurrencyType, setInputCurrencyType] = useState(optionsCurrencyType[0]);

    const initialValues = {
        currency: optionsCurrencyType[0],
        type: optionsPaymentType[0],
        value: x.value,
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
                        return(
                            <form onSubmit={handleSubmit}>
                                <h3>Purchase Detail</h3>
                                <div>
                                    <SelectField 
                                        name="type"
                                        label="Type"
                                        placeholder="GCash, Paymaya..."
                                        currentValue={inputPaymentType}
                                        options={optionsPaymentType}
                                        onChange={(value: any) => setInputPaymentType(value)}
                                    />
                                </div>
                                <div>
                                    <SelectField 
                                        name="currency"
                                        label="Currency"
                                        placeholder="PHP, EUR, USD..."
                                        currentValue={inputCurrencyType}
                                        options={optionsCurrencyType}
                                        onChange={(value: any) => setInputCurrencyType(value)}
                                    />
                                </div>
                                <div>
                                    <InputField 
                                        type="text"
                                        label="Merchant Account"
                                        name="merchantAccount"
                                        placeholder="Please enter Merchant Account"
                                        onChange={handleChange}
                                        value={values.merchantAccount}
                                    />
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default PaymentModel;