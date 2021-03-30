import { createStore, applyMiddleware, combineReducers } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";
import createSagaMiddleware from "redux-saga";

const bindMiddleware = (middleware) => {
  // if (process.env.NODE_ENV !== "production") {
  const { composeWithDevTools } = require("redux-devtools-extension");
  return composeWithDevTools(applyMiddleware(...middleware));
  // }
  return applyMiddleware(...middleware);
};

const initStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  return createStore(
    reducer,
    bindMiddleware([thunkMiddleware, sagaMiddleware])
  );
};

export const wrapper = createWrapper(initStore);
