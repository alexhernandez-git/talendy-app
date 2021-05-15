import {
  FETCH_REVIEWS,
  FETCH_REVIEWS_SUCCESS,
  FETCH_REVIEWS_FAIL,
  FETCH_MORE_REVIEWS,
  FETCH_MORE_REVIEWS_SUCCESS,
  FETCH_MORE_REVIEWS_FAIL,
  FOLLOW_USER_IN_REVIEWS,
  FOLLOW_USER_IN_REVIEWS_SUCCESS,
  FOLLOW_USER_IN_REVIEWS_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  reviews: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_fetching_more_reviews: false,
};
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_REVIEWS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        reviews: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_REVIEWS_FAIL:
      return {
        ...state,
        is_loading: false,
        reviews: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        error: action.payload,
      };
    case FETCH_MORE_REVIEWS:
      return {
        ...state,
        is_fetching_more_reviews: true,
      };
    case FETCH_MORE_REVIEWS_SUCCESS:
      return {
        ...state,
        is_fetching_more_reviews: false,
        reviews: {
          next: action.payload.next,
          results: [...state.reviews.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_REVIEWS_FAIL:
      return {
        ...state,
        is_fetching_more_reviews: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
