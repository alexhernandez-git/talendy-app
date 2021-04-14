import { CREATE_ALERT, REMOVE_ALERT } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  type: "",
  message: "",
};
export default function alertsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.alertsReducer };
    case CREATE_ALERT:
      return (state = action.payload);
    case REMOVE_ALERT:
      return (state = initialState);
    default:
      return state;
  }
}
