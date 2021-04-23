import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  FETCH_MORE_NOTIFICATIONS,
  FETCH_MORE_NOTIFICATIONS_SUCCESS,
  FETCH_MORE_NOTIFICATIONS_FAIL,
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
