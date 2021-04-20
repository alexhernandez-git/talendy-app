import axios from "axios";
import {
  FETCH_FOLLOWING,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAIL,
  STOP_FOLLOWING,
  STOP_FOLLOWING_SUCCESS,
  STOP_FOLLOWING_FAIL,
} from "../types";
import { tokenConfig } from "./auth";

export const fetchFollowing = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_FOLLOWING,
  });

  await axios
    .get(`${process.env.HOST}/api/follows/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FETCH_FOLLOWING_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_FOLLOWING_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const removeConnection = (id) => async (dispatch, getState) => {
  await dispatch({
    type: STOP_FOLLOWING,
  });
  const values = {
    followed_user: id,
  };
  console.log(values);
  await axios
    .delete(
      `${process.env.HOST}/api/follows/unfollow/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: STOP_FOLLOWING_SUCCESS,
        payload: id,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: STOP_FOLLOWING_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
