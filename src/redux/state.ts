export type checkoutState = {
  paymentMethods?: paymentMethodsModel;
  redirectUrl: string;
  resultCode: string;
};

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
  redirectUrl?: string;
};

export type paymentDataModel = {
  paymentData: string;
  details: {
    payload: string;
    type?: string;
    key?: string;
  };
  resultCode?: string;
};

export type paymentMethodsModel = {
  paymentMethods: [{ name: string; type: string; supportsRecurring: boolean }];
};
