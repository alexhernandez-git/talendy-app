import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_MORE_POSTS,
  FETCH_MORE_POSTS_SUCCESS,
  FETCH_MORE_POSTS_FAIL,
  CREATE_CONTRIBUTE_REQUEST,
  CREATE_CONTRIBUTE_REQUEST_SUCCESS,
  CREATE_CONTRIBUTE_REQUEST_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  posts: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_creating_post: false,
  create_post_error: null,
  is_fetching_more_posts: false,
  is_updating_post: false,
  update_post_error: null,
  is_deleting_post: false,
  delete_post_error: null,
  is_creating_contribute_request: false,
  create_contribute_request_error: null,
};
export default function postsReducer(state = initialState, action) {
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
        posts: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_POSTS_FAIL:
      return {
        ...state,
        is_loading: false,
        posts: {
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
        is_fetching_more_posts: true,
      };
    case FETCH_MORE_POSTS_SUCCESS:
      return {
        ...state,
        is_fetching_more_posts: false,
        posts: {
          next: action.payload.next,
          results: [...state.posts.results, ...action.payload.results],
        },
        error: null,
      };
    case FETCH_MORE_POSTS_FAIL:
      return {
        ...state,
        is_fetching_more_posts: false,
        error: action.payload,
      };
    case CREATE_POST:
      return {
        ...state,
        is_creating_post: true,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        is_creating_post: false,
        create_post_error: null,
      };
    case CREATE_POST_FAIL:
      return {
        ...state,
        is_creating_post: false,
        create_post_error: action.payload,
      };
    case UPDATE_POST:
      return {
        ...state,
        is_updating_post: true,
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          results: state.posts.results.map((post) =>
            post.id === action.payload.id ? action.payload : post
          ),
        },
        is_updating_post: false,
        update_post_error: null,
      };
    case UPDATE_POST_FAIL:
      return {
        ...state,
        is_updating_post: false,
        update_post_error: action.payload,
      };
    case DELETE_POST:
      return {
        ...state,
        is_deleting_post: true,
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: {
          ...state.posts,
          results: state.posts.results.filter(
            (post) => post.id !== action.payload
          ),
        },
        is_deleting_post: false,
        delete_post_error: null,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        is_deleting_post: false,
        delete_post_error: action.payload,
      };
    case CREATE_CONTRIBUTE_REQUEST:
      return {
        ...state,
        is_creating_contribute_request: true,
      };
    case CREATE_CONTRIBUTE_REQUEST_SUCCESS:
      return {
        ...state,
        is_creating_contribute_request: false,
        posts: {
          ...state.posts,
          results: state.posts.results.map((post) =>
            post.id === action.payload
              ? { ...post, is_contribute_requested: true }
              : post
          ),
        },
      };
    case CREATE_CONTRIBUTE_REQUEST_FAIL:
      return {
        ...state,
        is_creating_contribute_request: false,
        create_contribute_request_error: action.payload,
      };
    default:
      return state;
  }
}
