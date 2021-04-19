import axios from "axios";
import {
  FETCH_TOP_KARMA_USERS,
  FETCH_TOP_KARMA_USERS_SUCCESS,
  FETCH_TOP_KARMA_USERS_FAIL,
} from "../types";
import { tokenConfig } from "./user";
export const fetchTopKarmaUsers = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_TOP_KARMA_USERS,
  });
  await axios
    .get(
      `${process.env.HOST}/api/users/list_users_with_most_karma/`,
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
