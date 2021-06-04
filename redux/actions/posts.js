import axios from "axios";
import {
  addCreatedActivePostCount,
  addCreatedPostCount,
  addKarmaAmount,
  addPostCount,
  substractCreatedActivePostCount,
  substractCreatedPostCount,
  substractCreatedSolvedPostCount,
  substractKarmaAmount,
  substractPostCount,
  tokenConfig,
} from "./auth";
import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_MORE_POSTS,
  FETCH_MORE_POSTS_SUCCESS,
  FETCH_MORE_POSTS_FAIL,
  CREATE_CONTRIBUTE_REQUEST,
  CREATE_CONTRIBUTE_REQUEST_SUCCESS,
  CREATE_CONTRIBUTE_REQUEST_FAIL,
} from "../types";
import { createAlert } from "./alerts";
import useGetFetchPostsRequest from "hooks/useGetFetchPostsRequest";

export const createPost =
  (data, resetForm, closeModal, handleResetImages) =>
  async (dispatch, getState) => {
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
        await dispatch(substractKarmaAmount(res.data?.karma_offered));
        await resetForm({});
        await closeModal();
        await handleResetImages();
        await dispatch(addPostCount());
        await dispatch(addCreatedPostCount());
        await dispatch(addCreatedActivePostCount());
        await dispatch(createAlert("SUCCESS", "Post succesfully created"));
      })
      .catch(async (err) => {
        await dispatch({
          type: CREATE_POST_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const updatePost =
  (id, data, resetForm, closeModal, handleResetImages) =>
  async (dispatch, getState) => {
    await dispatch({
      type: UPDATE_POST,
    });
    console.log("entra update post");
    await axios
      .patch(
        `${process.env.HOST}/api/posts/${id}/`,
        data,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: UPDATE_POST_SUCCESS,
          payload: res.data,
        });
        await resetForm({});
        await closeModal();
        await handleResetImages();
        await dispatch(createAlert("SUCCESS", "Post succesfully updated"));
      })
      .catch(async (err) => {
        await dispatch({
          type: UPDATE_POST_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const deletePost = (post, closeModal) => async (dispatch, getState) => {
  await dispatch({
    type: DELETE_POST,
  });
  console.log("entra update post");
  await axios
    .delete(`${process.env.HOST}/api/posts/${post?.id}/`, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: DELETE_POST_SUCCESS,
        payload: post?.id,
      });
      await dispatch(addKarmaAmount(post?.karma_offered));

      await closeModal();
      await dispatch(substractPostCount());
      await dispatch(substractCreatedPostCount());
      if (post?.status === "AC") {
        await dispatch(substractCreatedActivePostCount());
      } else if (post?.status === "SO") {
        await dispatch(substractCreatedSolvedPostCount());
      }
      await dispatch(createAlert("SUCCESS", "Post succesfully deleted"));
    })
    .catch(async (err) => {
      await dispatch({
        type: DELETE_POST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
      if (err.response?.data?.message) {
        await dispatch(createAlert("ERROR", err.response?.data?.message));
      }
    });
};

export const fetchPosts = (page, filters) => async (dispatch, getState) => {
  const url = useGetFetchPostsRequest(page, filters?.user);
  await dispatch({
    type: FETCH_POSTS,
  });

  const search = filters?.search ? filters.search : "";
  const community = filters?.community ? filters.community : "";
  const status = filters?.status ? filters.status : "";

  await axios
    .get(
      `${process.env.HOST}/api/${url}/?search=${search}&community=${community}&status=${status}`,
      getState().authReducer.is_authenticated ? tokenConfig(getState) : null
    )
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

export const fetchMorePosts = () => async (dispatch, getState) => {
  const url = getState().postsReducer.posts.next;
  console.log(getState().postsReducer.posts.next);
  if (url) {
    dispatch({
      type: FETCH_MORE_POSTS,
    });
    await axios
      .get(url, tokenConfig(getState))
      .then(async (res) => {
        await dispatch({
          type: FETCH_MORE_POSTS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MORE_POSTS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  }
};

export const createContributeRequest =
  (values, resetForm) => async (dispatch, getState) => {
    await dispatch({
      type: CREATE_CONTRIBUTE_REQUEST,
    });

    await axios
      .post(
        `${process.env.HOST}/api/collaborate-requests/`,
        values,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: CREATE_CONTRIBUTE_REQUEST_SUCCESS,
          payload: values.post,
        });

        await resetForm({});
        await dispatch(createAlert("SUCCESS", "Request successfully created"));
      })
      .catch(async (err) => {
        await dispatch({
          type: CREATE_CONTRIBUTE_REQUEST_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
        if (err.response?.data?.non_field_errors?.length > 0) {
          await dispatch(
            createAlert("ERROR", err.response?.data?.non_field_errors[0])
          );
        }
      });
  };
