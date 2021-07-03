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
  UPDATE_SOLUTION,
  UPDATE_SOLUTION_SUCCESS,
  UPDATE_SOLUTION_FAIL,
  UPDATE_KARMA_WINNER,
  UPDATE_KARMA_WINNER_SUCCESS,
  UPDATE_KARMA_WINNER_FAIL,
  FINALIZE_POST,
  FINALIZE_POST_SUCCESS,
  FINALIZE_POST_FAIL,
  STOP_COLLABORATING,
  STOP_COLLABORATING_SUCCESS,
  STOP_COLLABORATING_FAIL,
} from "../types";
import { createAlert } from "./alerts";

export const fetchContributeRoom = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_CONTRIBUTE_ROOM,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/posts/${id}/retrieve_collaborate_room/`,
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
  (values, id) => async (dispatch, getState) => {
    await dispatch({
      type: UPDATE_MEMBER_REVIEW,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .patch(
        `${process.env.HOST}/api/${subdomain}/posts/${
          getState().collaborateRoomReducer.collaborate_room?.id
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

export const updateSolution = (values) => async (dispatch, getState) => {
  await dispatch({
    type: UPDATE_SOLUTION,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/update_solution/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: UPDATE_SOLUTION_SUCCESS,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: UPDATE_SOLUTION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const updateKarmaWinner = (values) => async (dispatch, getState) => {
  await dispatch({
    type: UPDATE_KARMA_WINNER,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/update_karma_winner/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: UPDATE_KARMA_WINNER_SUCCESS,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: UPDATE_KARMA_WINNER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
export const stopCollaborating = (router) => async (dispatch, getState) => {
  await dispatch({
    type: STOP_COLLABORATING,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/stop_collaborating/`,
      { stop_collaborating_user: getState().authReducer.user?.id },
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: STOP_COLLABORATING_SUCCESS,
        payload: res.data,
      });
      await router.push("/feed");
      await dispatch(
        createAlert("SUCCESS", "You have stopped collaborating on this post")
      );
    })
    .catch(async (err) => {
      await dispatch({
        type: STOP_COLLABORATING_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
      dispatch(createAlert("ERROR", "Something went wrong"));
    });
};

export const finalizePost =
  (handleGoToRoomPage) => async (dispatch, getState) => {
    await dispatch({
      type: FINALIZE_POST,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .patch(
        `${process.env.HOST}/api/${subdomain}/posts/${
          getState().collaborateRoomReducer.collaborate_room?.id
        }/finalize/`,
        {},
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: FINALIZE_POST_SUCCESS,
        });
        await handleGoToRoomPage();
        await dispatch(createAlert("SUCCESS", "Posts successfully solved"));
      })
      .catch(async (err) => {
        await dispatch({
          type: FINALIZE_POST_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
        dispatch(
          createAlert("ERROR", "Something went wrong at finalizing the post")
        );
      });
  };
