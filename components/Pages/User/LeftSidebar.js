import Link from "next/link";
import {
  ACTIVE_CONTRIBUTED,
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_CONTRIBUTED,
  CLOSED_POSTS_PROFILE_PAGE,
  PROFILE_PAGE,
} from "pages";
import React from "react";

const LeftSidebar = ({ page }) => {
  return (
    <div className="hidden xl:block  xl:col-span-2">
      <nav aria-label="Sidebar" className="divide-y divide-gray-300">
        <div className="">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            id="communities-headline"
          >
            Posts
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <Link href="/user/posts/123">
              <span
                className={`
                  ${
                    page === PROFILE_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900 dark:hover:text-gray-900`}
              >
                <span className="truncate">All</span>
                <span>30</span>
              </span>
            </Link>
            <Link href="/user/posts/active/123">
              <span
                className={`
                  ${
                    page === ACTIVE_POSTS_PROFILE_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900 dark:hover:text-gray-900`}
              >
                <span className="truncate">Active</span>
                <span>10</span>
              </span>
            </Link>
            <Link href="/user/posts/closed/123">
              <span
                className={`
                  ${
                    page === CLOSED_POSTS_PROFILE_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900 dark:hover:text-gray-900`}
              >
                <span className="truncate">Solved</span>
                <span>20</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
