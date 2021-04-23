import {
  CREATE_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAIL,
  FETCH_CHATS,
  FETCH_CHATS_SUCCESS,
  FETCH_CHATS_FAIL,
  SET_CURRENT_CHAT,
  REMOVE_CURRENT_CHAT,
  SET_SEEN_CHAT,
  CHANGE_LAST_MESSAGE,
  NEW_MESSAGE_EVENT,
  ADD_CHAT_TO_FEED,
  ADD_CHAT_TO_FEED_SUCCESS,
  ADD_CHAT_TO_FEED_FAIL,
  OPEN_CHATS,
  CLOSE_CHATS,
} from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  is_open: false,
  is_loading: false,
  chats: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  error: null,
  creating_chat: false,
  create_chat_error: null,
  adding_chat_to_feed: false,
  add_chat_to_feed_error: null,
  current_chat: null,
};
export default function chatsReducer(state = initialState, action) {
  switch (action.type) {
    // case HYDRATE:
    //   // Attention! This will overwrite client state! Real apps should use proper reconciliation.
    //   return { ...state, ...action.payload.chatsReducer };
    case OPEN_CHATS:
      return {
        ...state,
        is_open: true,
      };
    case CLOSE_CHATS:
      return {
        ...state,
        is_open: false,
      };
    case FETCH_CHATS:
      return {
        ...state,
        is_loading: true,
      };
    case FETCH_CHATS_SUCCESS:
      return {
        ...state,
        is_loading: false,
        chats: {
          ...action.payload,
        },
        error: null,
      };
    case FETCH_CHATS_FAIL:
      return {
        ...state,
        is_loading: false,
        error: action.payload,
      };
    case CREATE_CHAT:
      return {
        ...state,
        creating_chat: true,
      };
    case CREATE_CHAT_SUCCESS:
      return {
        ...state,
        creating_chat: false,
        create_chat_error: null,
      };
    case CREATE_CHAT_FAIL:
      return {
        ...state,
        creating_chat: false,
        create_chat_error: action.payload,
      };
    case SET_CURRENT_CHAT:
      return {
        ...state,
        current_chat: action.payload,
      };
    case REMOVE_CURRENT_CHAT:
      return {
        ...state,
        current_chat: null,
      };
    case CHANGE_LAST_MESSAGE:
      // Select the chat to pass to first
      const changeChatSelected = state.chats.results.find(
        (chat) => chat.id == action.payload.chat__id
      );

      // Set the chats state array into a const to mutate
      const newChangeChatsArray = state.chats.results;

      // Get the selected chat index
      const changeChatIndex = newChangeChatsArray.findIndex(
        (chat) => chat.id === changeChatSelected.id
      );

      // Delete the chat selected from chats array
      newChangeChatsArray.splice(changeChatIndex, 1);

      // Insert the chat selected in the first place
      newChangeChatsArray.unshift(changeChatSelected);

      return {
        ...state,
        chats: {
          ...state.chats,
          results: newChangeChatsArray.map((chat) =>
            chat.id == action.payload.chat__id
              ? { ...chat, last_message: action.payload.message__text }
              : chat
          ),
        },
      };
    case SET_SEEN_CHAT:
      return {
        ...state,
        chats: {
          ...state.chats,
          results: state.chats.results.map((chat) =>
            chat.id == action.payload
              ? { ...chat, last_message_seen: true }
              : chat
          ),
        },
      };
    case NEW_MESSAGE_EVENT:
      // Select the chat to pass to first
      const chatSelected = state.chats.results.find(
        (chat) => chat.id == action.payload.chat__id
      );

      // Set the chats state array into a const to mutate
      const newChatsArray = state.chats.results;

      // Get the selected chat index
      const chatIndex = newChatsArray.findIndex(
        (chat) => chat.id === chatSelected.id
      );

      // Delete the chat selected from chats array
      newChatsArray.splice(chatIndex, 1);

      // Insert the chat selected in the first place
      newChatsArray.unshift(chatSelected);

      return {
        ...state,
        chats: {
          ...state.chats,
          results: newChatsArray.map((chat) =>
            chat.id == action.payload.chat__id
              ? {
                  ...chat,
                  last_message_seen: false,
                  last_message: action.payload.message__text,
                }
              : chat
          ),
        },
      };
    case ADD_CHAT_TO_FEED:
      return {
        ...state,
        adding_chat_to_feed: true,
      };
    case ADD_CHAT_TO_FEED_SUCCESS:
      const chatAddedArray = state.chats.results;
      chatAddedArray.unshift(action.payload);
      return {
        ...state,
        chats: {
          ...state.chats,
          results: chatAddedArray,
        },
        adding_chat_to_feed: false,
        add_chat_to_feed_error: null,
      };
    case ADD_CHAT_TO_FEED_FAIL:
      return {
        ...state,
        adding_chat_to_feed: false,
        add_chat_to_feed_error: null,
      };
    default:
      return state;
  }
}
