import axios from "axios";
import {
  FETCH_TOP_KARMA_USERS,
  FETCH_TOP_KARMA_USERS_SUCCESS,
  FETCH_TOP_KARMA_USERS_FAIL,
  FOLLOW_TOP_KARMA_USER,
  FOLLOW_TOP_KARMA_USER_SUCCESS,
  FOLLOW_TOP_KARMA_USER_FAIL,
} from "../types";
import { tokenConfig } from "./auth";

export const fetchTopKarmaUsers = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_TOP_KARMA_USERS,
  });
  await axios
    .get(
      `${process.env.HOST}/api/users/list_users_with_most_karma/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: FETCH_TOP_KARMA_USERS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_TOP_KARMA_USERS_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const followTopKarmaUser = (id) => async (dispatch, getState) => {
  await dispatch({
    type: FOLLOW_TOP_KARMA_USER,
  });
  const values = {
    followed_user: id,
  };
  console.log(values);
  await axios
    .post(`${process.env.HOST}/api/follows/`, values, tokenConfig(getState))
    .then(async (res) => {
      await dispatch({
        type: FOLLOW_TOP_KARMA_USER_SUCCESS,
        payload: id,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FOLLOW_TOP_KARMA_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

// export const unfollowTopKarmaUser = (id) => async (dispatch, getState) => {
//   await dispatch({
//     type: UNFOLLOW_TOP_KARMA_USER,
//   });
//   const values = {
//     followed_user: id,
//   };
//   await axios
//     .post(
//       `${process.env.HOST}/api/follows/unfollow/`,
//       values,
//       tokenConfig(getState)
//     )
//     .then(async (res) => {
//       await dispatch({
//         type: UNFOLLOW_TOP_KARMA_USER_SUCCESS,
//         payload: id,
//       });
//     })
//     .catch(async (err) => {
//       await dispatch({
//         type: UNFOLLOW_TOP_KARMA_USER_FAIL,
//         payload: { data: err.response?.data, status: err.response?.status },
//       });
//     });
// };
