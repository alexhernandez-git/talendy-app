import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_CONTRIBUTE_REQUESTS,
  FETCH_CONTRIBUTE_REQUESTS_SUCCESS,
  FETCH_CONTRIBUTE_REQUESTS_FAIL,
  FETCH_MORE_CONTRIBUTE_REQUESTS,
  FETCH_MORE_CONTRIBUTE_REQUESTS_SUCCESS,
  FETCH_MORE_CONTRIBUTE_REQUESTS_FAIL,
  FETCH_CONTRIBUTE_REQUEST,
  FETCH_CONTRIBUTE_REQUEST_SUCCESS,
  FETCH_CONTRIBUTE_REQUEST_FAIL,
  ACCEPT_CONTRIBUTE_REQUEST,
  ACCEPT_CONTRIBUTE_REQUEST_SUCCESS,
  ACCEPT_CONTRIBUTE_REQUEST_FAIL,
  IGNORE_CONTRIBUTE_REQUEST,
  IGNORE_CONTRIBUTE_REQUEST_SUCCESS,
  IGNORE_CONTRIBUTE_REQUEST_FAIL,
} from "../types";

import { createAlert } from "./alerts";

export const fetchContributeRequests = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_CONTRIBUTE_REQUESTS,
  });
  await axios
    .get(`${process.env.HOST}/api/contribute-requests/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FETCH_CONTRIBUTE_REQUESTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_CONTRIBUTE_REQUESTS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const fetchContributeRequest = (contribute_request__pk) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: FETCH_CONTRIBUTE_REQUEST,
  });
  await axios
    .get(
      `${process.env.HOST}/api/contribute-requests/${contribute_request__pk}/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      try {
        await dispatch({
          type: FETCH_CONTRIBUTE_REQUEST_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_CONTRIBUTE_REQUEST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const fetchMoreContributeRequests = () => async (dispatch, getState) => {
  const url = getState().contributeRequestsReducer.contribute_requests.next;
  console.log(getState().contributeRequestsReducer.contribute_requests.next);
  if (url) {
    dispatch({
      type: FETCH_MORE_CONTRIBUTE_REQUESTS,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_CONTRIBUTE_REQUESTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_CONTRIBUTE_REQUESTS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};

export const acceptContributeRequest = (contribute_request__pk) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: ACCEPT_CONTRIBUTE_REQUEST,
  });
  await axios
    .get(
      `${process.env.HOST}/api/contribute-requests/${contribute_request__pk}/accept/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      try {
        await dispatch({
          type: ACCEPT_CONTRIBUTE_REQUEST_SUCCESS,
          payload: contribute_request__pk,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch(async (err) => {
      await dispatch({
        type: ACCEPT_CONTRIBUTE_REQUEST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const ignoreContributeRequest = (contribute_request__pk) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: IGNORE_CONTRIBUTE_REQUEST,
  });
  await axios
    .delete(
      `${process.env.HOST}/api/contribute-requests/${contribute_request__pk}/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      try {
        await dispatch({
          type: IGNORE_CONTRIBUTE_REQUEST_SUCCESS,
          payload: contribute_request__pk,
        });
      } catch (error) {
        console.log(error);
      }
    })
    .catch(async (err) => {
      await dispatch({
        type: IGNORE_CONTRIBUTE_REQUEST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
