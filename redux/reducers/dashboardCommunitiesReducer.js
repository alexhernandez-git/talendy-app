import {
  FETCH_DASHBOARD_COMMUNITIES,
  FETCH_DASHBOARD_COMMUNITIES_SUCCESS,
  FETCH_DASHBOARD_COMMUNITIES_FAIL,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  communities: {
    results: [],
    count: 0,
    next: [],
    previous: [],
  },
  error: null,
  is_creating_community: false,
  create_community_error: null,
};
export default function dashboardCommunitiesReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_DASHBOARD_COMMUNITIES:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_DASHBOARD_COMMUNITIES_SUCCESS:
      return {
        ...state,
        is_loading: false,
        communities: action.payload,
        error: null,
      };
    case FETCH_DASHBOARD_COMMUNITIES_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case CREATE_COMMUNITY:
      return {
        ...state,
        is_creating_community: true,
      };
    case CREATE_COMMUNITY_SUCCESS:
      return {
        ...state,
        is_creating_community: false,
        create_community_error: null,
        communities: {
          ...state.communities,
          results: [action.payload, ...state.communities.results],
        },
      };
    case CREATE_COMMUNITY_FAIL:
      return {
        ...state,
        is_creating_community: false,
        create_community_error: action.payload,
      };
    default:
      return state;
  }
}
