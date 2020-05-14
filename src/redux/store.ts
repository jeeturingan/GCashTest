import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';

import middlewares from './middlewares';
import reducers from './reducer';
//import { AppState } from './AppState';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
//export const store: Store<AppState | any> = createStore(
export const store: any = createStore(
  reducers,
  composeWithDevTools(middlewares)
);
