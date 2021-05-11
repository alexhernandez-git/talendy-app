import React from "react";
import Link from "next/link";
import { USER_POSTS_PAGE, USER_CONTRIBUTED_POSTS_PAGE } from "pages";
import { useRouter } from "next/router";
import { useState } from "react";

const UserMenu = ({ page }) => {
  const [menuValue, setMenuValue] = useState(page);
  const router = useRouter();
  const userId = router.query?.user;
  const handleChangeMobileMenu = (e) => {
    e.preventDefault();

    switch (e.target.value) {
      case USER_POSTS_PAGE:
        router.push(`/user/contributed/${userId}`);
        break;
      case USER_CONTRIBUTED_POSTS_PAGE:
        router.push(`/user/${userId}`);
        break;
    }
    setMenuValue(e.target.value);
  };
  return (
    <div className="px-4 mb-4 sm:px-0">
      <div className="sm:hidden">
        <label htmlFor="question-tabs" className="sr-only">
          Select a tab
        </label>
        <select
          onChange={handleChangeMobileMenu}
          value={menuValue}
          id="question-tabs"
          className="block w-full rounded-3xl border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
        >
          <option value={USER_POSTS_PAGE}>Posts</option>
          <option value={USER_CONTRIBUTED_POSTS_PAGE}>Contributed</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          <Link href={`/user/${userId}`}>
            <a
              className={`${
                page === USER_POSTS_PAGE ? "text-gray-900" : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative  hover:text-gray-700 dark:hover:bg-gray-800 min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10`}
            >
              <div className="flex items-center justify-center">
                <span>Posts</span>
                {/* <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  3
                </span> */}
              </div>
              {page === USER_POSTS_PAGE ? (
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
          <Link href={`/user/contributed/${userId}`}>
            <a
              aria-current="page"
              className={`${
                page === USER_CONTRIBUTED_POSTS_PAGE
                  ? "text-gray-900"
                  : "text-gray-500"
              }  dark:text-white  rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <div className="flex items-center justify-center">
                <span>Contributed</span>
                {/* <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                  20
                </span> */}
              </div>
              {page === USER_CONTRIBUTED_POSTS_PAGE ? (
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

export default UserMenu;
