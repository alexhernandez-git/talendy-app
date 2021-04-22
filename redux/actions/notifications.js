import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  FETCH_MORE_NOTIFICATIONS,
  FETCH_MORE_NOTIFICATIONS_SUCCESS,
  FETCH_MORE_NOTIFICATIONS_FAIL,
  ADD_NOTIFICATION_TO_FEED,
  ADD_NOTIFICATION_TO_FEED_SUCCESS,
  ADD_NOTIFICATION_TO_FEED_FAIL,
  UPDATE_NOTIFICATION_TO_FEED_SUCCESS,
  SET_ALL_NOTIFICATIONS_READ,
  SET_ALL_NOTIFICATIONS_READ_SUCCESS,
  SET_ALL_NOTIFICATIONS_READ_FAIL,
} from "../types";

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

export const addOrUpdateNotificationToFeed = (id) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: ADD_NOTIFICATION_TO_FEED,
  });
  await axios
    .get(`${process.env.HOST}/api/notifications/${id}/`, tokenConfig(getState))
    .then(async (res) => {
      const result = getState().notificationsReducer.notifications.results.find(
        (notification) => notification.id === res.data.id
      );
      if (result) {
        await dispatch({
          type: UPDATE_NOTIFICATION_TO_FEED_SUCCESS,
          payload: res.data,
        });
      } else {
        await dispatch({
          type: ADD_NOTIFICATION_TO_FEED_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: ADD_NOTIFICATION_TO_FEED_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const setAllNotificationsRead = () => async (dispatch, getState) => {
  await dispatch({
    type: SET_ALL_NOTIFICATIONS_READ,
  });
  await axios
    .get(
      `${process.env.HOST}/api/notifications/set_all_notifications_read/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: SET_ALL_NOTIFICATIONS_READ_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ALL_NOTIFICATIONS_READ_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
