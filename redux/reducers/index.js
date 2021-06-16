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
import usersReducer from "./usersReducer";
import communitiesReducer from "./communitiesReducer";
import collaborateRequestsReducer from "./collaborateRequestsReducer";
import collaborateRoomReducer from "./collaborateRoomReducer";
import roomMessagesReducer from "./roomMessagesReducer";
import donationOptionsReducer from "./donationOptionsReducer";
import reviewsReducer from "./reviewsReducer";
import donationsReducer from "./donationsReducer";
import earningsReducer from "./earningsReducer";
import foldersReducer from "./foldersReducer";
import filesReducer from "./filesReducer";
import moveFoldersReducer from "./moveFoldersReducer";
import customerInvoicesReducer from "./customerInvoicesReducer";

export default combineReducers({
  authReducer,
  chatReducer,
  alertsReducer,
  initialDataReducer,
  topKarmaUsersReducer,
  userReducer,
  invitationsReducer,
  followingReducer,
  connectionsReducer,
  notificationsReducer,
  lastNotificationsReducer,
  lastMessagesReducer,
  chatsReducer,
  postsReducer,
  postReducer,
  usersReducer,
  messagesReducer,
  communitiesReducer,
  donationOptionsReducer,
  collaborateRequestsReducer,
  collaborateRoomReducer,
  roomMessagesReducer,
  reviewsReducer,
  donationsReducer,
  earningsReducer,
  foldersReducer,
  filesReducer,
  moveFoldersReducer,
  customerInvoicesReducer,
});
