import {
  FETCH_PORTAL,
  FETCH_PORTAL_SUCCESS,
  FETCH_PORTAL_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  portal: null,
  error: null,
};
export default function portalReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_PORTAL:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_PORTAL_SUCCESS:
      return {
        ...state,
        is_loading: false,
        portal: action.payload,
        error: null,
      };
    case FETCH_PORTAL_FAIL:
      return {
        ...state,
        is_loading: false,

        error: action.payload,
      };

    default:
      return state;
  }
}
