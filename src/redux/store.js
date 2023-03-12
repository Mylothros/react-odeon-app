import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducers from "./reducers";

const initialState = {};
const midleware = [thunk];

export const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(...midleware)));

export default store;
