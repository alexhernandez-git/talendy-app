import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import alertsReducer from "./alertsReducer";
import initialDataReducer from "./initialDataReducer";
export default combineReducers({
  userReducer: userReducer,
  alertsReducer: alertsReducer,
  initialDataReducer: initialDataReducer,
});
