import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_MEMBERS,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAIL,
  CREATE_MEMBER,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAIL,
  IS_MEMBER_EMAIL_AVAILABLE,
  IS_MEMBER_EMAIL_AVAILABLE_SUCCESS,
  IS_MEMBER_EMAIL_AVAILABLE_FAIL,
  RESET_MEMBER_EMAIL_AVAILABLE,
  REMOVE_MEMBERS,
  REMOVE_MEMBERS_SUCCESS,
  REMOVE_MEMBERS_FAIL,
} from "../types";
import { createAlert } from "./alerts";

export const fetchMembers =
  (search = "") =>
  async (dispatch, getState) => {
    await dispatch({
      type: FETCH_MEMBERS,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .get(
        `${process.env.HOST}/api/${subdomain}/members/?search=${search}`,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: FETCH_MEMBERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_MEMBERS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const fetchMembersPagination = (url) => async (dispatch, getState) => {
  dispatch({
    type: FETCH_MEMBERS,
  });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(url, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: FETCH_MEMBERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_MEMBERS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const createMember =
  (data, resetForm, closeModal) => async (dispatch, getState) => {
    await dispatch({
      type: CREATE_MEMBER,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .post(
        `${process.env.HOST}/api/${subdomain}/members/`,
        data,
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: CREATE_MEMBER_SUCCESS,
          payload: res.data,
        });
        await resetForm({});
        await closeModal();
        await dispatch(createAlert("SUCCESS", "Member succesfully created"));
      })
      .catch(async (err) => {
        await dispatch({
          type: CREATE_MEMBER_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const isMemberEmailAvailable = (email) => async (dispatch, getState) => {
  dispatch({ type: IS_MEMBER_EMAIL_AVAILABLE });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .post(
      `${process.env.HOST}/api/${subdomain}/members/is_member_email_available/`,
      email,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: IS_MEMBER_EMAIL_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: IS_MEMBER_EMAIL_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetMemberEmailAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_MEMBER_EMAIL_AVAILABLE });
};

export const removeMembers =
  (members, resetMembersSelected, handleCloseRemoveMembersModal) =>
  async (dispatch, getState) => {
    await dispatch({
      type: REMOVE_MEMBERS,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .post(
        `${process.env.HOST}/api/${subdomain}/members/remove_members/`,
        { members: members },
        tokenConfig(getState)
      )
      .then(async (res) => {
        await dispatch({
          type: REMOVE_MEMBERS_SUCCESS,
          payload: members,
        });
        await resetMembersSelected({});
        await handleCloseRemoveMembersModal({});
        await dispatch(createAlert("SUCCESS", "Members successfully removed"));
      })
      .catch(async (err) => {
        await dispatch({
          type: REMOVE_MEMBERS_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };
