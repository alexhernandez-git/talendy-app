import axios from "axios";

import {
  MOVE_FOLDERS_FETCH,
  MOVE_FOLDERS_SUCCESS,
  MOVE_FOLDERS_FAIL,
  SET_CURRENT_MOVE_FOLDER,
  REMOVE_CURRENT_MOVE_FOLDER,
  MOVE_FOLDER,
  MOVE_FOLDER_SUCCESS,
  MOVE_FOLDER_FAIL,
  MOVE_FILE,
  MOVE_FILE_SUCCESS,
  MOVE_FILE_FAIL,
} from "../types";

import { tokenConfig } from "./auth";
import { fetchFiles as fetchAdminFiles } from "./files";
import { fetchFolders as fetchAdminFolders } from "./folders";

// CHECK TOKEN & LOAD USER
export const fetchFolders =
  (search = "") =>
  async (dispatch, getState) => {
    // User Loading
    await dispatch({ type: MOVE_FOLDERS_FETCH });
    let current_folder = "";
    if (getState().moveFoldersReducer.current_folders.length > 0) {
      current_folder =
        getState().moveFoldersReducer.current_folders[
          getState().moveFoldersReducer.current_folders.length - 1
        ];
    }
    await axios
      .get(
        `${process.env.HOST}/api/posts/${
          getState().collaborateRoomReducer.collaborate_room?.id
        }/folders/?search=${search}&top_folder=${current_folder}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: MOVE_FOLDERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: MOVE_FOLDERS_FAIL,
          payload: { data: err?.response?.data, status: err?.response?.status },
        });
      });
  };

export const setCurrentFolder = (id) => async (dispatch, getState) => {
  dispatch({
    type: SET_CURRENT_MOVE_FOLDER,
    payload: id,
  });
};
export const removeCurrentFolder = () => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CURRENT_MOVE_FOLDER,
  });
};

export const moveFolder = (folder) => async (dispatch, getState) => {
  // User Loading
  await dispatch({ type: MOVE_FOLDER });

  await axios
    .patch(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/folders/${folder.id}/update_top_folder/`,
      folder,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch(fetchAdminFolders());
      await dispatch(fetchAdminFiles());
      await dispatch({
        type: MOVE_FOLDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVE_FOLDER_FAIL,
        payload: { data: err?.response?.data, status: err?.response?.status },
      });
    });
};

export const moveFile = (file) => async (dispatch, getState) => {
  // User Loading
  await dispatch({ type: MOVE_FILE });
  await axios
    .patch(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/files/${file.id}/update_top_folder/`,
      file,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch(fetchAdminFolders());
      await dispatch(fetchAdminFiles());
      await dispatch({
        type: MOVE_FILE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: MOVE_FILE_FAIL,
        payload: { data: err?.response?.data, status: err?.response?.status },
      });
    });
};
