import axios from "axios";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FOLLOW_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  UNFOLLOW_USER,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
} from "../types";
import { tokenConfig } from "./auth";

export const fetchUser = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_USER,
  });
  await axios
    .get(`${process.env.HOST}/api/users/${id}/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FETCH_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const followUser = () => async (dispatch, getState) => {
  await dispatch({
    type: FOLLOW_USER,
  });
  const values = {
    followed_user: getState().userReducer.user?.id,
  };
  console.log(values);
  await axios
    .post(`${process.env.HOST}/api/follows/`, values, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FOLLOW_USER_SUCCESS,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FOLLOW_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const unfollowUser = () => async (dispatch, getState) => {
  await dispatch({
    type: UNFOLLOW_USER,
  });
  const values = {
    followed_user: getState().userReducer.user?.id,
  };
  await axios
    .post(
      `${process.env.HOST}/api/follows/unfollow/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: UNFOLLOW_USER_SUCCESS,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: UNFOLLOW_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
