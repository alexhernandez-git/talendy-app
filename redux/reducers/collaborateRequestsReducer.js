import {
  FETCH_CONTRIBUTE_REQUESTS,
  FETCH_CONTRIBUTE_REQUESTS_SUCCESS,
  FETCH_CONTRIBUTE_REQUESTS_FAIL,
  FETCH_MORE_CONTRIBUTE_REQUESTS,
  FETCH_MORE_CONTRIBUTE_REQUESTS_SUCCESS,
  FETCH_MORE_CONTRIBUTE_REQUESTS_FAIL,
  FETCH_CONTRIBUTE_REQUEST,
  FETCH_CONTRIBUTE_REQUEST_SUCCESS,
  FETCH_CONTRIBUTE_REQUEST_FAIL,
  ACCEPT_CONTRIBUTE_REQUEST,
  ACCEPT_CONTRIBUTE_REQUEST_SUCCESS,
  ACCEPT_CONTRIBUTE_REQUEST_FAIL,
  IGNORE_CONTRIBUTE_REQUEST,
  IGNORE_CONTRIBUTE_REQUEST_SUCCESS,
  IGNORE_CONTRIBUTE_REQUEST_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  collaborate_requests: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_fetching_more_collaborate_requests: false,
  is_adding_collaborate_request: false,
  add_collaborate_request_error: null,
  is_accepting_collaborate_request: false,
  accept_collaborate_request_error: null,
  is_ignoring_collaborate_request: false,
  ignore_collaborate_request_error: null,
};
export default function collaborateRequestsReducer(
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
        collaborate_requests: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_CONTRIBUTE_REQUESTS_FAIL:
      return {
        ...state,
        is_loading: false,
        collaborate_requests: {
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
        is_fetching_more_collaborate_requests: true,
      };
    case FETCH_MORE_CONTRIBUTE_REQUESTS_SUCCESS:
      return {
        ...state,
        is_fetching_more_collaborate_requests: false,
        collaborate_requests: {
          ...action.payload,
          results: [
            ...state.collaborate_requests.results,
            ...action.payload.results,
          ],
        },
        error: null,
      };
    case FETCH_MORE_CONTRIBUTE_REQUESTS_FAIL:
      return {
        ...state,
        is_fetching_more_collaborate_requests: false,
        error: action.payload,
      };
    case FETCH_CONTRIBUTE_REQUEST:
      return {
        ...state,
        is_adding_collaborate_request: true,
      };
    case FETCH_CONTRIBUTE_REQUEST_SUCCESS:
      return {
        ...state,
        is_adding_collaborate_request: false,
        collaborate_requests: {
          ...self.collaborate_requests,
          count: ++self.collaborate_requests.count,
          results: [...state.collaborate_requests.results, action.payload],
        },
        add_collaborate_request_error: null,
      };
    case FETCH_CONTRIBUTE_REQUEST_FAIL:
      return {
        ...state,
        is_adding_collaborate_request: false,
        add_collaborate_request_error: action.payload,
      };
    case ACCEPT_CONTRIBUTE_REQUEST:
      return {
        ...state,
        is_accepting_collaborate_request: true,
      };
    case ACCEPT_CONTRIBUTE_REQUEST_SUCCESS:
      return {
        ...state,
        is_accepting_collaborate_request: false,
        collaborate_requests: {
          ...state.collaborate_requests,
          count: --state.collaborate_requests.count,
          results: state.collaborate_requests.results.filter(
            (collaborate_request) => collaborate_request.id !== action.payload
          ),
        },
        accept_collaborate_request_error: null,
      };
    case ACCEPT_CONTRIBUTE_REQUEST_FAIL:
      return {
        ...state,
        is_accepting_collaborate_request: false,

        accept_collaborate_request_error: action.payload,
      };
    case IGNORE_CONTRIBUTE_REQUEST:
      return {
        ...state,
        is_ignoring_collaborate_request: true,
      };
    case IGNORE_CONTRIBUTE_REQUEST_SUCCESS:
      return {
        ...state,
        is_ignoring_collaborate_request: false,
        collaborate_requests: {
          ...state.collaborate_requests,
          count: --state.collaborate_requests.count,
          results: state.collaborate_requests.results.filter(
            (collaborate_request) => collaborate_request.id !== action.payload
          ),
        },
        ignore_collaborate_request_error: null,
      };
    case IGNORE_CONTRIBUTE_REQUEST_FAIL:
      return {
        ...state,
        is_ignoring_collaborate_request: false,

        ignore_collaborate_request_error: action.payload,
      };
    default:
      return state;
  }
}
