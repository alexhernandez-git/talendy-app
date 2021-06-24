import axios from "axios";
import {
  FETCH_PORTAL,
  FETCH_PORTAL_SUCCESS,
  FETCH_PORTAL_FAIL,
  UPDATE_PORTAL,
  UPDATE_PORTAL_SUCCESS,
  UPDATE_PORTAL_FAIL,
  IS_NAME_AVAILABLE,
  IS_NAME_AVAILABLE_SUCCESS,
  IS_NAME_AVAILABLE_FAIL,
  IS_URL_AVAILABLE,
  IS_URL_AVAILABLE_SUCCESS,
  IS_URL_AVAILABLE_FAIL,
  RESET_NAME_AVAILABLE,
  RESET_URL_AVAILABLE,
} from "../types";
import { createAlert } from "./alerts";
import { tokenConfig } from "./auth";

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

export const isNameAvailable = (values) => async (dispatch, getState) => {
  await dispatch({ type: IS_NAME_AVAILABLE });
  await axios
    .post(`${process.env.HOST}/api/portals/is_name_available/`, values)
    .then(async (res) => {
      await dispatch({
        type: IS_NAME_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: IS_NAME_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
export const resetNameAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_NAME_AVAILABLE });
};

export const isUrlAvailable = (values) => async (dispatch, getState) => {
  await dispatch({ type: IS_URL_AVAILABLE });
  await axios
    .post(`${process.env.HOST}/api/portals/is_url_available/`, values)
    .then(async (res) => {
      await dispatch({
        type: IS_URL_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: IS_URL_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetUrlAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_URL_AVAILABLE });
};

export const updatePortal = (portal) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PORTAL });
  await axios
    .patch(
      `${process.env.HOST}/api/portals/${getState().portalReducer.portal.url}/`,
      portal,
      tokenConfig(getState)
    )
    .then(async (res) => {
      console.log(res);
      await dispatch({
        type: UPDATE_PORTAL_SUCCESS,
        payload: res.data,
      });

      await dispatch(resetNameAvailable());
      await dispatch(resetUrlAvailable());
      await dispatch(createAlert("SUCCESS", "Portal succesfully updated"));
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PORTAL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const updatePortaLogo = (logo) => async (dispatch, getState) => {
  const fd = new FormData();
  fd.append("logo", logo, logo.name);
  dispatch({ type: UPDATE_PORTAL });
  await axios
    .patch(
      `${process.env.HOST}/api/portals/${getState().portalReducer.portal.url}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_PORTAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PORTAL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
