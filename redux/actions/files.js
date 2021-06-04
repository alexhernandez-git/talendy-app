import axios from "axios";

import {
  FILES_FETCH,
  FILES_SUCCESS,
  FILES_FAIL,
  EDIT_FILE,
  EDIT_FILE_FAIL,
  EDIT_FILE_SUCCESS,
  CREATE_FILE,
  CREATE_FILE_FAIL,
  CREATE_FILE_SUCCESS,
  DELETE_FILE,
  DELETE_FILE_FAIL,
  DELETE_FILE_SUCCESS,
} from "../types";
import { createAlert } from "./alerts";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFiles =
  (search = "") =>
  async (dispatch, getState) => {
    // User Loading
    await dispatch({ type: FILES_FETCH });
    let current_folder = "";
    if (getState().foldersReducer.current_folders.length > 0) {
      current_folder =
        getState().foldersReducer.current_folders[
          getState().foldersReducer.current_folders.length - 1
        ];
    }
    await axios
      .get(
        `${process.env.HOST}/api/posts/${
          getState().collaborateRoomReducer.collaborate_room?.id
        }/files/?search=${search}&top_folder=${current_folder}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: FILES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FILES_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const editFile = (file) => async (dispatch, getState) => {
  await dispatch({
    type: EDIT_FILE,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/files/${file.id}/`,
      file,
      tokenConfig(getState)
    )
    .then(async (res) => {
      console.log("res", res);

      await dispatch({
        type: EDIT_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_FILE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const createFile = (file) => async (dispatch, getState) => {
  await dispatch({
    type: CREATE_FILE,
  });
  const fd = new FormData();
  fd.append("name", file.file.name);
  fd.append("file", file.file, Math.random().toString(36) + file.file.name);
  if (getState().foldersReducer.current_folders.length > 0) {
    fd.append(
      "top_folder",
      getState().foldersReducer.current_folders[
        getState().foldersReducer.current_folders.length - 1
      ]
    );
  }

  await axios
    .post(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/files/`,
      fd,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: CREATE_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_FILE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const deleteFiles = (id) => (dispatch, getState) => {
  dispatch({
    type: DELETE_FILE,
    payload: id,
  });

  axios
    .delete(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/files/${id}/`,
      tokenConfig(getState)
    )
    .then(() => {
      dispatch({
        type: DELETE_FILE_SUCCESS,
      });
      dispatch(createAlert("SUCCESS", "File deleted successfully"));
    })
    .catch((err) => {
      dispatch({
        type: DELETE_FILE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const editSharedUsersFile = (file) => (dispatch, getState) => {
  dispatch({
    type: EDIT_FILE,
  });
  axios
    .patch(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/files/${file.id}/update_shared_users/`,
      file,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("res", res);

      dispatch({
        type: EDIT_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_FILE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
