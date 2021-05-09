import { useRouter } from "next/router";
import Link from "next/link";
import { SEARCH_USERS_PAGE, SEARCH_POSTS_PAGE } from "pages";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SearchMenu = ({ page }) => {
  const router = useRouter();
  const authReducer = useSelector((state) => state.authReducer);
  const communitiesReducer = useSelector((state) => state.communitiesReducer);
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
    <>
      <nav className="flex mb-4 mx-4 sm:mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link href={authReducer.is_authenticated ? "/feed" : "/"}>
                <span className="cursor-pointer text-gray-400 hover:text-gray-500">
                  <svg
                    className="flex-shrink-0 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">Home</span>
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="ml-4 text-sm font-medium text-orange-500"
                aria-current="page"
              >
                {router.query?.search
                  ? router.query.search
                  : page === SEARCH_POSTS_PAGE
                  ? authReducer.community
                    ? communitiesReducer.communities.find(
                        (community_item) =>
                          community_item.id === authReducer.community
                      )?.name
                    : "Posts"
                  : "Users"}
              </span>
            </div>
          </li>
        </ol>
      </nav>
      {authReducer.is_authenticated && (
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
                    page === SEARCH_POSTS_PAGE
                      ? "text-gray-900"
                      : "text-gray-500"
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
                    page === SEARCH_USERS_PAGE
                      ? "text-gray-900"
                      : "text-gray-500"
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
      )}
    </>
  );
};

export default SearchMenu;
