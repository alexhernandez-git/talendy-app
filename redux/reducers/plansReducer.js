import { FETCH_PLANS, FETCH_PLANS_SUCCESS, FETCH_PLANS_FAIL } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  plans: null,
  error: null,
};
export default function plansReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.plansReducer };
    case FETCH_PLANS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_PLANS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        plans: action.payload,
        error: null,
      };
    case FETCH_PLANS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
