import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_DASHBOARD_COMMUNITIES,
  FETCH_DASHBOARD_COMMUNITIES_SUCCESS,
  FETCH_DASHBOARD_COMMUNITIES_FAIL,
} from "../types";

export const fetchDahboardCommunities =
  (search = "") =>
  async (dispatch, getState) => {
    await dispatch({
      type: FETCH_DASHBOARD_COMMUNITIES,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .get(
        `${process.env.HOST}/api/${subdomain}/communities/?search=${search}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: FETCH_DASHBOARD_COMMUNITIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch(async (err) => {
        await dispatch({
          type: FETCH_DASHBOARD_COMMUNITIES_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const fetchDashboardCommunitiesPagination =
  (url) => async (dispatch, getState) => {
    dispatch({
      type: FETCH_DASHBOARD_COMMUNITIES,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: FETCH_DASHBOARD_COMMUNITIES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_DASHBOARD_COMMUNITIES_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };
