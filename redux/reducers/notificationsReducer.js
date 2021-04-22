import { HYDRATE } from "next-redux-wrapper";
import {
  FETCH_NOTIFICATIONS,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAIL,
  FETCH_MORE_NOTIFICATIONS,
  FETCH_MORE_NOTIFICATIONS_SUCCESS,
  FETCH_MORE_NOTIFICATIONS_FAIL,
  ADD_NOTIFICATION_TO_FEED,
  ADD_NOTIFICATION_TO_FEED_SUCCESS,
  UPDATE_NOTIFICATION_TO_FEED_SUCCESS,
  ADD_NOTIFICATION_TO_FEED_FAIL,
  SET_ALL_NOTIFICATIONS_READ,
  SET_ALL_NOTIFICATIONS_READ_SUCCESS,
  SET_ALL_NOTIFICATIONS_READ_FAIL,
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
  adding_notification_to_feed: false,
  add_notification_to_feed_error: null,
  setting_all_notifications_read: false,
  set_all_notifications_read_error: null,
};
export default function notificationsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.notificationsReducer };
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
    case ADD_NOTIFICATION_TO_FEED:
      return {
        ...state,
        adding_notification_to_feed: true,
      };
    case ADD_NOTIFICATION_TO_FEED_SUCCESS:
      return {
        ...state,
        adding_notification_to_feed: false,
        add_notification_to_feed_error: null,
        notifications: {
          ...state.notifications,

          results: [...state.notifications.results, action.payload],
        },
      };
    case UPDATE_NOTIFICATION_TO_FEED_SUCCESS:
      return {
        ...state,
        adding_notification_to_feed: false,
        add_notification_to_feed_error: null,
        notifications: {
          ...state.notifications,
          results: state.notifications.results.map((notification) =>
            notification.id === action.payload.id
              ? action.payload
              : notification
          ),
        },
      };
    case ADD_NOTIFICATION_TO_FEED_FAIL:
      return {
        ...state,
        adding_notification_to_feed: false,
        add_notification_to_feed_error: action.payload,
      };
    case SET_ALL_NOTIFICATIONS_READ:
      return {
        ...state,
        setting_all_notifications_read: true,
      };
    case SET_ALL_NOTIFICATIONS_READ_SUCCESS:
      return {
        ...state,
        notifications: {
          next: null,
          previous: null,
          count: 0,
          results: [],
        },
        setting_all_notifications_read: false,
        set_all_notifications_read_error: null,
      };
    case SET_ALL_NOTIFICATIONS_READ_FAIL:
      return {
        ...state,
        setting_all_notifications_read: false,
        set_all_notifications_read_error: action.payload,
      };
    default:
      return state;
  }
}
