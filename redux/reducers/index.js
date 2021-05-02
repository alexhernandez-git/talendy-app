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
import postsReducer from "./postsReducer";
import postReducer from "./postReducer";
import communitiesReducer from "./communitiesReducer";

export default combineReducers({
  authReducer: authReducer,
  chatReducer: chatReducer,
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
  postsReducer: postsReducer,
  messagesReducer: messagesReducer,
  communitiesReducer: communitiesReducer,
});
