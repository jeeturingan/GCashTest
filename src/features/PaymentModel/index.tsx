import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { initiatePayment } from '../../api/checkout';
import { InputField, Button, SelectField, ButtonKind } from 'modus-ui';
import {purchaseDataModel} from '../Payment/Payment';

export type purchaseDetailModel1 = {
  currency?: string;
  value?: number;
  type?: string;
  merchantAccount?: string;
  returnUrl?: string;
  redirectUrl?: string;
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

const purchaseDetailInitial: purchaseDetailModel1 = {};

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
    currency: optionsCurrencyType[0],
    type: optionsPaymentType[0],
    value: x.value,
    returnUrl: x.returnUrl,
    redirectUrl: x.redirectUrl,
  };

  return (
    <div>
      <h1>Payment Model</h1>
      <div>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
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
                    name="value"
                    placeholder="Please enter the value.."
                    onChange={handleChange}
                    value={values.value}
                  />
                </div>
                <div>
                  <Button
                    kind={ButtonKind.Default}
                    text="Purchase"
                    onClick={() => {
                      initiatePayment(purchaseData)
                        .then((Response) =>
                          gcashRedirect(Response.data.redirectUrl)
                        )
                        .catch((Error) => console.log(Error));
                    }}
                  />
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PaymentModel;
