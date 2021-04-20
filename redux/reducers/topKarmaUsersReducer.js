import {
  FETCH_TOP_KARMA_USERS,
  FETCH_TOP_KARMA_USERS_SUCCESS,
  FETCH_TOP_KARMA_USERS_FAIL,
  FOLLOW_TOP_KARMA_USER,
  FOLLOW_TOP_KARMA_USER_SUCCESS,
  FOLLOW_TOP_KARMA_USER_FAIL,
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
  is_following_user: false,
  follow_user_error: null,
};
export default function topKarmaUsersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_KARMA_USERS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_TOP_KARMA_USERS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        users: action.payload,
        error: null,
      };
    case FETCH_TOP_KARMA_USERS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case FOLLOW_TOP_KARMA_USER:
      return {
        ...state,
        is_following_user: true,
      };
    case FOLLOW_TOP_KARMA_USER_SUCCESS:
      console.log(action.payload);

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
    case FOLLOW_TOP_KARMA_USER_FAIL:
      return {
        ...state,
        is_following_user: false,
        follow_user_error: action.payload,
      };
    // case STOP_FOLLOWING_TOP_KARMA_USER:
    //   return {
    //     ...state,
    //     is_unfollowing_user: true,
    //   };
    // case STOP_FOLLOWING_TOP_KARMA_USER_SUCCESS:
    //   return {
    //     ...state,
    //     is_unfollowing_user: false,
    //     users: {
    //       ...state.users,
    //       results: state.users.results.map((user) =>
    //         user.id === action.payload ? { ...user, is_followed: false } : user
    //       ),
    //     },
    //     unfollow_user_error: null,
    //   };
    // case STOP_FOLLOWING_TOP_KARMA_USER_FAIL:
    //   return {
    //     ...state,
    //     is_unfollowing_user: false,
    //     unfollow_user_error: action.payload,
    //   };
    default:
      return state;
  }
}
