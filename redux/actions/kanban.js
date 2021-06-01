import {
  ADD_CARD,
  ADD_LIST,
  DRAG_HAPPENED,
  UPDATE_CARD,
  UPDATE_LIST,
  DELETE_CARD,
  DELETE_LIST,
} from "redux/types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { tokenConfig } from "./auth";

export const sortList =
  ({ droppableIndexStart, droppableIndexEnd }) =>
  async (dispatch, getState) => {
    let state = getState().collaborateRoomReducer.collaborate_room?.kanban;
    const newStateSort = state;

    const list = newStateSort.splice(droppableIndexStart, 1);
    newStateSort.splice(droppableIndexEnd, 0, ...list);

    dispatch({
      type: DRAG_HAPPENED,
      payload: newStateSort,
    });
  };

export const sortCard =
  ({ droppableIdStart, droppableIndexStart, droppableIndexEnd }) =>
  async (dispatch, getState) => {
    let state = getState().collaborateRoomReducer.collaborate_room?.kanban;
    const list = state.find((list) => droppableIdStart === list.id);
    const card = list.cards.splice(droppableIndexStart, 1);
    list.cards.splice(droppableIndexEnd, 0, ...card);

    dispatch({
      type: DRAG_HAPPENED,
      payload: state.map((list_el) => {
        if (list_el.id === list.id) {
          return list;
        } else {
          return list_el;
        }
      }),
    });
  };
export const sortCardInDiferentLists =
  ({
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
  }) =>
  async (dispatch, getState) => {
    let state = getState().collaborateRoomReducer.collaborate_room?.kanban;

    // find the list where drag happened
    const listStart = state.find((list) => droppableIdStart === list.id);

    // pull out the card from this list
    const card = listStart.cards.splice(droppableIndexStart, 1);

    // find the list where drag ended
    const listEnd = state.find((list) => droppableIdEnd === list.id);
    console.log("list end ", listEnd);
    // put the card in the new list
    listEnd.cards.splice(droppableIndexEnd, 0, ...card);

    dispatch({
      type: DRAG_HAPPENED,
      payload: state.map((list) => {
        if (list.id === listStart.id) {
          return listStart;
        } else if (list.id === listEnd) {
          return listEnd;
        } else {
          return list;
        }
      }),
    });
  };

export const addList =
  ({ newList }) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADD_LIST,
      payload: newList,
    });
  };
export const addCard =
  ({ listID, newCard }) =>
  async (dispatch, getState) => {
    dispatch({
      type: ADD_CARD,
      payload: { listID: listID, newCard: newCard },
    });
  };

export const updateCard =
  ({ listID, values, cardID }) =>
  async (dispatch, getState) => {
    values.id = cardID;
    dispatch({
      type: UPDATE_CARD,
      payload: { listID: listID, cardUpdated: values },
    });
  };

export const updateList =
  ({ listID, values }) =>
  async (dispatch, getState) => {
    values.id = listID;
    console.log(values);
    dispatch({
      type: UPDATE_LIST,
      payload: { listUpdated: values },
    });
  };

export const deleteCard =
  ({ listID, cardID }) =>
  async (dispatch, getState) => {
    dispatch({
      type: DELETE_CARD,
      payload: { listID: listID, cardID: cardID },
    });
  };

export const deleteList =
  ({ listID }) =>
  async (dispatch, getState) => {
    dispatch({
      type: DELETE_LIST,
      payload: { listID: listID },
    });
  };
