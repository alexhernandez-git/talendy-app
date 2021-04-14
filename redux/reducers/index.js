import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import alertsReducer from "./alertsReducer";
export default combineReducers({
  userReducer: userReducer,
  alertsReducer: alertsReducer,
});
