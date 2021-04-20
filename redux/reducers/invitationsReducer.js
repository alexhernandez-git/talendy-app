import {
  LIST_INVITATIONS,
  LIST_INVITATIONS_SUCCESS,
  LIST_INVITATIONS_FAIL,
  ACCEPT_INVITATION,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAIL,
  IGNORE_INVITATION,
  IGNORE_INVITATION_SUCCESS,
  IGNORE_INVITATION_FAIL,
} from "../types";

const initialState = {
  is_loading: false,
  invitations: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_accepting_invitation: false,
  accept_invitation_error: null,
  is_ignoring_invitation: false,
  ignore_invitation_error: null,
};
export default function invitationsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_KARMA_USERS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_TOP_KARMA_USERS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        users: action.payload,
        error: null,
      };
    case FETCH_TOP_KARMA_USERS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case FOLLOW_TOP_KARMA_USER:
      return {
        ...state,
        is_following_user: true,
      };
    case FOLLOW_TOP_KARMA_USER_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        is_following_user: false,
        users: {
          ...state.users,
          results: state.users.results.map((user) =>
            user.id === action.payload ? { ...user, is_followed: true } : user
          ),
        },
        follow_user_error: null,
      };
    case FOLLOW_TOP_KARMA_USER_FAIL:
      return {
        ...state,
        is_following_user: false,
        follow_user_error: action.payload,
      };

    default:
      return state;
  }
}
