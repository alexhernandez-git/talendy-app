import { OPEN_POST_MODAL, CLOSE_POST_MODAL } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_modal_open: false,
};
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case OPEN_POST_MODAL:
      return {
        ...state,
        is_modal_open: true,
      };
    case CLOSE_POST_MODAL:
      return {
        ...state,
        is_modal_open: false,
      };
    default:
      return state;
  }
}
