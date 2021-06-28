import {
  FETCH_PORTAL,
  FETCH_PORTAL_SUCCESS,
  FETCH_PORTAL_FAIL,
  UPDATE_PORTAL,
  UPDATE_PORTAL_SUCCESS,
  UPDATE_PORTAL_FAIL,
  IS_NAME_AVAILABLE,
  IS_NAME_AVAILABLE_SUCCESS,
  IS_NAME_AVAILABLE_FAIL,
  IS_URL_AVAILABLE,
  IS_URL_AVAILABLE_SUCCESS,
  IS_URL_AVAILABLE_FAIL,
  RESET_NAME_AVAILABLE,
  RESET_URL_AVAILABLE,
  ADD_BILLING_INFORMATION,
  ADD_BILLING_INFORMATION_SUCCESS,
  ADD_BILLING_INFORMATION_FAIL,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_loading: false,
  portal: null,
  error: null,
  adding_billing_information: false,
  add_billing_information_error: null,
  is_updating_portal: false,
  update_portal_error: null,
  name_available_loading: false,
  name_available: "",
  name_available_error: null,
  url_available_loading: false,
  url_available: "",
  url_available_error: null,
};
export default function portalReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.initialDataReducer };
    case FETCH_PORTAL:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_PORTAL_SUCCESS:
      return {
        ...state,
        is_loading: false,
        portal: action.payload,
        error: null,
      };
    case FETCH_PORTAL_FAIL:
      return {
        ...state,
        is_loading: false,

        error: action.payload,
      };
    case UPDATE_PORTAL:
      return {
        ...state,
        is_updating_portal: true,
      };
    case UPDATE_PORTAL_SUCCESS:
      return {
        ...state,
        is_updating_portal: false,
        portal: { ...state.portal, ...action.payload },
      };
    case UPDATE_PORTAL_FAIL:
      return {
        ...state,
        is_updating_portal: false,
        update_portal_error: action.payload,
      };
    case IS_NAME_AVAILABLE:
      return {
        ...state,
        name_available_loading: true,
      };
    case IS_NAME_AVAILABLE_SUCCESS:
      return {
        ...state,
        name_available_loading: false,

        name_available: action.payload.name,
        name_available_error: null,
      };
    case IS_NAME_AVAILABLE_FAIL:
      return {
        ...state,
        name_available_loading: false,

        name_available: false,
        name_available_error: action.payload,
      };
    case RESET_NAME_AVAILABLE:
      return {
        ...state,
        name_available: false,
        name_available_error: null,
      };
    case IS_URL_AVAILABLE:
      return {
        ...state,
        url_available_loading: true,
      };
    case IS_URL_AVAILABLE_SUCCESS:
      return {
        ...state,
        url_available_loading: false,
        url_available: action.payload.url,
        url_available_error: null,
      };
    case IS_URL_AVAILABLE_FAIL:
      return {
        ...state,
        url_available_loading: false,
        url_available: false,
        url_available_error: action.payload,
      };
    case RESET_URL_AVAILABLE:
      return {
        ...state,
        url_available: false,
        url_available_error: null,
      };
    case ADD_BILLING_INFORMATION:
      return {
        ...state,
        adding_billing_information: true,
      };
    case ADD_BILLING_INFORMATION_SUCCESS:
      return {
        ...state,
        portal: action.payload,
        adding_billing_information: false,
      };
    case ADD_BILLING_INFORMATION_FAIL:
      return {
        ...state,
        adding_billing_information: false,
        add_billing_information_error: action.payload,
      };
    default:
      return state;
  }
}
