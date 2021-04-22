import { HYDRATE } from "next-redux-wrapper";
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  FETCH_MORE_NOTIFICATIONS,
  FETCH_MORE_NOTIFICATIONS_SUCCESS,
  FETCH_MORE_NOTIFICATIONS_FAIL,
} from "redux/types";

const initialState = {
  is_loading: false,
  notifications: {
    next: null,
    previous: null,
    count: 0,
    results: [],
  },
  error: null,
};
export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.lastNotificationsReducer };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        notifications: action.payload,
        error: null,
      };
    case FETCH_NOTIFICATIONS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case FETCH_MORE_NOTIFICATIONS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_MORE_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        notifications: {
          ...action.payload,
          results: [...state.notifications.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_NOTIFICATIONS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}
