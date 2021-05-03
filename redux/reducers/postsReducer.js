import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  FETCH_POSTS,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAIL,
  FETCH_MORE_POSTS,
  FETCH_MORE_POSTS_SUCCESS,
  FETCH_MORE_POSTS_FAIL,
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
    default:
      return state;
  }
}
