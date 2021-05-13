import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_CONTRIBUTE_ROOM,
  FETCH_CONTRIBUTE_ROOM_SUCCESS,
  FETCH_CONTRIBUTE_ROOM_FAIL,
  UPDATE_SHARED_NOTES,
  RESET_CONTRIBUTE_ROOM,
  UPDATE_MEMBER_REVIEW,
  UPDATE_MEMBER_REVIEW_SUCCESS,
  UPDATE_MEMBER_REVIEW_FAIL,
} from "../types";

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

export const updateSharedNotes = (shared_notes) => async (dispatch) => {
  dispatch({ type: UPDATE_SHARED_NOTES, payload: shared_notes });
};
export const resetContributeRoom = () => async (dispatch) => {
  dispatch({ type: RESET_CONTRIBUTE_ROOM });
};

export const updateMemberReview =
  async (values, id) => async (dispatch, getState) => {
    await dispatch({
      type: UPDATE_MEMBER_REVIEW,
    });
    await axios
      .patch(
        `${process.env.HOST}/api/posts/${
          getState().contributeRoomReducer.contribute_room?.id
        }/members/${id}/`,
        values,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: UPDATE_MEMBER_REVIEW_SUCCESS,
        });
      })
      .catch(async (err) => {
        await dispatch({
          type: UPDATE_MEMBER_REVIEW_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };
