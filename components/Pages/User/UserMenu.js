import React from "react";
import Link from "next/link";
import {
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_POSTS_PROFILE_PAGE,
  PROFILE_PAGE,
  PROFILE_PORTFOLIO_PAGE,
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
          <Link href="/user/123">
            <a
              aria-current="page"
              className={`${
                page === PROFILE_PORTFOLIO_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative  hover:text-gray-700 dark:hover:bg-gray-800 min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
            >
              <span>Portfolio</span>
              {page === PROFILE_PORTFOLIO_PAGE ? (
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

          <Link href="/profile/posts/123">
            <a
              className={`${
                page === PROFILE_PAGE ||
                page === ACTIVE_POSTS_PROFILE_PAGE ||
                page === CLOSED_POSTS_PROFILE_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              }  dark:text-white  rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Posts</span>
              {page === PROFILE_PAGE ||
              page === ACTIVE_POSTS_PROFILE_PAGE ||
              page === CLOSED_POSTS_PROFILE_PAGE ? (
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
