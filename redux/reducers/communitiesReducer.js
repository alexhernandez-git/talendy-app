import {
  FETCH_COMMUNITIES,
  FETCH_COMMUNITIES_SUCCESS,
  FETCH_COMMUNITIES_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  communities: [],
  error: null,
};
export default function communitiesReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_COMMUNITIES:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_COMMUNITIES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        communities: action.payload,
        error: null,
      };
    case FETCH_COMMUNITIES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
