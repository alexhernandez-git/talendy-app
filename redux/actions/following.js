import axios from "axios";
import {
  FETCH_FOLLOWING,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAIL,
  STOP_FOLLOWING,
  STOP_FOLLOWING_SUCCESS,
  STOP_FOLLOWING_FAIL,
} from "../types";
import { substractFollow, tokenConfig } from "./auth";

export const fetchFollowing = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_FOLLOWING,
  });

  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(`${process.env.HOST}/api/${subdomain}/follows/`, tokenConfig(getState))
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

export const unfollow = (id) => async (dispatch, getState) => {
  await dispatch({
    type: STOP_FOLLOWING,
  });
  const values = {
    followed_user: id,
  };
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .post(
      `${process.env.HOST}/api/${subdomain}/follows/unfollow/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: STOP_FOLLOWING_SUCCESS,
        payload: id,
      });
      await dispatch(substractFollow());
    })
    .catch(async (err) => {
      await dispatch({
        type: STOP_FOLLOWING_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
