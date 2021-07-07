import {
  FETCH_MEMBERS,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAIL,
  CREATE_MEMBER,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAIL,
  IS_MEMBER_EMAIL_AVAILABLE,
  IS_MEMBER_EMAIL_AVAILABLE_SUCCESS,
  IS_MEMBER_EMAIL_AVAILABLE_FAIL,
  RESET_MEMBER_EMAIL_AVAILABLE,
  REMOVE_MEMBERS,
  REMOVE_MEMBERS_SUCCESS,
  REMOVE_MEMBERS_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  members: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_creating_member: false,
  create_member_error: null,
  is_fetching_more_members: false,
  is_updating_member: false,
  update_member_error: null,
  is_deleting_member: false,
  delete_member_error: null,
  is_creating_member: false,
  create_member_error: null,
  member_email_available_loading: false,
  member_email_available: false,
  member_email_available_error: null,
  is_removing_members: false,
  remove_members_error: null,
};
export default function membersReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_MEMBERS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_MEMBERS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        members: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_MEMBERS_FAIL:
      return {
        ...state,
        is_loading: false,
        members: {
          count: 0,
          next: null,
          previous: null,
          results: [],
        },
        error: action.payload,
      };

    case CREATE_MEMBER:
      return {
        ...state,
        is_creating_member: true,
      };
    case CREATE_MEMBER_SUCCESS:
      return {
        ...state,
        is_creating_member: false,
        members: {
          ...state.members,
          results: [action.payload, ...state.members.results],
        },
      };
    case CREATE_MEMBER_FAIL:
      return {
        ...state,
        is_creating_member: false,
        create_member_error: action.payload,
      };
    case IS_MEMBER_EMAIL_AVAILABLE:
      return {
        ...state,
        member_email_available_loading: true,
      };
    case IS_MEMBER_EMAIL_AVAILABLE_SUCCESS:
      return {
        ...state,
        member_email_available_loading: false,

        member_email_available: action.payload.email,
        member_email_available_error: null,
      };
    case IS_MEMBER_EMAIL_AVAILABLE_FAIL:
      return {
        ...state,
        member_email_available_loading: false,
        member_email_available: false,
        member_email_available_error: action.payload,
      };
    case RESET_MEMBER_EMAIL_AVAILABLE:
      return {
        ...state,
        member_email_available: false,
        member_email_available_error: null,
      };
    case REMOVE_MEMBERS:
      return {
        ...state,
        is_removing_members: true,
      };
    case REMOVE_MEMBERS_SUCCESS:
      return {
        ...state,
        is_removing_members: false,
        remove_members_error: null,
        members: {
          ...state.members,
          results: state.members.results.filter((member) =>
            action.payload.some((id) => id !== member.id)
          ),
        },
      };
    case REMOVE_MEMBERS_FAIL:
      return {
        ...state,
        is_removing_members: false,
        remove_members_error: action.payload,
      };
    default:
      return state;
  }
}
