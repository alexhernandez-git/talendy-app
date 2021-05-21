import React, { useState } from "react";
import Link from "next/link";
import {
  MY_NETWORK_PAGE,
  CONTRIBUTED_POSTS_PAGE,
  MY_POSTS_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  CONNECTIONS_PAGE,
  ACTIVE_CONTRIBUTED_POSTS_PAGE,
  SOLVED_CONTRIBUTED_POSTS_PAGE,
  MY_ACTIVE_POSTS_PAGE,
  MY_SOLVED_POSTS_PAGE,
} from "pages";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProfileMenu = ({ page }) => {
  const [menuValue, setMenuValue] = useState(page);
  const router = useRouter();
  const handleChangeMobileMenu = (e) => {
    e.preventDefault();

    switch (e.target.value) {
      case MY_POSTS_PAGE:
        router.push(`/profile/posts`);
        break;
      case CONTRIBUTED_POSTS_PAGE:
        router.push(`/profile/collaborated`);
        break;
      case MY_NETWORK_PAGE:
        router.push(`/profile/mynetwork`);

        break;
    }
    setMenuValue(e.target.value);
  };
  const authReducer = useSelector((state) => state.authReducer);
  return (
    <div className="px-4 mb-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="question-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="question-tabs"
          onChange={handleChangeMobileMenu}
          value={menuValue}
          className="block w-full rounded-3xl border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
        >
          <option value={MY_POSTS_PAGE}>My Posts</option>

          <option value={CONTRIBUTED_POSTS_PAGE}>Collaborated</option>

          <option value={MY_NETWORK_PAGE}>My Network</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          <Link href="/profile/posts">
            <a
              aria-current="page"
              className={`${
                page === MY_POSTS_PAGE ||
                page === MY_ACTIVE_POSTS_PAGE ||
                page === MY_SOLVED_POSTS_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative  hover:text-gray-700 dark:hover:bg-gray-800 min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
            >
              <span>
                My Posts
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  <span>{authReducer.user?.created_posts_count}</span>
                </span>
              </span>
              {page === MY_POSTS_PAGE ||
              page === MY_ACTIVE_POSTS_PAGE ||
              page === MY_SOLVED_POSTS_PAGE ? (
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
          <Link href="/profile/collaborated">
            <a
              className={`${
                page === CONTRIBUTED_POSTS_PAGE ||
                page === ACTIVE_CONTRIBUTED_POSTS_PAGE ||
                page === SOLVED_CONTRIBUTED_POSTS_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              } dark:text-white group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>
                Collaborated
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  <span>{authReducer.user?.collaborated_posts_count}</span>
                </span>
              </span>
              {page === CONTRIBUTED_POSTS_PAGE ||
              page === ACTIVE_CONTRIBUTED_POSTS_PAGE ||
              page === SOLVED_CONTRIBUTED_POSTS_PAGE ? (
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
