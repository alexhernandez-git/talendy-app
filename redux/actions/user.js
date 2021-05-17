import axios from "axios";
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FOLLOW_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  STOP_FOLLOWING_USER,
  STOP_FOLLOWING_USER_SUCCESS,
  STOP_FOLLOWING_USER_FAIL,
  CONNECT_USER,
  CONNECT_USER_SUCCESS,
  CONNECT_USER_FAIL,
  ACCEPT_USER_INVITATION,
  ACCEPT_USER_INVITATION_SUCCESS,
  ACCEPT_USER_INVITATION_FAIL,
  DONATE_USER,
  DONATE_USER_SUCCESS,
  DONATE_USER_FAIL,
} from "../types";
import { tokenConfig, addConnection, substractFollow, addFollow } from "./auth";

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

export const followUser =
  (id = null) =>
  async (dispatch, getState) => {
    await dispatch({
      type: FOLLOW_USER,
    });
    const values = {
      followed_user: id ? id : getState().userReducer.user?.id,
    };
    await axios
      .post(`${process.env.HOST}/api/follows/`, values, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FOLLOW_USER_SUCCESS,
        });
        await dispatch(addFollow());
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
    type: STOP_FOLLOWING_USER,
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
        type: STOP_FOLLOWING_USER_SUCCESS,
      });
      await dispatch(substractFollow());
    })
    .catch(async (err) => {
      await dispatch({
        type: STOP_FOLLOWING_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const connectUser = () => async (dispatch, getState) => {
  await dispatch({
    type: CONNECT_USER,
  });
  const values = {
    addressee: getState().userReducer.user?.id,
  };
  await axios
    .post(`${process.env.HOST}/api/connections/`, values, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: CONNECT_USER_SUCCESS,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: CONNECT_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const acceptUserInvitation = () => async (dispatch, getState) => {
  await dispatch({
    type: ACCEPT_USER_INVITATION,
  });
  const values = {
    requester: getState().userReducer.user?.id,
  };
  await axios
    .patch(
      `${process.env.HOST}/api/connections/accept/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: ACCEPT_USER_INVITATION_SUCCESS,
      });
      await dispatch(addConnection());
    })
    .catch(async (err) => {
      await dispatch({
        type: ACCEPT_USER_INVITATION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
export const donateUser = (values, resetForm) => async (dispatch, getState) => {
  dispatch({
    type: DONATE_USER,
  });
  await axios
    .post(`${process.env.HOST}/api/donations/`, values, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DONATE_USER_SUCCESS,
        payload: res.data,
      });
      resetForm({});
    })
    .catch((err) => {
      dispatch({
        type: DONATE_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
