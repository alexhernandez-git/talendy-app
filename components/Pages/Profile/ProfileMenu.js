import React from "react";
import Link from "next/link";
import {
  MY_NETWORK_PAGE,
  HELPED_IN_PAGE,
  MY_POSTS_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  CONNECTIONS_PAGE,
  ACTIVE_HELPED_IN_PAGE,
  CLOSED_HELPED_IN_PAGE,
} from "pages";

const ProfileMenu = ({ page }) => {
  return (
    <div className="px-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="question-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="question-tabs"
          className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
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
          <Link href="/user/posts">
            <a
              aria-current="page"
              className={`${
                page === MY_POSTS_PAGE ? "text-gray-900" : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative  hover:text-gray-700 dark:hover:bg-gray-800 min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
            >
              <span>My Posts</span>
              {page === MY_POSTS_PAGE ? (
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
          <Link href="/user/helpedin">
            <a
              className={`${
                page === HELPED_IN_PAGE ||
                page === ACTIVE_HELPED_IN_PAGE ||
                page === CLOSED_HELPED_IN_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              } dark:text-white group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Helped in</span>
              {page === HELPED_IN_PAGE ||
              page === ACTIVE_HELPED_IN_PAGE ||
              page === CLOSED_HELPED_IN_PAGE ? (
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

          <Link href="/user/mynetwork">
            <a
              className={`${
                page === MY_NETWORK_PAGE ||
                page === CONNECTIONS_PAGE ||
                page === PEOPLE_I_FOLLOW_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              }  dark:text-white  rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>My Network</span>
              {page === MY_NETWORK_PAGE ||
              page === CONNECTIONS_PAGE ||
              page === PEOPLE_I_FOLLOW_PAGE ? (
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

export default ProfileMenu;
