import React from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { Transition } from "@tailwindui/react";
import {
  CONNECTIONS_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  SEARCH_USERS_PAGE,
} from "pages";

const User = ({ page }) => {
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
    <article
      aria-labelledby="question-title-81614"
      className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex space-x-3 items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              <a href="#" className="hover:underline">
                Dries Vincent
              </a>
            </p>
            <span className="inline-flex items-center text-sm">
              <svg
                className="h-5 w-5 text-orange-500 mr-1"
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
              <span className="font-medium text-orange-500">10000 Karma</span>
              <span className="sr-only">karmas amount</span>
            </span>
          </div>
        </div>
        {page === SEARCH_USERS_PAGE && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
          >
            Follow
          </button>
        )}
        {page === PEOPLE_I_FOLLOW_PAGE && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-orange-500 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
          >
            Unfollow
          </button>
        )}
        {page === CONNECTIONS_PAGE && (
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
          >
            Message
          </button>
        )}
      </div>
    </article>
  );
};

export default User;
