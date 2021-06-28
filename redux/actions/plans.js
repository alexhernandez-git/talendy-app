import axios from "axios";
import { FETCH_PLANS, FETCH_PLANS_SUCCESS, FETCH_PLANS_FAIL } from "../types";

export const fetchPlans = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_PLANS,
  });
  await axios
    .get(`${process.env.HOST}/api/plans/`)
    .then(async (res) => {
      await dispatch({
        type: FETCH_PLANS_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_PLANS_FAIL,
        payload: { data: err?.response?.data, status: err?.response?.status },
      });
    });
};
