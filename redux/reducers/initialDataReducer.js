import { INITIAL_DATA_FETCHED } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  initial_data_fetched: false,
};
export default function initialDataReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case INITIAL_DATA_FETCHED:
      return {
        ...state,
        initial_data_fetched: true,
      };

    default:
      return state;
  }
}
