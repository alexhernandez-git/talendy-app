import axios from "axios";
import {
  setPendingMessages,
  setPendingNotifications,
  tokenConfig,
  unsetPendingMessages,
} from "./auth";
import {
  CREATE_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  FETCH_CHATS,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL,
  SET_CURRENT_CHAT,
  NEW_MESSAGE_EVENT,
  CHANGE_LAST_MESSAGE,
  ADD_CHAT_TO_FEED,
  ADD_CHAT_TO_FEED_SUCCESS,
  ADD_CHAT_TO_FEED_FAIL,
  OPEN_CHATS,
  CLOSE_CHATS,
} from "../types";
import { createAlert } from "./alerts";
import { fetchChat, resetChat } from "./chat";
import { addOrUpdateNotificationToFeed } from "./lastNotifications";

export const openChats = () => async (dispatch, getState) => {
  await dispatch(unsetPendingMessages());

  await dispatch({ type: OPEN_CHATS });
};

export const closeChats = () => async (dispatch, getState) => {
  await dispatch(unsetPendingMessages());

  await dispatch({ type: CLOSE_CHATS });
  await dispatch(resetChat());
};

export const fetchChats =
  (search = "") =>
  async (dispatch, getState) => {
    await dispatch({
      type: FETCH_CHATS,
    });
    console.log(`${process.env.HOST}/api/chats/?search=${search}`);
    await axios
      .get(
        `${process.env.HOST}/api/chats/?search=${search}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        console.log("chats", res.data);
        await dispatch({
          type: FETCH_CHATS_SUCCESS,
          payload: res.data,
        });
        const current_chat = getState().chatsReducer.current_chat;
        console.log("current_chat", current_chat);
        if (current_chat) {
          await dispatch(fetchChat(current_chat));
        }
      })
      .catch((err) => {
        console.log(err.response);

        dispatch({
          type: FETCH_CHATS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const getOrCreateChat = (user_id) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_CHAT,
  });
  console.log(user_id);
  await axios
    .post(
      `${process.env.HOST}/api/chats/`,
      { to_user: user_id },
      tokenConfig(getState)
    )
    .then(async (res) => {
      if (res.status == 201) {
        await dispatch({
          type: CREATE_CHAT_SUCCESS,
          payload: res.data,
        });
      }
      await dispatch({ type: SET_CURRENT_CHAT, payload: res.data.id });
      await dispatch(openChats());
    })
    .catch((err) => {
      console.log(err.response);

      dispatch({
        type: CREATE_CHAT_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
      dispatch(createAlert("ERROR", "Something went wrong"));
    });
};

export const addChatToFeed = (id) => async (dispatch, getState) => {
  await dispatch({
    type: ADD_CHAT_TO_FEED,
  });
  await axios
    .get(
      `${process.env.HOST}/api/chats/${id}/retrieve_chat_feed/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: ADD_CHAT_TO_FEED_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: ADD_CHAT_TO_FEED_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const changeLastMessage =
  (chat__id, message__text) => async (dispatch, getState) => {
    const result = getState().chatsReducer.chats.results.some(
      (chat) => chat.id === chat__id
    );
    console.log("is result", result);
    if (result) {
      await dispatch({
        type: CHANGE_LAST_MESSAGE,
        payload: { chat__id: chat__id, message__text: message__text },
      });
    } else {
      await dispatch(addChatToFeed(chat__id));
    }
  };
