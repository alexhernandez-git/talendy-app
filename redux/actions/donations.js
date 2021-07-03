import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_DONATIONS,
  FETCH_DONATIONS_SUCCESS,
  FETCH_DONATIONS_FAIL,
  FETCH_MORE_DONATIONS,
  FETCH_MORE_DONATIONS_SUCCESS,
  FETCH_MORE_DONATIONS_FAIL,
} from "../types";

export const fetchDonations = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_DONATIONS,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/donations/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      console.log(res.data);
      await dispatch({
        type: FETCH_DONATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_DONATIONS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const fetchMoreDonations = () => async (dispatch, getState) => {
  const url = getState().donationsReducer.donations.next;
  if (url) {
    dispatch({
      type: FETCH_MORE_DONATIONS,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_DONATIONS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_DONATIONS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};
