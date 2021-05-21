import React, { Fragment, useEffect, useRef, useState } from "react";
import ChatItem from "./Chat/ChatItem";
import Message from "./Chat/Message";
import { useDispatch } from "react-redux";
import { changeLastMessage, closeChats, fetchChats } from "redux/actions/chats";
import useOutsideClick from "hooks/useOutsideClick";
import { useSelector } from "react-redux";
import { resetChat } from "redux/actions/chat";
import { addMessage, fetchMoreMessages } from "redux/actions/messages";
import Link from "next/link";
import { useRouter } from "next/router";
import { io } from "socket.io-client";
import VisibilitySensor from "react-visibility-sensor";
const Chat = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const messagesRef = useRef();
  const chatsReducer = useSelector((state) => state.chatsReducer);
  const chatReducer = useSelector((state) => state.chatReducer);
  const messagesReducer = useSelector((state) => state.messagesReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  useEffect(() => {
    if (chatsReducer.is_open) {
      const handleFetchChats = async () => {
        await dispatch(fetchChats());
      };
      handleFetchChats();
    }
  }, [chatsReducer.is_open]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (chatsReducer.is_open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    setSearch("");
  }, [chatsReducer.is_open]);
  const handleCloseChats = async () => {
    await dispatch(closeChats());
  };
  useOutsideClick(messagesRef, () => handleCloseChats());

  const handleCloseChat = () => {
    dispatch(resetChat());
  };

  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setFirstLoad(false);
    if (!firstLoad && chatsReducer.is_open) {
      const timeoutId = setTimeout(() => {
        dispatch(fetchChats(search));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);
  const handleChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const chatRef = useRef();
  const handleFetchMoreMessages = () => {
    dispatch(fetchMoreMessages());
  };
  function onChangeVisibility(isVisible) {
    if (isVisible) handleFetchMoreMessages();
  }

  const handleAddMessage = async (payload) => {
    await dispatch(addMessage(payload.message));
    await dispatch(changeLastMessage(payload.roomID, payload.message.text));
  };

  const handleGoToProfile = () => {
    router.push(`/user/${chatReducer.chat?.to_user?.id}`);
    dispatch(closeChats());
  };
  const socketRef = useRef();

  useEffect(() => {
    if (initialDataReducer.data_fetched && chatReducer.chat) {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      socketRef.current = io.connect(process.env.CHAT_WS);
      socketRef.current.on("connect", () => {
        console.log("connected chat!!!!!!!!!!");
      });
      socketRef.current.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
      socketRef.current.emit("join room", chatReducer.chat?.id);

      socketRef.current.on("text", (payload) => {
        handleAddMessage(payload);
      });
    }
  }, [initialDataReducer.data_fetched, chatReducer.chat]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);
  const [message, setMessage] = useState("");
  const handleChangeMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message || message.trim().length === 0) {
      return;
    }
    const payload = {
      roomID: chatReducer.chat?.id,
      token: authReducer?.access_token,
      message: {
        text: message,
        sent_by: authReducer.user,
        files: [],
        created: Date.now(),
      },
    };
    handleAddMessage(payload);

    socketRef.current.emit("text", payload);
    setMessage("");
  };
  const messageInputRef = useRef();
  if (!chatsReducer.is_open) return <></>;
  return (
    <div className={`absolute inset-0 overflow-hidden z-40`}>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div
          ref={messagesRef}
          className={`w-screen ${
            chatReducer.chat ? "sm:w-chat max-w-4xl " : " sm:w-80"
          }`}
        >
          <div
            className={`h-full flex flex-col pt-6 bg-white dark:bg-gray-700 shadow-xl  `}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-medium text-gray-900 dark:text-white"
                  id="slide-over-title"
                >
                  Messages
                </h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    onClick={handleCloseChats}
                    className="bg-white dark:bg-gray-700 rounded-3xl text-gray-400 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-200"
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex h-full">
              <div
                className={` w-full sm:w-80 ${
                  chatReducer.chat && "min-w-auto hidden sm:block"
                }`}
              >
                <div className="flex-1 flex px-4 py-3 ">
                  <form
                    className="w-full flex md:ml-0 "
                    action="#"
                    method="GET"
                  >
                    <label htmlFor="search_field" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:text-gray-100 dark:focus-within:text-gray-200 ">
                      <div
                        className="absolute inset-y-0 left-0 flex items-center pointer-events-none dark:bg-gray-700"
                        aria-hidden="true"
                      >
                        <svg
                          className="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        value={search}
                        onChange={handleChangeSearch}
                        id="search_field"
                        name="search_field"
                        className="dark:bg-gray-700 block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                        placeholder="Search chats"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
                <ul
                  className="w-full sm:w-80 divide-y divide-gray-200 dark:divide-gray-600 overflow-y-auto h-full"
                  style={{ height: "calc(100vh - 100px);" }}
                >
                  {chatsReducer.chats.results.length === 0 && (
                    <span className="text-sm text-gray-500 dark:text-gray-100 px-4 text-center block">
                      No chats found
                    </span>
                  )}
                  {chatsReducer.chats.results.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                  ))}
                </ul>
              </div>

              <div
                className={`w-full ${chatReducer.chat ? "block" : "hidden"}`}
              >
                <div className="min-h-0 flex-1 ">
                  <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-5 rounded-t-lg">
                    <div className="px-4 flex sm:justify-between items-center ">
                      {chatReducer.chat?.to_user?.picture ? (
                        <img
                          className="hidden sm:block h-10 w-10 rounded-full  mr-4"
                          src={
                            new RegExp(
                              `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                            ).test(chatReducer.chat?.to_user?.picture)
                              ? chatReducer.chat?.to_user?.picture
                              : process.env.HOST +
                                chatReducer.chat?.to_user?.picture
                          }
                          alt=""
                        ></img>
                      ) : (
                        <span className="hidden sm:block bg-gray-100 rounded-full overflow-hidden h-10 w-10 mr-4">
                          <svg
                            className="h-10 w-10 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}

                      <div
                        onClick={handleCloseChat}
                        className="mr-4  h-8 w-8 text-white 
                                flex sm:hidden justify-center items-center rounded-full
                                cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </div>
                      <div className="sm:w-0 sm:flex-1">
                        <h1
                          onClick={handleGoToProfile}
                          id="message-heading"
                          className="text-lg font-medium text-white hover:underline cursor-pointer"
                        >
                          {chatReducer.chat?.to_user?.username}
                        </h1>
                      </div>
                    </div>
                  </div>

                  <ul
                    className="p-4  overflow-y-auto shadow-inner bg-gray-100 dark:bg-gray-800 flex flex-col-reverse overflow-hidden"
                    style={{ height: "calc(100vh - 242px)" }}
                    ref={chatRef}
                  >
                    {messagesReducer.messages.results.map((message) =>
                      message?.sent_by?.id == authReducer.user?.id ? (
                        <Message
                          message={message}
                          myMessage
                          key={message?.id}
                        />
                      ) : (
                        <Message message={message} key={message?.id} />
                      )
                    )}
                    {messagesReducer.messages.results.length > 0 &&
                      messagesReducer.messages.next && (
                        <VisibilitySensor onChange={onChangeVisibility}>
                          <div
                            className="p-3 flex justify-center"
                            onClick={handleFetchMoreMessages}
                          >
                            <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                              Load more messages
                            </span>
                          </div>
                        </VisibilitySensor>
                      )}
                  </ul>
                  <div className="h-18 bg-gray-200 dark:bg-gray-800">
                    <form
                      className="p-3 flex justify-between"
                      onSubmit={handleSendMessage}
                    >
                      {/* <button
                                type="button"
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="h-6 w-6"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                  />
                                </svg>
                              </button> */}
                      <input
                        type="text"
                        value={message}
                        onChange={handleChangeMessage}
                        id="message"
                        ref={messageInputRef}
                        name="message"
                        className="block w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl py-2 px-4 text-sm placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Mesasage"
                      />
                      <button
                        type="submit"
                        className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
