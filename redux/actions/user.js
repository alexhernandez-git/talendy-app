import axios from "axios";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FOLLOW_TOP_KARMA_USERS,
  FOLLOW_TOP_KARMA_USERS_SUCCESS,
  FOLLOW_TOP_KARMA_USERS_FAIL,
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
