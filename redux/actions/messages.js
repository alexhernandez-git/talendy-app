import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  FETCH_MESSAGE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAIL,
  ADD_MESSAGE,
  FETCH_MORE_MESSAGES,
  FETCH_MORE_MESSAGES_SUCCESS,
  FETCH_MORE_MESSAGES_FAIL,
  RESET_MESSAGES,
} from "../types";
export const resetMessages = () => async (dispatch, getState) => {
  await dispatch({ type: RESET_MESSAGES });
};
export const fetchMessages = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_MESSAGES,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/chats/${id}/messages/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_MESSAGES_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const addMessage = (data) => async (dispatch, getState) => {
  await dispatch({
    type: ADD_MESSAGE,
    payload: data,
  });
};

export const fetchMessage =
  (chat__pk, message__pk) => async (dispatch, getState) => {
    await dispatch({
      type: FETCH_MESSAGE,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .get(
        `${process.env.HOST}/api/${subdomain}/chats/${chat__pk}/messages/${message__pk}/`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        try {
          await dispatch({
            type: FETCH_MESSAGE_SUCCESS,
            payload: res.data,
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch(async (err) => {
        await dispatch({
          type: FETCH_MESSAGE_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const fetchMoreMessages = () => async (dispatch, getState) => {
  const url = getState().messagesReducer.messages.next;
  console.log(getState().messagesReducer.messages.next);
  if (url) {
    dispatch({
      type: FETCH_MORE_MESSAGES,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_MESSAGES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_MESSAGES_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};
