import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_LAST_MESSAGES,
  FETCH_LAST_MESSAGES_SUCCESS,
  FETCH_LAST_MESSAGES_FAIL,
} from "../types";

export const fetchLastMessages = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_LAST_MESSAGES,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/chats/last_messages/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_LAST_MESSAGES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_LAST_MESSAGES_FAIL,
        payload: { data: err?.response?.data, status: err?.response?.status },
      });
    });
};
