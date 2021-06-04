import axios from "axios";
import { addFollow, tokenConfig } from "./auth";
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_MORE_USERS,
  FETCH_MORE_USERS_SUCCESS,
  FETCH_MORE_USERS_FAIL,
  FOLLOW_USER_IN_USERS,
  FOLLOW_USER_IN_USERS_SUCCESS,
  FOLLOW_USER_IN_USERS_FAIL,
} from "../types";

export const fetchUsers =
  (search = "") =>
  async (dispatch, getState) => {
    await dispatch({
      type: FETCH_USERS,
    });
    await axios
      .get(
        `${process.env.HOST}/api/users/?search=${search}`,
        getState().authReducer.is_authenticated ? tokenConfig(getState) : null
      )
      .then(async (res) => {
        await dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(async (err) => {
        await dispatch({
          type: FETCH_USERS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const fetchMoreUsers = () => async (dispatch, getState) => {
  const url = getState().usersReducer.users.next;
  if (url) {
    dispatch({
      type: FETCH_MORE_USERS,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_USERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_USERS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};

export const followUserInUsers = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FOLLOW_USER_IN_USERS,
  });
  const values = {
    followed_user: id,
  };
  await axios
    .post(`${process.env.HOST}/api/follows/`, values, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FOLLOW_USER_IN_USERS_SUCCESS,
        payload: id,
      });
      await dispatch(addFollow());
    })
    .catch(async (err) => {
      await dispatch({
        type: FOLLOW_USER_IN_USERS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
