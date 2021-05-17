import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  FOLLOW_USER,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  STOP_FOLLOWING_USER,
  STOP_FOLLOWING_USER_SUCCESS,
  STOP_FOLLOWING_USER_FAIL,
  CONNECT_USER,
  CONNECT_USER_SUCCESS,
  CONNECT_USER_FAIL,
  ACCEPT_USER_INVITATION,
  ACCEPT_USER_INVITATION_SUCCESS,
  ACCEPT_USER_INVITATION_FAIL,
  DONATE_USER,
  DONATE_USER_SUCCESS,
  DONATE_USER_FAIL,
} from "../types";

const initialState = {
  is_loading: false,
  user: null,
  error: null,
  is_following_user: false,
  follow_user_error: null,
  is_unfollowing_user: false,
  unfollow_user_error: null,
  is_connecting_user: false,
  connect_user_error: null,
  is_accepting_invitation: false,
  accept_invitation_error: null,
  is_donating_user: false,
  donate_user_error: null,
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
    case FOLLOW_USER:
      return {
        ...state,
        is_following_user: true,
      };
    case FOLLOW_USER_SUCCESS:
      return {
        ...state,
        is_following_user: false,
        user: {
          ...state.user,
          is_followed: true,
        },
        follow_user_error: null,
      };
    case FOLLOW_USER_FAIL:
      return {
        ...state,
        is_following_user: false,
        follow_user_error: action.payload,
      };
    case STOP_FOLLOWING_USER:
      return {
        ...state,
        is_unfollowing_user: true,
      };
    case STOP_FOLLOWING_USER_SUCCESS:
      return {
        ...state,
        is_unfollowing_user: false,
        user: {
          ...state.user,
          is_followed: false,
        },
        unfollow_user_error: null,
      };
    case STOP_FOLLOWING_USER_FAIL:
      return {
        ...state,
        is_unfollowing_user: false,
        unfollow_user_error: action.payload,
      };
    case CONNECT_USER:
      return {
        ...state,
        is_connecting_user: true,
      };
    case CONNECT_USER_SUCCESS:
      return {
        ...state,
        is_connecting_user: false,
        user: {
          ...state.user,
          connection_invitation_sent: true,
        },
        connect_user_error: null,
      };
    case CONNECT_USER_FAIL:
      return {
        ...state,
        is_connecting_user: false,
        connect_user_error: action.payload,
      };
    case ACCEPT_USER_INVITATION:
      return {
        ...state,
        is_accepting_invitation: true,
      };
    case ACCEPT_USER_INVITATION_SUCCESS:
      return {
        ...state,
        is_accepting_invitation: false,
        user: {
          ...state.user,
          accept_invitation: false,
          is_connection: true,
        },
        accept_invitation_error: null,
      };
    case ACCEPT_USER_INVITATION_FAIL:
      return {
        ...state,
        is_accepting_invitation: false,
        accept_invitation_error: action.payload,
      };
    case DONATE_USER:
      return {
        ...state,
        is_donating_user: true,
      };
    case DONATE_USER_SUCCESS:
      return {
        ...state,
        is_donating_user: false,

        donate_user_error: null,
      };
    case DONATE_USER_FAIL:
      return {
        ...state,
        is_donating_user: false,
        donate_user_error: action.payload,
      };
    default:
      return state;
  }
}
