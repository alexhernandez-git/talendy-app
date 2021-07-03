import axios from "axios";
import { tokenConfig } from "./auth";
import {
  FETCH_MEMBERS,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAIL,
  CREATE_MEMBER,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAIL,
} from "../types";
import { createAlert } from "./alerts";

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
