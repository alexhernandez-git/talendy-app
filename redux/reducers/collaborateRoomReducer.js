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
  FINALIZE_POST,
  FINALIZE_POST_SUCCESS,
  FINALIZE_POST_FAIL,
  STOP_COLLABORATING,
  STOP_COLLABORATING_SUCCESS,
  STOP_COLLABORATING_FAIL,
  UPDATE_KARMA_WINNER,
  UPDATE_KARMA_WINNER_SUCCESS,
  UPDATE_KARMA_WINNER_FAIL,
  ADD_CARD,
  ADD_LIST,
  DRAG_HAPPENED,
  UPDATE_CARD,
  UPDATE_LIST,
  DELETE_CARD,
  DELETE_LIST,
} from "../types";

const initialState = {
  is_loading: false,
  collaborate_room: null,
  error: null,
  is_updating_member_review: false,
  update_member_review_error: null,
  is_updating_solution: false,
  update_solution_error: null,
  is_finalizing_post: false,
  finalize_post_error: null,
  is_stopping_colaborating: false,
  stop_collaborating_error: null,
  is_updating_karma_winner: false,
  update_kamra_winner_error: null,
};
export default function collaborateRoomReducer(state = initialState, action) {
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
        collaborate_room: action.payload,
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
        collaborate_room: {
          ...state.collaborate_room,
          shared_notes: action.payload,
        },
      };
    case RESET_CONTRIBUTE_ROOM:
      return {
        ...state,
        collaborate_room: null,
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
    case UPDATE_KARMA_WINNER:
      return {
        ...state,
        is_updating_karma_winner: true,
      };
    case UPDATE_KARMA_WINNER_SUCCESS:
      return {
        ...state,
        is_updating_karma_winner: false,
        update_karma_winner_error: null,
      };
    case UPDATE_KARMA_WINNER_FAIL:
      return {
        ...state,
        is_updating_karma_winner: false,
        update_karma_winner_error: action.payload,
      };
    case STOP_COLLABORATING:
      return {
        ...state,
        is_stopping_colaborating: true,
      };
    case STOP_COLLABORATING_SUCCESS:
      return {
        ...state,
        is_stopping_colaborating: false,
        collaborate_room: action.payload,
        stop_collaborating_error: null,
      };
    case STOP_COLLABORATING_FAIL:
      return {
        ...state,
        is_stopping_colaborating: false,
        stop_collaborating_error: action.payload,
      };
    case FINALIZE_POST:
      return {
        ...state,
        is_finalizing_post: true,
      };
    case FINALIZE_POST_SUCCESS:
      return {
        ...state,
        is_finalizing_post: false,
        collaborate_room: {
          ...state.collaborate_room,
          status: "SO",
        },
        finalize_post_error: null,
      };
    case FINALIZE_POST_FAIL:
      return {
        ...state,
        is_finalizing_post: false,
        finalize_post_error: action.payload,
      };
    case ADD_LIST:
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: [...state.collaborate_room.kanban, action.payload],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: state.collaborate_room.kanban.map((list) =>
            list.id === action.payload.listID
              ? { ...list, cards: [...list.cards, action.payload.newCard] }
              : list
          ),
        },
      };
    case DRAG_HAPPENED:
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: action.payload,
        },
      };
    case UPDATE_CARD:
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: state.collaborate_room.kanban.map((list) =>
            list.id === action.payload.listID
              ? {
                  ...list,
                  cards: list.cards.map((card) =>
                    card.id === action.payload.cardUpdated.id
                      ? action.payload.cardUpdated
                      : card
                  ),
                }
              : list
          ),
        },
      };
    case UPDATE_LIST:
      console.log(state.collaborate_room.kanban);
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: state.collaborate_room.kanban.map((list) =>
            list.id === action.payload.listUpdated.id
              ? { ...list, ...action.payload.listUpdated }
              : list
          ),
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: state.collaborate_room.kanban.map((list) =>
            list.id === action.payload.listID
              ? {
                  ...list,
                  cards: list.cards.filter(
                    (card) => card.id !== action.payload.cardID
                  ),
                }
              : list
          ),
        },
      };
    case DELETE_LIST:
      return {
        ...state,
        collaborate_room: {
          ...state.collaborate_room,
          kanban: state.collaborate_room.kanban.filter(
            (list) => list.id !== action.payload.listID
          ),
        },
      };
    default:
      return state;
  }
}
