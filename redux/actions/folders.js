import axios from "axios";
import {
  FOLDERS_FETCH,
  FOLDERS_SUCCESS,
  FOLDERS_FAIL,
  EDIT_FOLDER,
  EDIT_FOLDER_FAIL,
  EDIT_FOLDER_SUCCESS,
  CREATE_FOLDER,
  CREATE_FOLDER_FAIL,
  CREATE_FOLDER_SUCCESS,
  DELETE_FOLDER,
  DELETE_FOLDER_FAIL,
  DELETE_FOLDER_SUCCESS,
  SET_CURRENT_FOLDER,
  REMOVE_CURRENT_FOLDER,
} from "../types";
import { createAlert } from "./alerts";

import { tokenConfig } from "./auth";

// CHECK TOKEN & LOAD USER
export const fetchFolders =
  (search = "") =>
  async (dispatch, getState) => {
    // User Loading
    await dispatch({ type: FOLDERS_FETCH });
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
        }/folders/?search=${search}&top_folder=${current_folder}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: FOLDERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FOLDERS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const editFolder = (folder) => async (dispatch, getState) => {
  await dispatch({
    type: EDIT_FOLDER,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/folders/${folder.id}/`,
      folder,
      tokenConfig(getState)
    )
    .then(async (res) => {
      console.log("res", res);

      await dispatch({
        type: EDIT_FOLDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: EDIT_FOLDER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const createFolder = () => async (dispatch, getState) => {
  await dispatch({
    type: CREATE_FOLDER,
  });
  let folder = {
    name: "Nueva Carpeta",
  };
  if (getState().foldersReducer.current_folders.length > 0) {
    folder.top_folder =
      getState().foldersReducer.current_folders[
        getState().foldersReducer.current_folders.length - 1
      ];
  }
  await axios
    .post(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/folders/`,
      folder,
      tokenConfig(getState)
    )
    .then(async (res) => {
      res.data.is_editing = true;
      console.log("res.data", res.data);
      await dispatch({
        type: CREATE_FOLDER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: CREATE_FOLDER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const deleteFolders = (id) => async (dispatch, getState) => {
  await dispatch({
    type: DELETE_FOLDER,
    payload: id,
  });

  await axios
    .delete(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/folders/${id}/`,
      tokenConfig(getState)
    )
    .then(async () => {
      await dispatch({
        type: DELETE_FOLDER_SUCCESS,
      });
      await dispatch(createAlert("SUCCESS", "Folder deleted successfully"));
    })
    .catch((err) => {
      dispatch({
        type: DELETE_FOLDER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const setCurrentFolder = (id) => async (dispatch, getState) => {
  await dispatch({
    type: SET_CURRENT_FOLDER,
    payload: id,
  });
};
export const removeCurrentFolder = () => async (dispatch, getState) => {
  await dispatch({
    type: REMOVE_CURRENT_FOLDER,
  });
};
