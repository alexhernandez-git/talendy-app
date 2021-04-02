import React from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { Transition } from "@tailwindui/react";
import {
  FOLLOWED_USERS_POSTS_PAGE,
  HELPED_POSTS_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
  USER_POSTS_PAGE,
} from "pages";

const PostModal = ({ page, image, modalOpen, handleToggleModal, modalRef }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const handleOpenOptions = () => {
    setOptionsOpen(true);
  };
  const handleCloseOptions = () => {
    setOptionsOpen(false);
  };
  const handleToggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  const optionsRef = useRef();
  useOutsideClick(optionsRef, () => handleCloseOptions());

  return (
    <Transition
      show={modalOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      {(ref) => (
        <div
          ref={ref}
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <Transition
              show={modalOpen}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {(ref) => (
                <>
                  <div
                    ref={ref}
                    className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"
                    aria-hidden="true"
                  ></div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                </>
              )}
            </Transition>
            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}

            <article
              ref={modalRef}
              aria-labelledby="question-title-81614"
              className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
            >
              <div className=" grid grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                  <div>
                    <h2
                      id="question-title-81614"
                      className="text-base font-medium text-gray-900 dark:text-white"
                    >
                      What would you have done differently if you ran Jurassic
                      Park?
                    </h2>
                  </div>
                  <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4">
                    <p>
                      Jurassic Park was an incredible idea and a magnificent
                      feat of engineering, but poor protocols and a disregard
                      for human safety killed what could have otherwise been one
                      of the best businesses of our generation.
                    </p>
                    <p>
                      Ultimately, I think that if you wanted to run the park
                      successfully and keep visitors safe, the most important
                      thing to prioritize would be Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Cumque dolor eligendi,
                      culpa, quaerat earum possimus porro nam perspiciatis
                      tempora temporibus tenetur optio ipsa distinctio cum! Sunt
                      soluta veritatis nisi id?
                    </p>
                  </div>
                  {image && (
                    <div className="mt-4">
                      <img src="/static/images/freelaniumsc.png" />
                    </div>
                  )}
                  <div className="mt-6 flex justify-between space-x-8">
                    <div className="flex space-x-6">
                      <span className="inline-flex items-center text-sm">
                        <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <svg
                            className="h-5 w-5 text-orange-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="font-medium text-orange-500">
                            100 Karma
                          </span>
                          <span className="sr-only">karmas amount</span>
                        </button>
                      </span>
                    </div>
                    {(page === HOME_PAGE ||
                      page === MOST_KARMA_POSTS_PAGE ||
                      page === FOLLOWED_USERS_POSTS_PAGE ||
                      page === USER_POSTS_PAGE) && (
                      <>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100">
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                              </svg>
                              <span className="font-medium text-gray-900 dark:text-white">
                                Share
                              </span>
                            </button>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  {(page === HOME_PAGE ||
                    page === MOST_KARMA_POSTS_PAGE ||
                    page === FOLLOWED_USERS_POSTS_PAGE) && (
                    <div className="mt-6 flex justify-between space-x-8">
                      <input
                        type="text"
                        name="title"
                        onClick={(e) => e.stopPropagation()}
                        id="title"
                        className="block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-100  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        placeholder="Message"
                        aria-describedby="title-description"
                        value=""
                      />
                      <button
                        type="submit"
                        className="w-72 bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        Request to help
                      </button>
                    </div>
                  )}
                </div>
                <div className="lg:col-start-3 lg:col-span-1">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <a href="#" className="hover:underline">
                          Dries Vincent
                        </a>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-100">
                        <time dateTime="2020-12-09T11:43:00">
                          December 9 at 11:43 AM
                        </time>
                      </p>
                    </div>
                    {page === USER_POSTS_PAGE && (
                      <div className="flex-shrink-0 self-center flex">
                        <div className="relative inline-block text-left">
                          <div>
                            <button
                              onMouseDown={handleToggleOptions}
                              type="button"
                              className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                              id="options-menu-0"
                              aria-expanded="false"
                              aria-haspopup="true"
                            >
                              <span className="sr-only">Open options</span>

                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                              </svg>
                            </button>
                          </div>
                          <Transition
                            show={optionsOpen}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-out duration-100"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            {(ref) => (
                              <div
                                ref={ref}
                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu-0"
                              >
                                <div
                                  className="py-1"
                                  role="none"
                                  ref={optionsRef}
                                >
                                  <a
                                    href="#"
                                    className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                    role="menuitem"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                      <path
                                        fillRule="evenodd"
                                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span>Edit</span>
                                  </a>
                                  <a
                                    href="#"
                                    className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                    role="menuitem"
                                  >
                                    <svg
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                    <span>Delete</span>
                                  </a>
                                </div>
                              </div>
                            )}
                          </Transition>
                        </div>
                      </div>
                    )}
                  </div>
                  {(page === USER_POSTS_PAGE || page === HELPED_POSTS_PAGE) && (
                    <div className="mt-5">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        Join
                      </button>
                    </div>
                  )}
                  <div className="mt-5">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Members Helping
                    </h3>
                    <ul className="mt-2 border-t border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
                      <li className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                            Aimee Douglas
                          </p>
                        </div>
                      </li>
                      <li className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />
                          <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                            Andrea McMillan
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default PostModal;
