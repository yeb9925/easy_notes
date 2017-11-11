import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import day from './day';
import subject from './subject';
import note from './note';

const reducer = combineReducers({day, subject, note})
const middleware = compose(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
));
const store = createStore(reducer, middleware);

export default store;
export * from './day';
export * from './subject';
export * from './note';