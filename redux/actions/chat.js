import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_CHAT,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAIL,
  REMOVE_CURRENT_CHAT,
  SET_SEEN_CHAT,
} from "../types";
import { fetchMessages } from "./messages";

export const fetchChat = (id, handleCloseProfile = false) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: FETCH_CHAT,
  });
  await axios
    .get(`${process.env.HOST}/api/chats/${id}/`, tokenConfig(getState))
    .then(async (res) => {
      try {
        await dispatch({
          type: FETCH_CHAT_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
      try {
        await dispatch(fetchMessages(res.data.id));
      } catch (error) {
        console.log(error);
      }
      try {
        await dispatch({ type: REMOVE_CURRENT_CHAT });
      } catch (error) {
        console.log(error);
      }
      try {
        await dispatch({ type: SET_SEEN_CHAT, payload: res.data.id });
      } catch (error) {
        console.log(error);
      }
      try {
        if (handleCloseProfile) {
          await handleCloseProfile();
        }
      } catch (error) {
        console.log(error);
      }
    })
    .catch(async (err) => {
      try {
        await dispatch({
          type: FETCH_CHAT_FAIL,
          payload: {
            data: err.response?.data,
            status: err.response?.status,
          },
        });
      } catch (error) {
        console.log(error);
      }
    });
};
