import {
  FETCH_LAST_MESSAGES,
  FETCH_LAST_MESSAGES_SUCCESS,
  FETCH_LAST_MESSAGES_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: true,
  chats: [],
  error: null,
};
export default function lastMessagesReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.ordersReducer };
    case FETCH_LAST_MESSAGES:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_LAST_MESSAGES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        chats: action.payload,
        error: null,
      };
    case FETCH_LAST_MESSAGES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
