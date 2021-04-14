import { CREATE_ALERT, REMOVE_ALERT } from "../types";

export const createAlert = (type, message) => (dispatch, getState) => {
  dispatch({
    type: CREATE_ALERT,
    payload: {
      type: type,
      message: message,
    },
  });
};

export const removeAlert = () => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ALERT,
  });
};
