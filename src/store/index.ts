import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { portfolioReducer } from '../reducers';

const rootReducer = combineReducers({ portfolio: portfolioReducer });

const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};

export default configureStore;
