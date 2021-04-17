import React from "react";
import Link from "next/link";
import {
  MY_NETWORK_PAGE,
  CONTRIBUTED,
  MY_ISSUES_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  CONNECTIONS_PAGE,
  ACTIVE_CONTRIBUTED,
  CLOSED_CONTRIBUTED,
} from "pages";

const ProfileMenu = ({ page }) => {
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
          <Link href="/profile/issues">
            <a
              aria-current="page"
              className={`${
                page === MY_ISSUES_PAGE ? "text-gray-900" : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative  hover:text-gray-700 dark:hover:bg-gray-800 min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
            >
              <span>My Issues</span>
              {page === MY_ISSUES_PAGE ? (
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
          <Link href="/profile/contributed">
            <a
              className={`${
                page === CONTRIBUTED ||
                page === ACTIVE_CONTRIBUTED ||
                page === CLOSED_CONTRIBUTED
                  ? "text-gray-900"
                  : "text-gray-500"
              } dark:text-white group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Contributed</span>
              {page === CONTRIBUTED ||
              page === ACTIVE_CONTRIBUTED ||
              page === CLOSED_CONTRIBUTED ? (
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

          <Link href="/profile/mynetwork">
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
