import Link from "next/link";
import { useRouter } from "next/router";
import {
  BILLING_DASHBOARD_PAGE,
  COMMUNITIES_DASHBOARD_PAGE,
  DASHBOARD_PAGE,
  POSTS_DASHBOARD_PAGE,
  SETTINGS_DASHBOARD_PAGE,
  STATISTICS_DASHBOARD_PAGE,
  USERS_DASHBOARD_PAGE,
  USER_DETAIL_DASHBOARD_PAGE,
} from "pages";
import React from "react";
import { useEffect } from "react";

const Layout = ({ page, children }) => {
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <div className="hidden w-28 bg-orange-200 overflow-y-auto md:block">
        <div className="w-full py-6 flex flex-col items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/feed">
              <img
                className="h-8 w-auto cursor-pointer"
                src="/static/images/talendy-logo.png"
                alt="Workflow"
              />
            </Link>
          </div>
          <div className="flex-1 mt-6 w-full px-2 space-y-1">
            <Link href="/dashboard">
              <span
                className={
                  page === DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  className={
                    page === DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="mt-2">Home</span>
              </span>
            </Link>
            <Link href="/dashboard/users">
              <span
                className={
                  page === USERS_DASHBOARD_PAGE ||
                  page === USER_DETAIL_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === USERS_DASHBOARD_PAGE ||
                    page === USER_DETAIL_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="mt-2">Users</span>
              </span>
            </Link>
            <Link href="/dashboard/communities">
              <span
                className={
                  page === COMMUNITIES_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === COMMUNITIES_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="mt-2">Communities</span>
              </span>
            </Link>
            <Link href="/dashboard/posts">
              <span
                className={
                  page === POSTS_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === POSTS_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="mt-2">Posts</span>
              </span>
            </Link>

            <Link href="/dashboard/statistics">
              <span
                className={
                  page === STATISTICS_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === STATISTICS_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span className="mt-2">Statistics</span>
              </span>
            </Link>
            <Link href="/dashboard/settings">
              <span
                className={
                  page === SETTINGS_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  className={
                    page === SETTINGS_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="mt-2">Settings</span>
              </span>
            </Link>
            <Link href="/dashboard/billing">
              <span
                className={
                  page === BILLING_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-500 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === BILLING_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 group-hover:text-white h-6 w-6"
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span className="mt-2">Billing</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 z-40 flex md:hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        ></div>

        <div className="relative max-w-xs w-full bg-orange-200 pt-5 pb-4 flex-1 flex flex-col">
          <div className="absolute top-1 right-0 -mr-14 p-1">
            <button
              type="button"
              className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Close sidebar</span>
            </button>
          </div>

          <div className="flex-shrink-0 px-4 flex items-center">
            <img
              className="h-8 w-auto"
              src="/static/images/talendy-logo.png"
              alt="Workflow"
            />
          </div>
          <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
            <nav className="h-full flex flex-col">
              <div className="space-y-1">
                <Link href="/dashboard">
                  <span
                    className={
                      page === DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                  >
                    <svg
                      className={
                        page === DASHBOARD_PAGE
                          ? "text-white mr-3 h-6 w-6"
                          : "text-orange-600 group-hover:text-white mr-3 h-6 w-6"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Home</span>
                  </span>
                </Link>
                <Link href="/dashboard/users">
                  <span
                    className={
                      page === USERS_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === USERS_DASHBOARD_PAGE
                          ? "text-white mr-3 h-6 w-6"
                          : "text-orange-600 group-hover:text-white mr-3 h-6 w-6"
                      }
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <span>Users</span>
                  </span>
                </Link>

                <Link href="/dashboard/communities">
                  <span
                    className={
                      page === COMMUNITIES_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === COMMUNITIES_DASHBOARD_PAGE
                          ? "text-white mr-3 h-6 w-6"
                          : "text-orange-600 group-hover:text-white mr-3 h-6 w-6"
                      }
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Communities</span>
                  </span>
                </Link>
                <Link href="/dashboard/posts">
                  <span
                    className={
                      page === POSTS_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === POSTS_DASHBOARD_PAGE
                          ? "text-white mr-3 h-6 w-6"
                          : "text-orange-600 group-hover:text-white mr-3 h-6 w-6"
                      }
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span>Posts</span>
                  </span>
                </Link>

                <Link href="/dashboard/statistics">
                  <span
                    className={
                      page === STATISTICS_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === STATISTICS_DASHBOARD_PAGE
                          ? "text-white mr-3 h-6 w-6"
                          : "text-orange-600 group-hover:text-white mr-3 h-6 w-6"
                      }
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span>Statistics</span>
                  </span>
                </Link>
                <Link href="/dashboard/settings">
                  <span
                    className={
                      page === SETTINGS_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                  >
                    <svg
                      className={
                        page === SETTINGS_DASHBOARD_PAGE
                          ? "text-white mr-3 h-6 w-6"
                          : "text-orange-600 group-hover:text-white mr-3 h-6 w-6"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Settings</span>
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="w-full">
          <div className="relative flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 md:hidden"
            >
              <span className="sr-only">Open sidebar</span>

              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </button>
            <div className="flex-1 flex justify-end px-4 sm:px-6">
              {(page === USERS_DASHBOARD_PAGE ||
                page === COMMUNITIES_DASHBOARD_PAGE ||
                page === POSTS_DASHBOARD_PAGE) && (
                <div class="flex-1 flex">
                  <form class="w-full flex md:ml-0" action="#" method="GET">
                    <label for="search_field" class="sr-only">
                      Search all files
                    </label>
                    <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                        <svg
                          class="flex-shrink-0 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        name="search_field"
                        id="search_field"
                        class="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:hidden"
                        placeholder="Search"
                        type="search"
                      />
                      <input
                        name="search_field"
                        id="search_field"
                        class="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </form>
                </div>
              )}
              <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                <div className="relative flex-shrink-0">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>

                  <div
                    className="hidden origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabindex="-1"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-0"
                    >
                      Your profile
                    </a>

                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-1"
                    >
                      Sign out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex items-stretch overflow-hidden">
          {/* Children */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
