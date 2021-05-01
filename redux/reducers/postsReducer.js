import { CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAIL } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  posts: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_creating_post: false,
  create_post_error: null,
};
export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case CREATE_POST:
      return {
        ...state,
        is_creating_post: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        is_creating_post: false,
        create_post_error: null,
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        is_creating_post: false,
        create_post_error: action.payload,
      };
    default:
      return state;
  }
}
