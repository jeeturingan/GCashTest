import React, { useState, useEffect } from 'react';
import {Formik} from 'formik';
import {initiatePayment} from '../../api/checkout';
import {
    InputField,
    Button,
    SelectField,
    ButtonKind,
} from 'modus-ui';

export type purchaseDetailModel = {
    currency?: string,
    value?: number,
    type?: string,
    merchantAccount?: string
    returnUrl?: string,
    redirectUrl?: string
};

const purchaseDetailInitial: purchaseDetailModel = {};

const PaymentModel = () => {

    const [purchaseDetail, setPurchaseDetail] = useState(purchaseDetailInitial);

    const optionsPaymentType = [
        {value: 'gcash', label: 'Gcash'},
        {value: 'paymaya', label: 'Paymaya'}
    ];

    const optionsCurrencyType = [
        {value: 'PHP', label: 'PHP'},
        {value: 'EUR', label: 'EUR'},
        {value: 'USD', label: 'USD'}
    ];

    const optionsMerchantAccount = [
        {value: 'BizboxECOM', label: 'BizboxECOM'},
        {value: 'BizboxPOS', label: 'BizboxPOS'}
    ];

    const x = purchaseDetail;
    const [inputPaymentType, setInputPaymentType] = useState(optionsPaymentType[0]);
    const [inputCurrencyType, setInputCurrencyType] = useState(optionsCurrencyType[0]);
    const [inputMerchantAccount, setInputMerchantAccount] = useState(optionsMerchantAccount[0]);

    const initialValues = {
        currency: optionsCurrencyType[0],
        type: optionsPaymentType[0],
        value: x.value,
        merchantAccount: optionsMerchantAccount[0],
        returnUrl: x.returnUrl,
        redirectUrl: x.redirectUrl
    }

    return (
        <div>
            <h1>Payment Model</h1>
            <div>
                <Formik initialValues={{initialValues}} 
                    onSubmit={(data)=>{console.log("Submit:", data)}}>
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
                                    <SelectField 
                                        name="merchantAccount"
                                        label="Merchant Account"
                                        placeholder="BizboxECOM"
                                        currentValue={inputMerchantAccount}
                                        options={optionsMerchantAccount}
                                        onChange={(value: any) => setInputMerchantAccount(value)}
                                    />
                                </div>
                                <div>
                                    <InputField 
                                        type="number"
                                        label="Value"
                                        name="value"
                                        placeholder="Please enter the value.."
                                        onChange={handleChange}
                                        value={values.value}
                                    />
                                </div>
                                <div>
                                    <Button 
                                        kind={ButtonKind.Default}
                                        text="Checkout"
                                        onClick={()=>{
                                    
                                        }}
                                    />
                                </div>
                            <pre style={{textAlign:'left'}}>{JSON.stringify(values, null, 2)}</pre>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default PaymentModel;