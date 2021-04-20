import axios from "axios";
import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAIL,
  REMOVE_CONNECTION,
  REMOVE_CONNECTION_SUCCESS,
  REMOVE_CONNECTION_FAIL,
} from "../types";
import { tokenConfig } from "./auth";

export const fetchInvitations = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_CONNECTIONS,
  });

  await axios
    .get(`${process.env.HOST}/api/connections/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FETCH_CONNECTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_CONNECTIONS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const removeConnection = (id) => async (dispatch, getState) => {
  await dispatch({
    type: REMOVE_CONNECTION,
  });
  const values = {
    user: id,
  };
  console.log(values);
  await axios
    .delete(
      `${process.env.HOST}/api/connections/remove/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: REMOVE_CONNECTION_SUCCESS,
        payload: id,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: REMOVE_CONNECTION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
