import axios, { AxiosInstance, AxiosPromise } from 'axios';
import { purchaseDataModel, paymentDataModel } from '../redux/state';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 50000,
});

export const getAdyenConfig = () => {
  return api.get('api/config');
};

export const getPaymentMethods = () => {
  return api.post('api/getPaymentMethods');
};

export const initiatePayment = (
  purchaseData: purchaseDataModel
): AxiosPromise<purchaseDataModel> => {
  return api.post('api/initiatePayment', purchaseData);
};

export const submitAdditionalDetails = (
  paymentData: paymentDataModel
): AxiosPromise<paymentDataModel> => {
  return api.post('api/submitAdditionalDetails', paymentData);
};
