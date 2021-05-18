import {
  FETCH_DONATIONS,
  FETCH_DONATIONS_SUCCESS,
  FETCH_DONATIONS_FAIL,
  FETCH_MORE_DONATIONS,
  FETCH_MORE_DONATIONS_SUCCESS,
  FETCH_MORE_DONATIONS_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  donations: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_fetching_more_donations: false,
};
export default function donationsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_DONATIONS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_DONATIONS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        donations: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_DONATIONS_FAIL:
      return {
        ...state,
        is_loading: false,
        donations: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        error: action.payload,
      };
    case FETCH_MORE_DONATIONS:
      return {
        ...state,
        is_fetching_more_donations: true,
      };
    case FETCH_MORE_DONATIONS_SUCCESS:
      return {
        ...state,
        is_fetching_more_donations: false,
        donations: {
          next: action.payload.next,
          results: [...state.donations.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_DONATIONS_FAIL:
      return {
        ...state,
        is_fetching_more_donations: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
