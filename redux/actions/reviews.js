import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_REVIEWS,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  FETCH_MORE_REVIEWS,
  FETCH_MORE_REVIEWS_SUCCESS,
  FETCH_MORE_REVIEWS_FAIL,
} from "../types";

export const fetchReviews =
  (user = null) =>
  async (dispatch, getState) => {
    await dispatch({
      type: FETCH_REVIEWS,
    });
    console.log(
      `${process.env.HOST}/api/reviews/${user ? user + "/user/" : ""}`
    );
    await axios
      .get(
        `${process.env.HOST}/api/reviews/${user ? user + "/user/" : ""}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        console.log(res.data);
        await dispatch({
          type: FETCH_REVIEWS_SUCCESS,
          payload: res.data,
        });
      })
      .catch(async (err) => {
        await dispatch({
          type: FETCH_REVIEWS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const fetchMoreReviews = () => async (dispatch, getState) => {
  const url = getState().reviewsReducer.reviews.next;
  if (url) {
    dispatch({
      type: FETCH_MORE_REVIEWS,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_REVIEWS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_REVIEWS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};
