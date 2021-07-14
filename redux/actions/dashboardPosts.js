import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_DASHBOARD_POSTS,
  FETCH_DASHBOARD_POSTS_SUCCESS,
  FETCH_DASHBOARD_POSTS_FAIL,
} from "../types";
import { createAlert } from "./alerts";

export const fetchDahboardPosts =
  (search = "") =>
  async (dispatch, getState) => {
    await dispatch({
      type: FETCH_DASHBOARD_POSTS,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .get(
        `${process.env.HOST}/api/${subdomain}/posts/?search=${search}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        console.log("comm", res.data);
        await dispatch({
          type: FETCH_DASHBOARD_POSTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(async (err) => {
        await dispatch({
          type: FETCH_DASHBOARD_POSTS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const fetchDashboardPostsPagination =
  (url) => async (dispatch, getState) => {
    dispatch({
      type: FETCH_DASHBOARD_POSTS,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then((res) => {
        dispatch({
          type: FETCH_DASHBOARD_POSTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_DASHBOARD_POSTS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };
