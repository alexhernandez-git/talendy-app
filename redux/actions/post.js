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
