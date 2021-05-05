import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,
  FETCH_MORE_USERS,
  FETCH_MORE_USERS_SUCCESS,
  FETCH_MORE_USERS_FAIL,
  FOLLOW_USER_IN_USERS,
  FOLLOW_USER_IN_USERS_SUCCESS,
  FOLLOW_USER_IN_USERS_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  users: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_fetching_more_users: false,
  is_following_user: false,
  follow_user_error: null,
};
export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_USERS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        users: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_USERS_FAIL:
      return {
        ...state,
        is_loading: false,
        users: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        error: action.payload,
      };
    case FETCH_MORE_USERS:
      return {
        ...state,
        is_fetching_more_users: true,
      };
    case FETCH_MORE_USERS_SUCCESS:
      return {
        ...state,
        is_fetching_more_users: false,
        users: {
          next: action.payload.next,
          results: [...state.users.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_USERS_FAIL:
      return {
        ...state,
        is_fetching_more_users: false,
        error: action.payload,
      };
    case FOLLOW_USER_IN_USERS:
      return {
        ...state,
        is_following_user: true,
      };
    case FOLLOW_USER_IN_USERS_SUCCESS:
      return {
        ...state,
        is_following_user: false,
        users: {
          ...state.users,
          results: state.users.results.map((user) =>
            user.id === action.payload ? { ...user, is_followed: true } : user
          ),
        },
        follow_user_error: null,
      };
    case FOLLOW_USER_IN_USERS_FAIL:
      return {
        ...state,
        is_following_user: false,
        follow_user_error: action.payload,
      };
    default:
      return state;
  }
}
