import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import subject from './subject';
import day from './day';
import note from './note';

const reducer = combineReducers({ subject, day, note })
const middleware = compose(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './subject';
export * from './day';
export * from './note';