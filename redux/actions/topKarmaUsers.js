import axios from "axios";
import {
  FETCH_TOP_KARMA_USERS,
  FETCH_TOP_KARMA_USERS_SUCCESS,
  FETCH_TOP_KARMA_USERS_FAIL,
  FOLLOW_TOP_KARMA_USER,
  FOLLOW_TOP_KARMA_USER_SUCCESS,
  FOLLOW_TOP_KARMA_USER_FAIL,
} from "../types";
import { addFollow, tokenConfig } from "./auth";

export const fetchTopKarmaUsers = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_TOP_KARMA_USERS,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/users/list_users_with_most_karma/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_TOP_KARMA_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_TOP_KARMA_USERS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const followTopKarmaUser = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FOLLOW_TOP_KARMA_USER,
  });
  const values = {
    followed_user: id,
  };
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .post(
      `${process.env.HOST}/api/${subdomain}/follows/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FOLLOW_TOP_KARMA_USER_SUCCESS,
        payload: id,
      });
      await dispatch(addFollow());
    })
    .catch(async (err) => {
      await dispatch({
        type: FOLLOW_TOP_KARMA_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
