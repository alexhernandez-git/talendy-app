import {
  FETCH_TOP_KARMA_USERS,
  FETCH_TOP_KARMA_USERS_SUCCESS,
  FETCH_TOP_KARMA_USERS_FAIL,
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

    default:
      return state;
  }
}
