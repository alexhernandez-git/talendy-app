import {
  FETCH_CONTRIBUTE_REQUESTS,
  FETCH_CONTRIBUTE_REQUESTS_SUCCESS,
  FETCH_CONTRIBUTE_REQUESTS_FAIL,
  FETCH_MORE_CONTRIBUTE_REQUESTS,
  FETCH_MORE_CONTRIBUTE_REQUESTS_SUCCESS,
  FETCH_MORE_CONTRIBUTE_REQUESTS_FAIL,
  ADD_CONTRIBUTE_REQUEST,
  ADD_CONTRIBUTE_REQUEST_SUCCESS,
  ADD_CONTRIBUTE_REQUEST_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  contribute_requests: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_fetching_more_contribute_requests: false,
  is_adding_contribute_request: false,
  add_contribute_request_error: null,
};
export default function contributeRequestsReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_CONTRIBUTE_REQUESTS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_CONTRIBUTE_REQUESTS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        contribute_requests: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_CONTRIBUTE_REQUESTS_FAIL:
      return {
        ...state,
        is_loading: false,
        contribute_requests: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        error: action.payload,
      };
    case FETCH_MORE_CONTRIBUTE_REQUESTS:
      return {
        ...state,
        is_fetching_more_contribute_requests: true,
      };
    case FETCH_MORE_CONTRIBUTE_REQUESTS_SUCCESS:
      return {
        ...state,
        is_fetching_more_contribute_requests: false,
        contribute_requests: {
          next: action.payload.next,
          results: [
            ...state.contribute_requests.results,
            ...action.payload.results,
          ],
        },
        error: null,
      };
    case FETCH_MORE_CONTRIBUTE_REQUESTS_FAIL:
      return {
        ...state,
        is_fetching_more_contribute_requests: false,
        error: action.payload,
      };
    case ADD_CONTRIBUTE_REQUEST:
      return {
        ...state,
        is_adding_contribute_request: true,
      };
    case ADD_CONTRIBUTE_REQUEST_SUCCESS:
      return {
        ...state,
        is_adding_contribute_request: false,
        contribute_requests: {
          ...self.contribute_requests,
          results: [...state.contribute_requests.results, action.payload],
        },
        add_contribute_request_error: null,
      };
    case ADD_CONTRIBUTE_REQUEST_FAIL:
      return {
        ...state,
        is_adding_contribute_request: false,
        add_contribute_request_error: action.payload,
      };

    default:
      return state;
  }
}
