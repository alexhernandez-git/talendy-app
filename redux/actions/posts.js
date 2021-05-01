import axios from "axios";
import { tokenConfig } from "./auth";
import { CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from "../types";
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
