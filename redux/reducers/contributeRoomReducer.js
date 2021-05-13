import {
  FETCH_CONTRIBUTE_ROOM,
  FETCH_CONTRIBUTE_ROOM_SUCCESS,
  FETCH_CONTRIBUTE_ROOM_FAIL,
  UPDATE_SHARED_NOTES,
  RESET_CONTRIBUTE_ROOM,
  UPDATE_MEMBER_REVIEW,
  UPDATE_MEMBER_REVIEW_SUCCESS,
  UPDATE_MEMBER_REVIEW_FAIL,
  UPDATE_SOLUTION,
  UPDATE_SOLUTION_SUCCESS,
  UPDATE_SOLUTION_FAIL,
} from "../types";

const initialState = {
  is_loading: false,
  contribute_room: null,
  error: null,
  is_updating_member_review: false,
  update_member_review_error: null,
  is_updating_solution: false,
  update_solution_error: null,
};
export default function contributeRoomReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_CONTRIBUTE_ROOM:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_CONTRIBUTE_ROOM_SUCCESS:
      return {
        ...state,
        is_loading: false,
        contribute_room: action.payload,
        error: null,
      };
    case FETCH_CONTRIBUTE_ROOM_FAIL:
      return {
        ...state,
        is_loading: false,

        error: action.payload,
      };
    case UPDATE_SHARED_NOTES:
      return {
        ...state,
        contribute_room: {
          ...state.contribute_room,
          shared_notes: action.payload,
        },
      };
    case RESET_CONTRIBUTE_ROOM:
      return {
        ...state,
        contribute_room: null,
      };
    case UPDATE_MEMBER_REVIEW:
      return {
        ...state,
        is_updating_member_review: true,
      };
    case UPDATE_MEMBER_REVIEW_SUCCESS:
      return {
        ...state,
        is_updating_member_review: false,
        update_member_review_error: null,
      };
    case UPDATE_MEMBER_REVIEW_FAIL:
      return {
        ...state,
        is_updating_member_review: false,
        update_member_review_error: action.payload,
      };
    case UPDATE_SOLUTION:
      return {
        ...state,
        is_updating_solution: true,
      };
    case UPDATE_SOLUTION_SUCCESS:
      return {
        ...state,
        is_updating_solution: false,
        update_solution_error: null,
      };
    case UPDATE_SOLUTION_FAIL:
      return {
        ...state,
        is_updating_solution: false,
        update_solution_error: action.payload,
      };
    default:
      return state;
  }
}
