import {
  FETCH_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAIL,
  FETCH_MESSAGE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAIL,
  ADD_MESSAGE,
  FETCH_MORE_MESSAGES,
  FETCH_MORE_MESSAGES_SUCCESS,
  FETCH_MORE_MESSAGES_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  messages: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  first_loading: false,
  error: null,
  fetching_message: false,
  fetch_message_error: null,
};
export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.messagesReducer };
    case FETCH_MESSAGES:
      return {
        ...state,
        is_loading: true,
        first_loading: false,
      };
    case FETCH_MESSAGES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        messages: action.payload,
        error: null,
        first_loading: true,
      };
    case FETCH_MESSAGES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
        first_loading: false,
      };
    case ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          results: [action.payload, ...state.messages.results],
        },
      };
    case FETCH_MESSAGE:
      return {
        ...state,
        fetching_message: true,
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          results: [action.payload, ...state.messages.results],
        },
        fetching_message: false,
        fetch_message_error: null,
      };
    case FETCH_MESSAGE_FAIL:
      return {
        ...state,
        fetching_message: false,
        fetch_message_error: action.payload,
      };
    case FETCH_MORE_MESSAGES:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_MORE_MESSAGES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        messages: {
          next: action.payload.next,
          results: [...state.messages.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_MESSAGES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
