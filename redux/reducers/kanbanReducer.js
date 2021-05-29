import { ADD_CARD, ADD_LIST, DRAG_HAPPENED } from "redux/types";

const initialState = [];

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIST:
      return [...state, action.payload];
    case ADD_CARD:
      return action.payload;
    case DRAG_HAPPENED:
      return action.payload;
    default:
      return state;
  }
};

export default listsReducer;
