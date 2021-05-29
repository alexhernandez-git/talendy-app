import { ADD_CARD, ADD_LIST, CREATE_LIST, DRAG_HAPPENED } from "redux/types";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { tokenConfig } from "./auth";

export const sort =
  (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type
  ) =>
  (dispatch, getState) => {
    console.log("droppableIdStart", droppableIdStart);
    console.log("droppableIdEnd", droppableIdEnd);
    console.log("droppableIndexStart", droppableIndexStart);
    console.log("droppableIndexEnd", droppableIndexEnd);
    console.log("type", type);
    let state = getState().kanbanReducer;
    const newStateSort = state;

    // dragging lists around
    console.log(type);
    if (type === "list") {
      const list = newStateSort.splice(droppableIndexStart, 1);
      newStateSort.splice(droppableIndexEnd, 0, ...list);
      return newStateSort;
    }

    // in the same list
    if (droppableIdStart === droppableIdEnd) {
      const list = state.find((list) => droppableIdStart === list.id);
      const card = list.cards.splice(droppableIndexStart, 1);
      list.cards.splice(droppableIndexEnd, 0, ...card);
    }

    // other list
    if (droppableIdStart !== droppableIdEnd) {
      // find the list where drag happened
      const listStart = state.find((list) => droppableIdStart === list.id);

      // pull out the card from this list
      const card = listStart.cards.splice(droppableIndexStart, 1);

      // find the list where drag ended
      const listEnd = state.find((list) => droppableIdEnd === list.id);

      // put the card in the new list
      listEnd.cards.splice(droppableIndexEnd, 0, ...card);
    }
    console.log(newStateSort);
    dispatch({
      type: DRAG_HAPPENED,
      payload: newStateSort,
    });
  };

export const addList = (title) => async (dispatch, getState) => {
  const newList = {
    title: title,
    cards: [],
    id: uuidv4(),
  };
  await axios
    .post(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/kanbans/`,
      newList,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: CREATE_LIST,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      console.log("Create list error", err.response);
    });
  dispatch({
    type: ADD_LIST,
    payload: newList,
  });
};
export const addCard = (listID, title) => async (dispatch, getState) => {
  const newCard = {
    title: title,
    id: uuidv4(),
  };

  await axios
    .post(
      `${process.env.HOST}/api/posts/${
        getState().collaborateRoomReducer.collaborate_room?.id
      }/kanbans/${listID}/cards/`,
      newCard,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: CREATE_CARD,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      console.log("Create card error", err.response);
    });

  dispatch({
    type: ADD_CARD,
    payload: { listID: listID, newCard: newCard },
  });
};
