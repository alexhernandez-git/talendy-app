import {
  FETCH_CONNECTIONS,
  FETCH_CONNECTIONS_SUCCESS,
  FETCH_CONNECTIONS_FAIL,
  REMOVE_CONNECTION,
  REMOVE_CONNECTION_SUCCESS,
  REMOVE_CONNECTION_FAIL,
} from "../types";

const initialState = {
  is_loading: false,
  connections: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  is_removing_connection: false,
  remove_connection_error: null,
};
export default function connectionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONNECTIONS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_CONNECTIONS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        connections: action.payload,
        error: null,
      };
    case FETCH_CONNECTIONS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case REMOVE_CONNECTION:
      return {
        ...state,
        is_removing_connection: true,
      };
    case REMOVE_CONNECTION_SUCCESS:
      console.log(action.payload);

      return {
        ...state,
        is_removing_connection: false,
        connections: {
          ...state.connections,
          results: state.connections.results.filter(
            (connection) =>
              connection.requester.id !== action.payload &&
              connection.addressee.id !== action.payload
          ),
        },
        remove_connection_error: null,
      };
    case REMOVE_CONNECTION_FAIL:
      return {
        ...state,
        is_removing_connection: false,
        remove_connection_error: action.payload,
      };

    default:
      return state;
  }
}
