import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAIL } from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  user: null,
  error: null,
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        is_loading: false,
        user: action.payload,
        error: null,
      };
    case FETCH_USER_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
