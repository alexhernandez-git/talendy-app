import axios from "axios";
import { tokenConfig } from "./auth";
import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
} from "../types";
import { createAlert } from "./alerts";

export const createPost = (
  data,
  resetForm,
  closeModal,
  handleResetImages
) => async (dispatch, getState) => {
  await dispatch({
    type: CREATE_POST,
  });
  await axios
    .post(`${process.env.HOST}/api/posts/`, data, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: CREATE_POST_SUCCESS,
        payload: res.data,
      });
      await resetForm({});
      await closeModal();
      await handleResetImages();
      await dispatch(createAlert("SUCCESS", "Post succesfully created"));
    })
    .catch(async (err) => {
      await dispatch({
        type: CREATE_POST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const fetchPosts = (search = "") => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_POSTS,
  });
  await axios
    .get(`${process.env.HOST}/api/posts/?search=${search}`)
    .then(async (res) => {
      await dispatch({
        type: FETCH_POSTS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_POSTS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
