import React from "react";
import { Transition } from "@tailwindui/react";
import ChatItem from "./Chat/ChatItem";
import Message from "./Chat/Message";

const Chat = ({ messagesOpen, messagesRef, handleToggleMessages }) => {
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
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
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
            className="fixed inset-0 overflow-hidden z-10"
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
                <div ref={messagesRef} className="w-screen max-w-4xl">
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
                            className="bg-white dark:bg-gray-700 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-200 focus:ring-2 focus:ring-orange-500"
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
                      <div className=" w-full sm:w-80 ">
                        <div class="flex-1 flex px-4 py-3 ">
                          <form
                            class="w-full flex md:ml-0 "
                            action="#"
                            method="GET"
                          >
                            <label for="search_field" class="sr-only">
                              Search
                            </label>
                            <div class="relative w-full text-gray-400 focus-within:text-gray-600 dark:text-gray-100 dark:focus-within:text-gray-200 ">
                              <div
                                class="absolute inset-y-0 left-0 flex items-center pointer-events-none dark:bg-gray-700"
                                aria-hidden="true"
                              >
                                <svg
                                  class="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </div>
                              <input
                                id="search_field"
                                name="search_field"
                                class="dark:bg-gray-700 block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
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
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                          <ChatItem />
                        </ul>
                      </div>

                      <div className="w-full ">
                        <div className="min-h-0 flex-1 ">
                          <div className="bg-gray-200 dark:bg-gray-600 pt-5 pb-6 rounded-t-lg">
                            <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
                              <div className="sm:w-0 sm:flex-1">
                                <h1
                                  id="message-heading"
                                  className="text-lg font-medium text-gray-900 dark:text-white"
                                >
                                  Leslie Alexander
                                </h1>
                                <p className="mt-1 text-sm text-gray-500 truncate dark:text-gray-200">
                                  joearmstrong@example.com
                                </p>
                              </div>
                            </div>
                          </div>

                          <ul
                            className="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8 overflow-y-auto shadow-inner bg-gray-100 dark:bg-gray-800"
                            style={{ height: "calc(100vh - 196px)" }}
                          >
                            <Message />
                            <Message />
                            <Message />
                            <Message />
                          </ul>
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
