import axios from "axios";
import { tokenConfig } from "./auth";
import { FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_FAIL } from "../types";
import { createAlert } from "./alerts";

export const fetchPost = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_POST,
  });
  await axios
    .get(`${process.env.HOST}/api/posts/${id}/`)
    .then(async (res) => {
      await dispatch({
        type: FETCH_POST_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_POST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const createPostContributeRequest = (id = null) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: CREATE_POST_CONTRIBUTE_REQUEST,
  });
  const values = {
    post: id ? id : getState().userReducer.user?.id,
  };
  await axios
    .post(
      `${process.env.HOST}/api/contribute-requests/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: CREATE_POST_CONTRIBUTE_REQUEST_SUCCESS,
        payload: id,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: CREATE_POST_CONTRIBUTE_REQUEST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
