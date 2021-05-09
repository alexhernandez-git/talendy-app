import Link from "next/link";
import { useRouter } from "next/router";
import {
  ACTIVE_USER_POSTS_PAGE,
  SOLVED_USER_POSTS_PAGE,
  USER_CONTRIBUTED_POSTS_PAGE,
  USER_CREATED_POSTS_PAGE,
  USER_POSTS_PAGE,
} from "pages";
import React from "react";

const LeftSidebar = ({ page, mobile }) => {
  const router = useRouter();
  const userId = router.query?.user;
  return (
    <div
      className={`${
        mobile ? "mx-2 xl:hidden" : "hidden xl:block  xl:col-span-2"
      }`}
    >
      <nav aria-label="Sidebar" className="divide-y divide-gray-300 mb-4">
        <div className="mb-3">
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
            <Link href={`/user/${userId}`}>
              <span
                className={`
                  ${
                    page === USER_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">All</span>
              </span>
            </Link>
            <Link href={`/user/created/${userId}`}>
              <span
                className={`
                  ${
                    page === USER_CREATED_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Created</span>
              </span>
            </Link>
            <Link href={`/user/contributed/${userId}`}>
              <span
                className={`
                  ${
                    page === USER_CONTRIBUTED_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Contributed</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="">
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <span
              className={`
                  ${
                    page === ACTIVE_USER_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
            >
              <span className="truncate">Active</span>
            </span>
            <span
              className={`
                  ${
                    page === SOLVED_USER_POSTS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
            >
              <span className="truncate">Solved</span>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
