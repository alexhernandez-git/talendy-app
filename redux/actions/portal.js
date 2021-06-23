import axios from "axios";
import {
  FETCH_PORTAL,
  FETCH_PORTAL_SUCCESS,
  FETCH_PORTAL_FAIL,
} from "../types";

export const fetchPortal = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_PORTAL,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  console.log("subdomain", subdomain);
  await axios
    .get(`${process.env.HOST}/api/portals/${subdomain}/`)
    .then(async (res) => {
      await dispatch({
        type: FETCH_PORTAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_PORTAL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
