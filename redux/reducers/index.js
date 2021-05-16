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
import contributeRequestsReducer from "./contributeRequestsReducer";
import contributeRoomReducer from "./contributeRoomReducer";
import roomMessagesReducer from "./roomMessagesReducer";
import donationOptionsReducer from "./donationOptionsReducer";
import reviewsReducer from "./reviewsReducer";

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
  postReducer: postReducer,
  usersReducer: usersReducer,
  messagesReducer: messagesReducer,
  communitiesReducer: communitiesReducer,
  donationOptionsReducer: donationOptionsReducer,
  contributeRequestsReducer: contributeRequestsReducer,
  contributeRoomReducer: contributeRoomReducer,
  roomMessagesReducer: roomMessagesReducer,
  reviewsReducer: reviewsReducer,
});
