import {
  FETCH_DASHBOARD_POSTS,
  FETCH_DASHBOARD_POSTS_SUCCESS,
  FETCH_DASHBOARD_POSTS_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  posts: {
    results: [],
    count: 0,
    next: [],
    previous: [],
  },
  error: null,
};
export default function dashboardCommunitiesReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_DASHBOARD_POSTS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_DASHBOARD_POSTS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        posts: action.payload,
        error: null,
      };
    case FETCH_DASHBOARD_POSTS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
