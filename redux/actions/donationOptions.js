import axios from "axios";
import {
  FETCH_DONATION_OPTIONS,
  FETCH_DONATION_OPTIONS_SUCCESS,
  FETCH_DONATION_OPTIONS_FAIL,
} from "../types";

export const fetchDonationOptions = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_DONATION_OPTIONS,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(`${process.env.HOST}/api/${subdomain}/donation-options/`)
    .then(async (res) => {
      await dispatch({
        type: FETCH_DONATION_OPTIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_DONATION_OPTIONS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
