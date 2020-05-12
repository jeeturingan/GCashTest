import React, { useEffect } from 'react';
import './Payment.css';
import {
  getAdyenConfig,
  getPaymentMethods,
  initiatePayment,
  submitAdditionalDetails,
} from '../../api/checkout';
import { Button } from 'modus-ui';

export type purchaseDataModel = {
  amount: {
    currency: string;
    value: number;
  };
  paymentMethod: {
    type: string;
  };
  reference: string;
  merchantAccount: string;
  returnUrl: string;
  redirectUrl?: any;
};

export type paymentDataModel = {
  paymentData: string;
  details: {
    payload: string;
    type?: string;
    key?: string;
  };
};

//DUMMY DATA
const purchaseData: purchaseDataModel = {
  amount: { currency: 'PHP', value: 1000 },
  paymentMethod: {
    type: 'gcash',
  },
  reference: 'YOUR_ORDER_NUMBER',
  merchantAccount: 'BizboxECOM',
  returnUrl: 'https://your-company.com/checkout?shopperOrder=12xy..',
};

const paymentData: paymentDataModel = {
  paymentData: 'Ab02b4c0!BQABAgCJN1wRZuGJmq8dMncmypvknj9s7l5Tj...',
  details: {
    payload: 'Ab02b4c0!BQABAgCW5sxB4e/==',
  },
};

const App = () => {
  useEffect(() => {
    getAdyenConfig();
    getPaymentMethods()
      .then((Response) => console.log(Response))
      .catch((Error) => console.log(Error));
  }, []);

  const gcashRedirect = (redirectUrl: string) => {
    window.location.replace(redirectUrl);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <Button
            text="Get Payment Methods"
            onClick={() => {
              getAdyenConfig();
              getPaymentMethods().then((Response) => {
                console.log(Response);
              });
            }}
          />
        </div>
        <div>
          <Button
            text="Initiate Payment"
            onClick={() => {
              initiatePayment(purchaseData)
                .then((Response) => {
                  gcashRedirect(Response.data.redirectUrl);
                })
                .catch((Error) => console.log(Error));
            }}
          />
        </div>
        <div>
          <Button
            text="Additional Payment"
            onClick={() => {
              submitAdditionalDetails(paymentData)
                .then((Response) => console.log(Response))
                .catch((Error) => console.log(Error));
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default App;
