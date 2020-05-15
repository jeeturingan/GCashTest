import React, { useEffect, useState } from 'react';
import { Button, RadioButtonGroupOption, RadioButtonGroup } from 'modus-ui';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './index.css';
import { submitAdditionalDetails } from '../api/checkout';
import PurchaseModel from './PurchaseModel';
import PaymentModel from './PaymentModel';
import PaymentMethods from './PaymentMethods';
import ProductCart from './demo';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPaymentMethods,
  postPayment,
  postAdditionalPayment,
} from '../redux/actions';
import * as model from '../redux/state';
import { Status } from './status/Status';

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

export type paymentMethod = {
  name: string;
  type: string;
  supportsRecurring: boolean;
};

//DUMMY DATA
const purchaseData: model.purchaseDataModel = {
  merchantAccount: 'BizboxECOM',
  amount: {
    currency: 'PHP',
    value: 1000,
  },
  paymentMethod: {
    type: 'gcash',
  },
  reference: 'YOUR_ORDER_NUMBER',
  returnUrl: 'https://your-company.com/checkout?shopperOrder=12xy..',
};

const paymentData: model.paymentDataModel = {
  paymentData: 'Ab02b4c0!BQABAgCJN1wRZuGJmq8dMncmypvknj9s7l5Tj...',
  details: {
    payload: 'Ab02b4c0!BQABAgCW5sxB4e/==',
  },
};
//End of dummy data

const App = () => {
  const [radioValue, setRadioValue] = useState('');
  let radioBtns;

  const paymentMethods = useSelector((state: model.checkoutState) => {
    return state.paymentMethods;
  });

  const dispatch = useDispatch();
  const getPaymentMethods = () => {
    dispatch(setPaymentMethods());
  };
  const initiatePurchase = (purchaseData: model.purchaseDataModel) => {
    dispatch(postPayment(purchaseData));
  };
  const postAdditionalPayment = (paymentData: model.paymentDataModel) => {
    dispatch(postAdditionalPayment(paymentData));
  };

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const gcashRedirect = (redirectUrl: string) => {
    window.location.replace(redirectUrl);
  };

  // const mapPaymentMethods = (
  //   arrPaymentMethod: Array<model.paymentMethodModel>
  // ) => {
  //   let paymentMethods: RadioButtonGroupOption[] = [];
  //   arrPaymentMethod.map((data) => {
  //     paymentMethods = paymentMethods.concat({
  //       id: data.type,
  //       text: data.name,
  //       value: data.type,
  //     });
  //   });

  //   return (radioBtns = (
  //     <RadioButtonGroup
  //       label={'Payment Methods: '}
  //       options={paymentMethods}
  //       value={radioValue}
  //       onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
  //         setRadioValue(event.target.value);
  //       }}
  //     />
  //   ));
  // };

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
            <Route path="/payment" component={PaymentModel} />
            <Route path="/demo" component={ProductCart} />
            <Route path="/status" component={Status} />
            <Route path="/">
              <Link to="/demo">
                <div>
                  <Button text="Simulation" />
                </div>
              </Link>
              <div>
                <Button
                  text="Get Payment Methods"
                  onClick={() => {
                    getPaymentMethods();
                  }}
                />
              </div>
              <div>
                <Button
                  text="Initiate Payment"
                  onClick={() => {
                    initiatePurchase(purchaseData);
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
              <div>
                <Button
                  text="Test Button"
                  onClick={() => {
                    console.log(purchaseData);
                    console.log(purchaseData.amount.value);
                  }}
                />
              </div>
            </Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
};

export default App;
