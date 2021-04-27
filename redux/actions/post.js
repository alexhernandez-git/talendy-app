import axios from "axios";
import { tokenConfig } from "./auth";
import { OPEN_POST_MODAL, CLOSE_POST_MODAL } from "../types";

export const openPostModal = () => async (dispatch, getState) => {
  dispatch({ type: OPEN_POST_MODAL });
};

export const closePostModal = () => async (dispatch, getState) => {
  await dispatch({ type: CLOSE_POST_MODAL });
};
