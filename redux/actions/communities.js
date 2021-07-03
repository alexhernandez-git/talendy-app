import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_COMMUNITIES,
  FETCH_COMMUNITIES_SUCCESS,
  FETCH_COMMUNITIES_FAIL,
} from "../types";

export const fetchCommunities = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_COMMUNITIES,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/communities/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_COMMUNITIES_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_COMMUNITIES_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
