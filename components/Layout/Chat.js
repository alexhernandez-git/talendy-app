import React, { useEffect, useState } from "react";
import { Transition } from "@tailwindui/react";
import ChatItem from "./Chat/ChatItem";
import Message from "./Chat/Message";
import { useDispatch } from "react-redux";
import { fetchChats } from "redux/actions/chats";

const Chat = ({ messagesOpen, messagesRef, handleToggleMessages }) => {
  const dispatch = useDispatch();
  const [chatOpen, setChatOpen] = useState(false);
  const handleOpenChat = () => {
    setChatOpen(true);
  };
  const handleCloseChat = () => {
    setChatOpen(false);
  };

  useEffect(() => {
    if (messagesOpen) {
      console.log("entra");
      const handleFetchChats = async () => {
        await dispatch(fetchChats());
      };
      handleFetchChats();
    }
  }, [messagesOpen]);
  return (
    <>
      <Transition
        show={messagesOpen}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div
            ref={ref}
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-40"
            aria-hidden="true"
          ></div>
        )}
      </Transition>
      <Transition
        show={messagesOpen}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        {(ref) => (
          <section
            ref={ref}
            className="fixed inset-0 overflow-hidden z-50"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0" aria-hidden="true"></div>

              <div className="absolute inset-y-0 right-0 pl-0 max-w-full flex sm:pl-16">
                {/* <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      --> */}
                <div
                  ref={messagesRef}
                  className={`w-screen transition-width  transform ease-in-out duration-500 sm:duration-700 ${
                    chatOpen ? "sm:w-chat max-w-4xl " : " sm:w-80"
                  } `}
                >
                  <div className="h-full flex flex-col pt-6 bg-white dark:bg-gray-700 shadow-xl">
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
                            onClick={handleToggleMessages}
                            className="bg-white dark:bg-gray-700 rounded-3xl text-gray-400 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-200 focus:ring-2 focus:ring-orange-500"
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
                          chatOpen && "hidden sm:block"
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
                          className="divide-y divide-gray-200 dark:divide-gray-600 overflow-y-auto h-full"
                          style={{ height: "calc(100vh - 100px);" }}
                        >
                          <li onClick={handleOpenChat}>
                            <ChatItem />
                          </li>
                          <li onClick={handleOpenChat}>
                            <ChatItem />
                          </li>
                          <li onClick={handleOpenChat}>
                            <ChatItem />
                          </li>
                          <li onClick={handleOpenChat}>
                            <ChatItem />
                          </li>
                          <li onClick={handleOpenChat}>
                            <ChatItem />
                          </li>
                        </ul>
                      </div>

                      <div className={`w-full`}>
                        <div className="min-h-0 flex-1 ">
                          <div className="bg-gradient-to-r from-orange-500 to-pink-500 py-5 rounded-t-lg">
                            <div className="px-4 flex sm:justify-between items-center ">
                              <div
                                onClick={handleCloseChat}
                                className="mr-4  h-8 w-8 text-white 
                                flex justify-center items-center rounded-full
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
                                  id="message-heading"
                                  className="text-lg font-medium text-white"
                                >
                                  Leslie Alexander
                                </h1>
                              </div>
                            </div>
                          </div>

                          <ul
                            className="p-4  overflow-y-auto shadow-inner bg-gray-100 dark:bg-gray-800 flex flex-col-reverse"
                            style={{ height: "calc(100vh - 238px)" }}
                          >
                            <Message myMessage />
                            <Message />
                            <Message myMessage />
                          </ul>
                          <div className="h-18 bg-gray-200 dark:bg-gray-800">
                            <div className="p-3 flex justify-between">
                              <button
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
                              </button>
                              <input
                                type="text"
                                id="message"
                                name="message"
                                className="block w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl py-2 px-4 text-sm placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                placeholder="Mesasage"
                              />
                              <button className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
                                Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Transition>
    </>
  );
};

export default Chat;
