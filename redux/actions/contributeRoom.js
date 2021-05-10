import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_CONTRIBUTE_ROOM,
  FETCH_CONTRIBUTE_ROOM_SUCCESS,
  FETCH_CONTRIBUTE_ROOM_FAIL,
} from "../types";
import { createAlert } from "./alerts";

export const fetchContributeRoom = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_CONTRIBUTE_ROOM,
  });
  await axios
    .get(
      `${process.env.HOST}/api/posts/${id}/retrieve_contribute_room/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_CONTRIBUTE_ROOM_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_CONTRIBUTE_ROOM_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
