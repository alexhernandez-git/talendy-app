import {
  FETCH_MEMBERS,
  FETCH_MEMBERS_SUCCESS,
  FETCH_MEMBERS_FAIL,
  CREATE_MEMBER,
  CREATE_MEMBER_SUCCESS,
  CREATE_MEMBER_FAIL,
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
  is_creating_collaborate_request: false,
  create_collaborate_request_error: null,
};
export default function membersReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_POSTS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        members: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_POSTS_FAIL:
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
    case FETCH_MORE_POSTS:
      return {
        ...state,
        is_fetching_more_members: true,
      };
    case FETCH_MORE_POSTS_SUCCESS:
      return {
        ...state,
        is_fetching_more_members: false,
        members: {
          next: action.payload.next,
          results: [...state.members.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_POSTS_FAIL:
      return {
        ...state,
        is_fetching_more_members: false,
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
        create_member_error: null,
      };
    case CREATE_MEMBER_FAIL:
      return {
        ...state,
        is_creating_member: false,
        create_member_error: action.payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        is_updating_member: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        members: {
          ...state.members,
          results: state.members.results.map((member) =>
            member.id === action.payload.id ? action.payload : member
          ),
        },
        is_updating_member: false,
        update_member_error: null,
      };
    case UPDATE_POST_FAIL:
      return {
        ...state,
        is_updating_member: false,
        update_member_error: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        is_deleting_member: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        members: {
          ...state.members,
          results: state.members.results.filter(
            (member) => member.id !== action.payload
          ),
        },
        is_deleting_member: false,
        delete_member_error: null,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        is_deleting_member: false,
        delete_member_error: action.payload,
      };
    case CREATE_CONTRIBUTE_REQUEST:
      return {
        ...state,
        is_creating_collaborate_request: true,
      };
    case CREATE_CONTRIBUTE_REQUEST_SUCCESS:
      return {
        ...state,
        is_creating_collaborate_request: false,
        members: {
          ...state.members,
          results: state.members.results.map((member) =>
            member.id === action.payload
              ? { ...member, is_collaborate_requested: true }
              : member
          ),
        },
      };
    case CREATE_CONTRIBUTE_REQUEST_FAIL:
      return {
        ...state,
        is_creating_collaborate_request: false,
        create_collaborate_request_error: action.payload,
      };
    default:
      return state;
  }
}
