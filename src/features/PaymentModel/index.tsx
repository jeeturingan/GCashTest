import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { initiatePayment } from '../../api/checkout';
import { InputField, Button, SelectField, ButtonKind } from 'modus-ui';



//Dummy Model(Correct Model Format)
export type purchaseDataModel = {
  amount?: {
    currency?: string;
    value?: number;
  };
  paymentMethod?: {
    type?: string;
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
  const [inputPaymentType, setInputPaymentType] = useState(optionsPaymentType[0]);
  const [inputCurrencyType, setInputCurrencyType] = useState(optionsCurrencyType[0]);

  const initialValues = {
    amount: {
      currency: inputCurrencyType,
      value: x.amount?.value
    },
    paymentMethod: {
      type: inputPaymentType
    },
    merchantAccount: "BizboxECOM",
    returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
  };

  const handleClick = (values: any) => {
    const purchaseDetailInput = {
      amount: {
        currency: values.amount.currency.value,
        value: values.value
      },
      paymentMethod: {
        type: values.paymentMethod.type.value
      },
      merchantAccount: "BizboxECOM",
      returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
    }

    initiatePayment(purchaseDetailInput)
      .then(res => {
        gcashRedirect(res.data.redirectUrl)
      })
      .catch(error => {
        console.log(error)
      });
  };

  return (
    <div>
      <h1>Payment Model</h1>
      <div>
        <Formik 
          enableReinitialize={true}
          validateOnBlur={false}
          isInitialValid={true}
          initialValues={initialValues} 
          onSubmit={values => {
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
                    name="currency"
                    label="Currency"
                    placeholder="Currency"
                    currentValue={inputCurrencyType}
                    options={optionsCurrencyType}
                    onChange={(value: any) => {
                      setInputCurrencyType(value);
                    }}
                  />
                </div>
                <div>
                  <SelectField
                    name="type"
                    label="Type"
                    placeholder="Payment Type"
                    currentValue={inputPaymentType}
                    options={optionsPaymentType}
                    onChange={(value: any) => {
                      setInputPaymentType(value)
                    }}
                  />
                </div>
                <div>
                  <InputField
                    type="number"
                    label="Value"
                    name="amount.value"
                    placeholder="Please enter the value.."
                    onChange={handleChange}
                    value={values.amount.value}
                  />
                </div>
                <div>
                  <Button
                    kind={ButtonKind.Default}
                    text="Checkout"
                    onClick={handleSubmit}
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
};

export default PaymentModel;
