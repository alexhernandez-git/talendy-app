import { ADD_CARD, ADD_LIST, DRAG_HAPPENED } from "redux/types";
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
  async (dispatch, getState) => {
    console.log("droppableIdStart", droppableIdStart);
    console.log("droppableIdEnd", droppableIdEnd);
    console.log("droppableIndexStart", droppableIndexStart);
    console.log("droppableIndexEnd", droppableIndexEnd);
    console.log("type", type);
    let state = getState().collaborateRoomReducer.collaborate_room?.kanban;
    const newStateSort = state;

    // dragging lists around
    console.log(type);
    if (type === "list") {
      axios
        .patch(
          `${process.env.HOST}/api/posts/${
            getState().collaborateRoomReducer.collaborate_room?.id
          }/update_kanban_list_order/`,
          {
            droppable_index_start: droppableIndexStart,
            droppable_index_end: droppableIndexEnd,
          },
          tokenConfig(getState)
        )
        .then((res) => {
          console.log("Sort list success", res.data);
        })
        .catch((err) => {
          console.log("Sort list error", err.response);
        });
      const list = newStateSort.splice(droppableIndexStart, 1);
      newStateSort.splice(droppableIndexEnd, 0, ...list);
      return newStateSort;
    }

    // in the same list
    if (droppableIdStart === droppableIdEnd) {
      axios
        .patch(
          `${process.env.HOST}/api/posts/${
            getState().collaborateRoomReducer.collaborate_room?.id
          }/update_kanban_card_order/`,
          {
            list_id: droppableIdStart,
            droppable_index_start: droppableIndexStart,
            droppable_index_end: droppableIndexEnd,
          },
          tokenConfig(getState)
        )
        .then((res) => {
          console.log("Sort card success", res.data);
        })
        .catch((err) => {
          console.log("Sort card error", err.response);
        });
      const list = state.find((list) => droppableIdStart === list.id);
      const card = list.cards.splice(droppableIndexStart, 1);
      list.cards.splice(droppableIndexEnd, 0, ...card);
    }

    // other list
    if (droppableIdStart !== droppableIdEnd) {
      axios
        .patch(
          `${process.env.HOST}/api/posts/${
            getState().collaborateRoomReducer.collaborate_room?.id
          }/update_kanban_card_between_lists_order/`,
          {
            list_start_id: droppableIdStart,
            list_end_id: droppableIdEnd,
            droppable_index_start: droppableIndexStart,
            droppable_index_end: droppableIndexEnd,
          },
          tokenConfig(getState)
        )
        .then((res) => {
          console.log("Sort card between lists success", res.data);
        })
        .catch((err) => {
          console.log("Sort card between lists error", err.response);
        });
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
      console.log("Create list success", res.data);
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
      console.log("Create card success", res.data);
    })
    .catch(async (err) => {
      console.log("Create card error", err.response);
    });

  dispatch({
    type: ADD_CARD,
    payload: { listID: listID, newCard: newCard },
  });
};
