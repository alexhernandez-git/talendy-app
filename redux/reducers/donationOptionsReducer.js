import {
  FETCH_DONATION_OPTIONS,
  FETCH_DONATION_OPTIONS_SUCCESS,
  FETCH_DONATION_OPTIONS_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  options: [],
  error: null,
};
export default function donationOptionsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.donationOptionsReducer };
    case FETCH_DONATION_OPTIONS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_DONATION_OPTIONS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        options: action.payload,
        error: null,
      };
    case FETCH_DONATION_OPTIONS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
