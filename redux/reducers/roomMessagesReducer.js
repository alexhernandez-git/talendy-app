import {
  FETCH_ROOM_MESSAGES,
  FETCH_ROOM_MESSAGES_SUCCESS,
  FETCH_ROOM_MESSAGES_FAIL,
  FETCH_ROOM_MESSAGE,
  FETCH_ROOM_MESSAGE_SUCCESS,
  FETCH_ROOM_MESSAGE_FAIL,
  ADD_ROOM_MESSAGE,
  FETCH_MORE_ROOM_MESSAGES,
  FETCH_MORE_ROOM_MESSAGES_SUCCESS,
  FETCH_MORE_ROOM_MESSAGES_FAIL,
  RESET_ROOM_MESSAGES,
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
export default function roomMessagesReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.messagesReducer };
    case FETCH_ROOM_MESSAGES:
      return {
        ...state,
        is_loading: true,
        first_loading: false,
      };
    case FETCH_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        messages: action.payload,
        error: null,
        first_loading: true,
      };
    case FETCH_ROOM_MESSAGES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
        first_loading: false,
      };
    case ADD_ROOM_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          results: [action.payload, ...state.messages.results],
        },
      };
    case FETCH_ROOM_MESSAGE:
      return {
        ...state,
        fetching_message: true,
      };
    case FETCH_ROOM_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: {
          ...state.messages,
          results: [action.payload, ...state.messages.results],
        },
        fetching_message: false,
        fetch_message_error: null,
      };
    case FETCH_ROOM_MESSAGE_FAIL:
      return {
        ...state,
        fetching_message: false,
        fetch_message_error: action.payload,
      };
    case FETCH_MORE_ROOM_MESSAGES:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_MORE_ROOM_MESSAGES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        messages: {
          next: action.payload.next,
          results: [...state.messages.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_ROOM_MESSAGES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case RESET_ROOM_MESSAGES:
      return {
        ...state,
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
    default:
      return state;
  }
}
