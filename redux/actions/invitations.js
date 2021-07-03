import axios from "axios";
import {
  FETCH_INVITATIONS,
  FETCH_INVITATIONS_SUCCESS,
  FETCH_INVITATIONS_FAIL,
  ACCEPT_INVITATION,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAIL,
  IGNORE_INVITATION,
  IGNORE_INVITATION_SUCCESS,
  IGNORE_INVITATION_FAIL,
} from "../types";
import { createAlert } from "./alerts";
import { addConnection, substractInvitation, tokenConfig } from "./auth";

export const fetchInvitations = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_INVITATIONS,
  });

  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(
      `${process.env.HOST}/api/${subdomain}/connections/list_invitations/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_INVITATIONS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_INVITATIONS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const acceptInvitation = (id) => async (dispatch, getState) => {
  await dispatch({
    type: ACCEPT_INVITATION,
  });
  const values = {
    requester: id,
  };
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/connections/accept/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: ACCEPT_INVITATION_SUCCESS,
        payload: id,
      });
      await dispatch(substractInvitation());
      await dispatch(addConnection());
      await dispatch(createAlert("SUCCESS", "Invitation accepted"));
    })
    .catch(async (err) => {
      await dispatch({
        type: ACCEPT_INVITATION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const ignoreInvitation = (id) => async (dispatch, getState) => {
  await dispatch({
    type: IGNORE_INVITATION,
  });
  const values = {
    requester: id,
  };
  console.log(values);
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/connections/ignore/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: IGNORE_INVITATION_SUCCESS,
        payload: id,
      });
      await dispatch(substractInvitation());
    })
    .catch(async (err) => {
      await dispatch({
        type: IGNORE_INVITATION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
