import {
  FETCH_EARNINGS,
  FETCH_EARNINGS_SUCCESS,
  FETCH_EARNINGS_FAIL,
  WITHDRAW_FUNDS,
  WITHDRAW_FUNDS_SUCCESS,
  WITHDRAW_FUNDS_FAIL,
} from "../types";

const initialState = {
  is_loading: false,
  earnings: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  withdrawing_founds: false,
  withdraw_founds_error: null,
};
export default function sellerInvoicesReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.sellerInvoicesReducer };
    case FETCH_EARNINGS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_EARNINGS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        earnings: {
          ...action.payload,
          results: action.payload.results,
        },
        error: null,
      };
    case FETCH_EARNINGS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case WITHDRAW_FUNDS:
      return {
        ...state,
        withdrawing_founds: true,
      };
    case WITHDRAW_FUNDS_SUCCESS:
      return {
        ...state,
        withdrawing_founds: false,
        earnings: {
          ...state.earnings,
          results: [action.payload, ...state.earnings.results],
        },
        withdraw_founds_error: null,
      };
    case WITHDRAW_FUNDS_FAIL:
      return {
        ...state,
        withdrawing_founds: false,
        withdraw_founds_error: action.payload,
      };

    default:
      return state;
  }
}
