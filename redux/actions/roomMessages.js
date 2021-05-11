import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_ROOM_MESSAGES,
  FETCH_ROOM_MESSAGES_SUCCESS,
  FETCH_ROOM_MESSAGES_FAIL,
  FETCH_ROOM_MESSAGE,
  FETCH_ROOM_MESSAGE_SUCCESS,
  FETCH_ROOM_MESSAGE_FAIL,
  ADD_ROOM_MESSAGE,
  FETCH_MORE_ROOM_MESSAGES,
  FETCH_MORE_ROOM_MESSAGES_SUCCESS,
  FETCH_MORE_ROOM_MESSAGES_FAIL,
  RESET_ROOM_MESSAGES,
} from "../types";

export const resetRoomMessages = () => async (dispatch, getState) => {
  await dispatch({ type: RESET_ROOM_MESSAGES });
};

export const fetchRoomMessages = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_ROOM_MESSAGES,
  });
  await axios
    .get(`${process.env.HOST}/api/posts/${id}/messages/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FETCH_ROOM_MESSAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_ROOM_MESSAGES_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const addRoomMessage = (data) => async (dispatch, getState) => {
  await dispatch({
    type: ADD_ROOM_MESSAGE,
    payload: data,
  });
};

export const fetchMessage = (chat__pk, message__pk) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: FETCH_ROOM_MESSAGE,
  });
  await axios
    .get(
      `${process.env.HOST}/api/posts/${chat__pk}/messages/${message__pk}/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      try {
        await dispatch({
          type: FETCH_ROOM_MESSAGE_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_ROOM_MESSAGE_FAIL,
        payload: { data: err.response.data, status: err.response.status },
      });
    });
};

export const fetchMoreRoomMessages = () => async (dispatch, getState) => {
  const url = getState().messagesReducer.messages.next;
  console.log(getState().messagesReducer.messages.next);
  if (url) {
    dispatch({
      type: FETCH_MORE_ROOM_MESSAGES,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_ROOM_MESSAGES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_ROOM_MESSAGES_FAIL,
          payload: { data: err.response.data, status: err.response.status },
        });
      });
  }
};
