import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import alertsReducer from "./alertsReducer";
import initialDataReducer from "./initialDataReducer";
import topKarmaUsersReducer from "./topKarmaUsersReducer";
export default combineReducers({
  userReducer: userReducer,
  alertsReducer: alertsReducer,
  initialDataReducer: initialDataReducer,
  topKarmaUsersReducer: topKarmaUsersReducer,
});
