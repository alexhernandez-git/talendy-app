import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_EARNINGS,
  FETCH_EARNINGS_SUCCESS,
  FETCH_EARNINGS_FAIL,
  WITHDRAW_FUNDS,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS_FAIL,
  SET_NEW_EARNINGS_TO_USER,
} from "../types";
import { createAlert } from "./alerts";

export const fetchEarnings = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_EARNINGS,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/earnings/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_EARNINGS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_EARNINGS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const fetchEarningsPagination = (url) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_EARNINGS,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FETCH_EARNINGS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_EARNINGS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const withdrawFounds =
  (values, resetForm, handleCloseWithdrawFunds) =>
  async (dispatch, getState) => {
    await dispatch({
      type: WITHDRAW_FUNDS,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .post(
        `${process.env.HOST}/api/${subdomain}/earnings/withdraw_funds/`,
        values,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: WITHDRAW_FUNDS_SUCCESS,
          payload: res.data,
        });
        await dispatch({
          type: SET_NEW_EARNINGS_TO_USER,
          payload: res.data?.amount,
        });
        await resetForm({});
        await handleCloseWithdrawFunds();
      })
      .catch(async (err) => {
        dispatch(createAlert("ERROR", "Withrawn error, please contact us"));
        await dispatch({
          type: WITHDRAW_FUNDS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };
