import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const middlewares = applyMiddleware(thunk);

export default middlewares;
