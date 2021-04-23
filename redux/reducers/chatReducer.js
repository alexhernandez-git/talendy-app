import { FETCH_CHAT, FETCH_CHAT_SUCCESS, FETCH_CHAT_FAIL } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  current_chat: null,
  is_loading: false,
  chat: null,
  error: null,
};
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.chatReducer };
    case FETCH_CHAT:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_CHAT_SUCCESS:
      return {
        ...state,
        is_loading: false,
        chat: action.payload,
        error: null,
      };
    case FETCH_CHAT_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
