import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";
import initialDataReducer from "./initialDataReducer";
import topKarmaUsersReducer from "./topKarmaUsersReducer";
import userReducer from "./userReducer";
export default combineReducers({
  authReducer: authReducer,
  alertsReducer: alertsReducer,
  initialDataReducer: initialDataReducer,
  topKarmaUsersReducer: topKarmaUsersReducer,
  userReducer: userReducer,
});
