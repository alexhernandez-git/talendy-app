import { INITIAL_DATA_FETCHED, RESET_DATA_FETCHED } from "redux/types";

export const initialDataFetched = () => async (dispatch, getState) => {
  await dispatch({
    type: INITIAL_DATA_FETCHED,
  });
};

export const resetDataFetched = () => async (dispatch, getState) => {
  await dispatch({
    type: RESET_DATA_FETCHED,
  });
};
