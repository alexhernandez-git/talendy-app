import { ADD_CARD, ADD_LIST, DRAG_HAPPENED } from "redux/types";

export const addList = (title) => {
  const newList = {
    title: title,
    cards: [],
    id: Math.random().toString(36).substring(7),
  };
  return {
    type: ADD_LIST,
    payload: newList,
  };
};

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
    dispatch({
      type: DRAG_HAPPENED,
      payload: newStateSort,
    });
  };

export const addCard = (listID, text) => (dispatch, getState) => {
  const newCard = {
    text: text,
    id: Math.random().toString(36).substring(7),
  };
  const newState = getState().kanbanReducer.map((list) => {
    if (list.id === listID) {
      return {
        ...list,
        cards: [...list.cards, newCard],
      };
    } else {
      return list;
    }
  });
  dispatch({
    type: ADD_CARD,
    payload: newState,
  });
};
