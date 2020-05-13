import React, { useEffect, useState } from 'react';
import './Payment.css';
import {
  getAdyenConfig,
  getPaymentMethods,
  initiatePayment,
  submitAdditionalDetails,
} from '../../api/checkout';
import { Button, RadioButtonGroupOption, RadioButtonGroup } from 'modus-ui';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import PurchaseModel from '../PurchaseModel';
import PaymentModel from '../PaymentModel';
import PaymentMethods from '../PaymentMethods';

export type purchaseDataModel = {
  merchantAccount: string;
  amount: {
    currency: string;
    value: number;
  };
  paymentMethod: {
    type: string;
  };
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

export type paymentMethod = {
  name: string;
  type: string;
  supportsRecurring: boolean;
};

//DUMMY DATA
const purchaseData: purchaseDataModel = {
    merchantAccount:"YOUR_MERCHANT_ACCOUNT",
    amount:{
      currency:"PHP",
      value:1000
    },
    paymentMethod:{
      "type":"gcash"
    },
    returnUrl:"https://your-company.com/checkout?shopperOrder=12xy.."

};

const paymentData: paymentDataModel = {
  paymentData: 'Ab02b4c0!BQABAgCJN1wRZuGJmq8dMncmypvknj9s7l5Tj...',
  details: {
    payload: 'Ab02b4c0!BQABAgCW5sxB4e/==',
  },
};
//End of dummy data

const App = () => {
  const [radioValue, setRadioValue] = useState('');
  let radioBtns;

  useEffect(() => {
    getAdyenConfig();
    getPaymentMethods()
      .then((Response) => {
        mapPaymentMethods(Response.data.paymentMethods);
        //console.log(Response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  const gcashRedirect = (redirectUrl: string) => {
    window.location.replace(redirectUrl);
  };

  const mapPaymentMethods = (arrPaymentMethod: Array<paymentMethod>) => {
    let paymentMethods: RadioButtonGroupOption[] = [];
    arrPaymentMethod.map((data) => {
        paymentMethods = paymentMethods.concat({
        id: data.type,
        text: data.name,
        value: data.type,
      });
    });
    return radioBtns = (
      <RadioButtonGroup
        label={'Payment Methods: '}
        options={paymentMethods}
        value={radioValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setRadioValue(event.target.value);
        }}
      />
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route path="/paymentmethods">
              <PaymentMethods />
            </Route>
            <Route path="/purchase">
              <PurchaseModel />
            </Route>
            <Route path="/payment">
              <PaymentModel />
            </Route>
            <Route path="/">
              <Link to="/paymentmethods">
                <div>
                  <Button
                    text="Get Payment Methods"
                    onClick={() => {
                      getAdyenConfig();
                      getPaymentMethods();
                    }}
                  />
                </div>
              </Link>
                <div>
                  <Button
                    text="Initiate Payment"
                    onClick={() => {
                      initiatePayment(purchaseData)
                        .then((Response) =>
                          gcashRedirect(Response.data.redirectUrl)
                        )
                        .catch((Error) => console.log(Error));
                    }}
                  />
                </div>
              <Link to="/payment">
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
              </Link>
              <div></div>
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
