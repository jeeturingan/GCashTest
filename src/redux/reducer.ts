import * as checkout from '../api/checkout';
import { checkoutState } from './state';
import { Reducer } from 'redux';
import { actionTypes, action } from './actions';

const initialState: checkoutState = {
  redirectUrl: '',
  resultCode: '',
};

const reducer: Reducer<checkoutState, action> = (
  state: checkoutState = initialState,
  action: action
): checkoutState => {
  switch (action.type) {
    case actionTypes.GET_PAYMENT_METHODS_SUCCESS:
      return Object.assign({}, state, {
        paymentMethods: action.paymentMethods,
      });
    case actionTypes.POST_PAYMENT_SUCCESS:
      return Object.assign({}, state, { redirectUrl: action.redirectUrl });
    case actionTypes.POST_ADDITIONAL_PAYMENT_SUCCESS:
      return Object.assign({}, state, { resultCode: action.resultCode });
    default:
      return state;
  }
};

export default reducer;
