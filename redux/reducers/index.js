import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import alertsReducer from "./alertsReducer";
import initialDataReducer from "./initialDataReducer";
import topKarmaUsersReducer from "./topKarmaUsersReducer";
import userReducer from "./userReducer";
import invitationsReducer from "./invitationsReducer";
import connectionsReducer from "./connectionsReducer";
import followingReducer from "./followingReducer";
import notificationsReducer from "./notificationsReducer";
import lastNotificationsReducer from "./lastNotificationsReducer";
import lastMessagesReducer from "./lastMessagesReducer";
import chatsReducer from "./chatsReducer";
import chatReducer from "./chatReducer";
import messagesReducer from "./messagesReducer";

export default combineReducers({
  authReducer: authReducer,
  alertsReducer: alertsReducer,
  initialDataReducer: initialDataReducer,
  topKarmaUsersReducer: topKarmaUsersReducer,
  userReducer: userReducer,
  invitationsReducer: invitationsReducer,
  followingReducer: followingReducer,
  connectionsReducer: connectionsReducer,
  notificationsReducer: notificationsReducer,
  lastNotificationsReducer: lastNotificationsReducer,
  lastMessagesReducer: lastMessagesReducer,
  chatsReducer: chatsReducer,
  chatReducer: chatReducer,
  messagesReducer: messagesReducer,
});
