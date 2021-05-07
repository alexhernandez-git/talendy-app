import { useRouter } from "next/router";
import Link from "next/link";
import { SEARCH_USERS_PAGE, SEARCH_POSTS_PAGE } from "pages";
import React from "react";
import { useState } from "react";

const SearchMenu = ({ page }) => {
  const router = useRouter();
  const search =
    router?.query?.search?.length > 0 ? router.query.search[0] : "";
  const [menuValue, setMenuValue] = useState(page);
  const handleChangeMobileMenu = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    switch (e.target.value) {
      case SEARCH_POSTS_PAGE:
        router.push(`/search/${search}`);
        break;
      case SEARCH_USERS_PAGE:
        router.push(`/search/users/${search}`);
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
          <option value={SEARCH_POSTS_PAGE}>Posts</option>

          <option value={SEARCH_USERS_PAGE}>Users</option>
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          <Link href={`/search/${search}`}>
            <a
              aria-current="page"
              className={`${
                page === SEARCH_POSTS_PAGE ? "text-gray-900" : "text-gray-500"
              }  dark:text-white rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Posts</span>
              {page === SEARCH_POSTS_PAGE ? (
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

          <Link href={`/search/users/${search}`}>
            <a
              className={`${
                page === SEARCH_USERS_PAGE ? "text-gray-900" : "text-gray-500"
              }  dark:text-white rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-700  py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10  hover:text-gray-700 dark:hover:bg-gray-800`}
            >
              <span>Users</span>
              {page === SEARCH_USERS_PAGE ? (
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

export default SearchMenu;
