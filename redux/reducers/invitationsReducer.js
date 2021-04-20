import {
  FETCH_INVITATIONS,
  FETCH_INVITATIONS_SUCCESS,
  FETCH_INVITATIONS_FAIL,
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
    case FETCH_INVITATIONS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_INVITATIONS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        invitations: action.payload,
        error: null,
      };
    case FETCH_INVITATIONS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case ACCEPT_INVITATION:
      return {
        ...state,
        is_accepting_invitation: true,
      };
    case ACCEPT_INVITATION_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        is_accepting_invitation: false,
        invitations: {
          ...state.invitations,
          results: state.invitations.results.filter(
            (invitation) => invitation.requester.id !== action.payload
          ),
        },
        accept_invitation_error: null,
      };
    case ACCEPT_INVITATION_FAIL:
      return {
        ...state,
        is_accepting_invitation: false,
        accept_invitation_error: action.payload,
      };
    case IGNORE_INVITATION:
      return {
        ...state,
        is_ignoring_invitation: true,
      };
    case IGNORE_INVITATION_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        is_ignoring_invitation: false,
        invitations: {
          ...state.invitations,
          results: state.invitations.results.filter(
            (invitation) => invitation.requester.id !== action.payload
          ),
        },
        ignore_invitation_error: null,
      };
    case IGNORE_INVITATION_FAIL:
      return {
        ...state,
        is_ignoring_invitation: false,
        ignore_invitation_error: action.payload,
      };
    default:
      return state;
  }
}
