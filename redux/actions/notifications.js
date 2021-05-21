import axios from "axios";
import {
  setPendingMessages,
  setPendingNotifications,
  tokenConfig,
} from "./auth";
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  FETCH_MORE_NOTIFICATIONS,
  FETCH_MORE_NOTIFICATIONS_SUCCESS,
  FETCH_MORE_NOTIFICATIONS_FAIL,
  NEW_MESSAGE_EVENT,
  SET_NOTIFICATION_READ,
  SET_NOTIFICATION_READ_SUCCESS,
  SET_NOTIFICATION_READ_FAIL,
} from "../types";
import { fetchContributeRequest } from "./collaborateRequests";
import { createAlert } from "./alerts";
import { addChatToFeed } from "./chats";
import { addOrUpdateNotificationToFeed } from "./lastNotifications";

export const fetchNotifications = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_NOTIFICATIONS,
  });
  await axios
    .get(`${process.env.HOST}/api/notifications/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FETCH_NOTIFICATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_NOTIFICATIONS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const fetchMoreNotifications = () => async (dispatch, getState) => {
  const url = getState().notificationsReducer.notifications.next;
  if (url) {
    dispatch({
      type: FETCH_MORE_NOTIFICATIONS,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        console.log(res.data);
        await dispatch({
          type: FETCH_MORE_NOTIFICATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_NOTIFICATIONS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};

export const setNotificationRead = (id) => async (dispatch, getState) => {
  await dispatch({
    type: SET_NOTIFICATION_READ,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/notifications/${id}/read/`,
      {},
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: SET_NOTIFICATION_READ_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_NOTIFICATION_READ_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const newMessageEvent = (data) => async (dispatch, getState) => {
  console.log("chat id", data.chat__pk);
  console.log("current chat", getState().chatsReducer.current_chat);
  if (data.chat__pk === getState().chatsReducer.current_chat) {
    await dispatch(setNotificationRead(data.notification__pk));
    return;
  }
  const result = getState().chatsReducer.chats.results.some(
    (chat) => chat.id === data.chat__pk
  );
  if (result) {
    await dispatch({
      type: NEW_MESSAGE_EVENT,
      payload: { chat__id: data.chat__pk, message__text: data.message__text },
    });
  } else {
    await dispatch(addChatToFeed(data.chat__pk));
  }
  await dispatch(
    createAlert("SUCCESS", "New message from " + data.sent_by__username)
  );
  await dispatch(setPendingMessages());
  await dispatch(addOrUpdateNotificationToFeed(data.notification__pk));
};

export const newContributeRequestEvent =
  (data) => async (dispatch, getState) => {
    await dispatch(createAlert("SUCCESS", "New collaborate request"));
    await dispatch(fetchContributeRequest(data.collaborate_request__pk));
    await dispatch(setPendingNotifications());
    await dispatch(addOrUpdateNotificationToFeed(data.notification__pk));
  };

export const newContributeRoomMessageEvent =
  (data) => async (dispatch, getState) => {
    console.log("post id", data.post__pk);

    if (
      getState().collaborateRoomReducer.collaborate_room?.id !== data.post__pk
    ) {
      await dispatch(
        createAlert(
          "SUCCESS",
          "Your have recieved a message from a collaborate room"
        )
      );
      await dispatch(addOrUpdateNotificationToFeed(data.notification__pk));
    } else {
      // Set notification seen
      await dispatch(setNotificationRead(data.notification__pk));
    }
  };
