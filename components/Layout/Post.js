import React, { useEffect } from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { Transition } from "@tailwindui/react";
import {
  ACTIVE_HELPED_IN_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
  MY_POSTS_PAGE,
  SEARCH_POSTS_PAGE,
} from "pages";
import PostModal from "./PostModal";

const Post = ({ page, image }) => {
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
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleCloseModal());
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);
  return (
    <>
      <article
        onClick={handleOpenModal}
        aria-labelledby="question-title-81614"
        className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg cursor-pointer"
      >
        <div>
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
            {page === MY_POSTS_PAGE && (
              <div className="flex-shrink-0 self-center flex">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onMouseDown={handleToggleOptions}
                      onClick={(e) => e.stopPropagation()}
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
                        <div className="py-1" role="none" ref={optionsRef}>
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
          <h2
            id="question-title-81614"
            className="mt-4 text-xl font-medium text-gray-900 dark:text-white"
          >
            What would you have done differently if you ran Jurassic Park?
          </h2>
        </div>
        <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4">
          <p>
            Jurassic Park was an incredible idea and a magnificent feat of
            engineering, but poor protocols and a disregard for human safety
            killed what could have otherwise been one of the best businesses of
            our generation.
          </p>
          <p>
            Ultimately, I think that if you wanted to run the park successfully
            and keep visitors safe, the most important thing to prioritize would
            be&hellip;
            <span className="ml-1 hover:underline cursor-pointer">
              Read more
            </span>
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
                <span className="font-medium text-orange-500">100 Karma</span>
                <span className="sr-only">karmas amount</span>
              </button>
            </span>
          </div>
          {(page === HOME_PAGE ||
            page === MOST_KARMA_POSTS_PAGE ||
            page === FOLLOWED_USERS_POSTS_PAGE ||
            page === MY_POSTS_PAGE ||
            page === ACTIVE_HELPED_IN_PAGE) && (
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
          page === FOLLOWED_USERS_POSTS_PAGE ||
          page === SEARCH_POSTS_PAGE) && (
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
      </article>
      <PostModal
        page={page}
        image={image}
        modalOpen={modalOpen}
        handleToggleModal={handleToggleModal}
        modalRef={modalRef}
      />
    </>
  );
};

export default Post;
