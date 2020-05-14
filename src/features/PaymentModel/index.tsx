import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { initiatePayment } from '../../api/checkout';
import { InputField, Button, SelectField, ButtonKind } from 'modus-ui';



//Dummy Model(Correct Model Format)
export type purchaseDataModel = {
  amount?: {
    currency: string;
    value: number;
  };
  paymentMethod?: {
    type: string;
  };
  merchantAccount?: string;
  returnUrl?: string;
  redirectUrl?: any;
};

//DUMMY Data
const purchaseData: purchaseDataModel = {
  merchantAccount:"BizboxECOM",
  amount:{
    currency: 'PHP',
    value: 1000
  },
  paymentMethod:{
    type:"gcash"
  },
  returnUrl:"https://your-company.com/checkout?shopperOrder=12xy.."

};

const purchaseDetailInitial: purchaseDataModel = {};

const PaymentModel = () => {
  const [purchaseDetail, setPurchaseDetail] = useState(purchaseDetailInitial);

  const gcashRedirect = (redirectUrl: string) => {
    window.location.replace(redirectUrl);
  };

  const optionsPaymentType = [
    { value: 'gcash', label: 'Gcash' },
    { value: 'paymaya', label: 'Paymaya' },
  ];

  const optionsCurrencyType = [
    { value: 'PHP', label: 'PHP' },
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' },
  ];

  const x = purchaseDetail;
  const [inputPaymentType, setInputPaymentType] = useState(
    optionsPaymentType[0]
  );
  const [inputCurrencyType, setInputCurrencyType] = useState(
    optionsCurrencyType[0]
  );

  const initialValues = {
    amount: {
      currency: optionsCurrencyType[0],
      value: x.amount?.value
    },
    paymentMethod: {
      type: optionsPaymentType[0]
    },
    merchantAccount: "BizboxECOM",
    returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
  };

  const handleClick = (values: any) => {
    const purchaseDataInput = {
      amount: {
        currency: inputCurrencyType.value,
        value: values.value
      },
      paymentMethod: {
        type: inputPaymentType.value
      },
      merchantAccount: "BizboxECOM",
      returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
    }
    console.log("ConSOLE",purchaseDataInput);
  }

  return (
    <div>
      <h1>Payment Model</h1>
      <div>
        <Formik 
          initialValues={initialValues} 
            onSubmit={(values) => {
              handleClick(values);
            }}
        >
          {(props) => {
            const { values, handleChange, handleSubmit } = props;
            return (
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
                    type="number"
                    label="Value"
                    name="amount.value"
                    placeholder="Please enter the value.."
                    onChange={handleChange}
                    value={initialValues.amount.value}
                  />
                </div>
                <div>
                  <Button
                    kind={ButtonKind.Default}
                    text="Purchase"
                    onClick={() => {
                      console.log();
                    }}
                  />
                </div>
                  <pre style={{textAlign:"left"}}>{JSON.stringify(values, null, 2)}</pre>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentModel;
