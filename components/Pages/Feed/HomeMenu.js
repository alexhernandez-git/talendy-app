import Link from "next/link";
import {
  FOLLOWED_USERS_POSTS_PAGE,
  FEED_PAGE,
  MOST_KARMA_POSTS_PAGE,
} from "pages";
import React from "react";

const HomeMenu = ({ page }) => {
  return (
    <div className="px-4 mb-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="question-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="question-tabs"
          className="block w-full rounded-3xl border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
        >
          <option>Recent</option>

          <option>Most Karma</option>

          <option>Most Followed</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          <Link href="/feed">
            <a
              aria-current="page"
              className={`${
                page === FEED_PAGE ? "text-gray-900" : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Recent</span>
              {page === FEED_PAGE ? (
                <span
                  aria-hidden="true"
                  className="bg-orange-500 absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              ) : (
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              )}
            </a>
          </Link>
          <Link href="/most-karmas">
            <a
              className={`${
                page === MOST_KARMA_POSTS_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              } dark:text-white group  hover:text-gray-700 dark:hover:bg-gray-800 relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700 py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
            >
              <span>Most Karma</span>
              {page === MOST_KARMA_POSTS_PAGE ? (
                <span
                  aria-hidden="true"
                  className="bg-orange-500 absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              ) : (
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              )}
            </a>
          </Link>
          <Link href="/followed">
            <a
              className={`${
                page === FOLLOWED_USERS_POSTS_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              }  dark:text-white rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Followed</span>
              {page === FOLLOWED_USERS_POSTS_PAGE ? (
                <span
                  aria-hidden="true"
                  className="bg-orange-500 absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              ) : (
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              )}
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default HomeMenu;
