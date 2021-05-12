import Link from "next/link";
import {
  ACTIVE_CONTRIBUTED_POSTS_PAGE,
  SOLVED_CONTRIBUTED_POSTS_PAGE,
  CONTRIBUTED_POSTS_PAGE,
  MY_ACTIVE_POSTS_PAGE,
  MY_POSTS_PAGE,
  MY_SOLVED_POSTS_PAGE,
} from "pages";
import React from "react";
import { useSelector } from "react-redux";

const LeftSidebar = ({ page, mobile }) => {
  const authReducer = useSelector((state) => state.authReducer);
  return (
    <div
      className={`${
        mobile ? "mx-2 xl:hidden" : "hidden xl:block  xl:col-span-2"
      }`}
    >
      <nav aria-label="Sidebar" className="divide-y divide-gray-300">
        <div className="">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            id="communities-headline"
          >
            MY POSTS
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <Link href="/profile/posts">
              <span
                className={`
                  ${
                    page === MY_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">All</span>
                <span>{authReducer.user?.created_posts_count}</span>
              </span>
            </Link>
            <Link href="/profile/posts/active">
              <span
                className={`
                  ${
                    page === MY_ACTIVE_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Active</span>
                <span>{authReducer.user?.created_active_posts_count}</span>
              </span>
            </Link>
            <Link href="/profile/posts/solved">
              <span
                className={`
                  ${
                    page === MY_SOLVED_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Solved</span>
                <span>{authReducer.user?.created_solved_posts_count}</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
