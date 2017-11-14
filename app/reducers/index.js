import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import subject from './subject';
import day from './day';
import note from './note';
import id from './id';

const reducer = combineReducers({ subject, day, note, id })
const middleware = compose(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './subject';
export * from './day';
export * from './note';
export * from './id';