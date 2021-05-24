import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_POST,
  FETCH_POST_SUCCESS,
  FETCH_POST_FAIL,
  CREATE_POST_CONTRIBUTE_REQUEST,
  CREATE_POST_CONTRIBUTE_REQUEST_SUCCESS,
  CREATE_POST_CONTRIBUTE_REQUEST_FAIL,
} from "../types";
import { createAlert } from "./alerts";

export const fetchPost = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_POST,
  });
  await axios
    .get(
      `${process.env.HOST}/api/posts/${id}/`,
      getState().authReducer.is_authenticated ? tokenConfig(getState) : null
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_POST_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_POST_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const createPostContributeRequest =
  (values, resetForm) => async (dispatch, getState) => {
    await dispatch({
      type: CREATE_POST_CONTRIBUTE_REQUEST,
    });

    await axios
      .post(
        `${process.env.HOST}/api/collaborate-requests/`,
        values,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: CREATE_POST_CONTRIBUTE_REQUEST_SUCCESS,
          payload: values.post,
        });
        await resetForm({});
        await dispatch(createAlert("SUCCESS", "Request successfully created"));
      })
      .catch(async (err) => {
        await dispatch({
          type: CREATE_POST_CONTRIBUTE_REQUEST_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
        console.log(err.response?.data);
        if (err.response?.data?.non_field_errors?.length > 0) {
          await dispatch(
            createAlert("ERROR", err.response?.data?.non_field_errors[0])
          );
        }
      });
  };
