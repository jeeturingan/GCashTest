import { Action } from 'redux';
import {
  purchaseDataModel,
  paymentMethodsModel,
  paymentDataModel,
} from './state';
import {
  getAdyenConfig,
  getPaymentMethods,
  initiatePayment,
  submitAdditionalDetails,
} from '../api/checkout';
import { duration } from 'moment';

export enum actionTypes {
  GET_PAYMENT_METHODS_SUCCESS = 'GET_PAYMENT_METHODS_SUCCESS',
  POST_PAYMENT_SUCCESS = 'POST_PAYMENT_SUCCESS',
  POST_ADDITIONAL_PAYMENT_SUCCESS = 'POST_ADDITIONAL_PAYMENT_SUCCESS',
}

export interface action extends Action {
  paymentMethods: paymentMethodsModel;
  redirectUrl: string;
  resultCode: string;
}

export const setPaymentMethodsSuccess = (
  paymentMethods: paymentMethodsModel
) => {
  return {
    type: actionTypes.GET_PAYMENT_METHODS_SUCCESS,
    paymentMethods: paymentMethods,
  };
};

export const postPaymentSuccess = (redirectUrl: string) => {
  return {
    type: actionTypes.POST_PAYMENT_SUCCESS,
    redirectUrl: redirectUrl,
  };
};

export const postAdditionalPaymentSuccess = (resultCode: string) => {
  return {
    type: actionTypes.POST_ADDITIONAL_PAYMENT_SUCCESS,
    resultCode: resultCode,
  };
};

export const setPaymentMethods = () => {
  return (dispatch: any) => {
    getAdyenConfig();
    getPaymentMethods()
      .then((response) => {
        dispatch(setPaymentMethodsSuccess(response.data.paymentMethods));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const postPayment = (purchaseData: purchaseDataModel) => {
  return (dispatch: any) => {
    initiatePayment(purchaseData)
      .then((response) => {
        dispatch(postPaymentSuccess(response.data.redirectUrl));
      })
      .catch((error) => console.log(error));
  };
};

export const postAdditionalPayment = (paymentData: paymentDataModel) => {
  return (dispatch: any) => {
    submitAdditionalDetails(paymentData)
      .then((response) => {
        dispatch(postAdditionalPaymentSuccess('response.data.resultCode'));
      })
      .catch((error) => console.log(error));
  };
};
