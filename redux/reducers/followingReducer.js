import {
  FETCH_FOLLOWING,
  FETCH_FOLLOWING_SUCCESS,
  FETCH_FOLLOWING_FAIL,
  UNFOLLOW,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAIL,
} from "../types";

const initialState = {
  is_loading: false,
  following: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_unfollowing: false,
  unfollow_error: null,
};
export default function followingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FOLLOWING:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_FOLLOWING_SUCCESS:
      return {
        ...state,
        is_loading: false,
        following: action.payload,
        error: null,
      };
    case FETCH_FOLLOWING_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case UNFOLLOW:
      return {
        ...state,
        is_unfollowing: true,
      };
    case UNFOLLOW_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        is_unfollowing: false,
        following: {
          ...state.following,
          results: state.following.results.filter(
            (follow) => follow.requester.id !== action.payload
          ),
        },
        unfollow_error: null,
      };
    case UNFOLLOW_FAIL:
      return {
        ...state,
        is_unfollowing: false,
        unfollow_error: action.payload,
      };

    default:
      return state;
  }
}
