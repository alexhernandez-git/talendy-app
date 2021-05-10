import {
  FETCH_CONTRIBUTE_ROOM,
  FETCH_CONTRIBUTE_ROOM_SUCCESS,
  FETCH_CONTRIBUTE_ROOM_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  contribute_room: null,
  error: null,
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

    default:
      return state;
  }
}
