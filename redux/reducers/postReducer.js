import { FETCH_POST, FETCH_POST_SUCCESS, FETCH_POST_FAIL } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  post: null,
  error: null,
};
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_POST:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_POST_SUCCESS:
      return {
        ...state,
        is_loading: false,
        post: action.payload,
        error: null,
      };
    case FETCH_POST_FAIL:
      return {
        ...state,
        is_loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
}
