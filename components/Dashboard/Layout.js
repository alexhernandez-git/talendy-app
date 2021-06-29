import { useAlert } from "hooks/useAlert";
import useOutsideClick from "hooks/useOutsideClick";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BILLING_DASHBOARD_PAGE,
  COMMUNITIES_DASHBOARD_PAGE,
  DASHBOARD_PAGE,
  POSTS_DASHBOARD_PAGE,
  SETTINGS_DASHBOARD_PAGE,
  STATISTICS_DASHBOARD_PAGE,
  MEMBERS_DASHBOARD_PAGE,
  USER_DETAIL_DASHBOARD_PAGE,
} from "pages";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "redux/actions/auth";

const Layout = ({ page, search, setSearch, children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignOut = () => {
    dispatch(logout());
    router.push("/");
  };
  const alert = useAlert();
  const authReducer = useSelector((state) => state.authReducer);

  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpenMenu = () => {
    setMenuOpen(true);
  };
  const handleCloseMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const menuRef = useRef();
  useOutsideClick(menuRef, () => handleCloseMenu());
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {alert}
      <div className="hidden w-28 bg-orange-200 dark:bg-orange-400 overflow-y-auto md:block">
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
                    ? "cursor-pointer bg-orange-400 dark:bg-orange-300 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 dark:text-white hover:bg-orange-400 dark:hover:bg-orange-300 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 dark:text-white group-hover:text-white h-6 w-6"
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="mt-2">Home</span>
              </span>
            </Link>
            <Link href="/dashboard/members">
              <span
                className={
                  page === MEMBERS_DASHBOARD_PAGE ||
                  page === USER_DETAIL_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-400 dark:bg-orange-300 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 dark:text-white hover:bg-orange-400 dark:hover:bg-orange-300 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
                aria-current="page"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === MEMBERS_DASHBOARD_PAGE ||
                    page === USER_DETAIL_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 dark:text-white group-hover:text-white h-6 w-6"
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
                <span className="mt-2">Members</span>
              </span>
            </Link>
            <Link href="/dashboard/communities">
              <span
                className={
                  page === COMMUNITIES_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-400 dark:bg-orange-300 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 dark:text-white hover:bg-orange-400 dark:hover:bg-orange-300 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === COMMUNITIES_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 dark:text-white group-hover:text-white h-6 w-6"
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
                    ? "cursor-pointer bg-orange-400 dark:bg-orange-300 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 dark:text-white hover:bg-orange-400 dark:hover:bg-orange-300 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === POSTS_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 dark:text-white group-hover:text-white h-6 w-6"
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

            <Link href="/dashboard/settings">
              <span
                className={
                  page === SETTINGS_DASHBOARD_PAGE
                    ? "cursor-pointer bg-orange-400 dark:bg-orange-300 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 dark:text-white hover:bg-orange-400 dark:hover:bg-orange-300 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  className={
                    page === SETTINGS_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 dark:text-white group-hover:text-white h-6 w-6"
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
                    ? "cursor-pointer bg-orange-400 dark:bg-orange-300 text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                    : "cursor-pointer text-orange-600 dark:text-white hover:bg-orange-400 dark:hover:bg-orange-300 hover:text-white group w-full p-3 rounded-md flex flex-col items-center text-xs font-medium"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={
                    page === BILLING_DASHBOARD_PAGE
                      ? "text-white h-6 w-6"
                      : "text-orange-600 dark:text-white group-hover:text-white h-6 w-6"
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
        className={`fixed inset-0 z-40 flex ${menuOpen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
        ></div>

        <div
          className="relative max-w-xs w-full bg-orange-200 pt-5 pb-4 flex-1 flex flex-col"
          ref={menuRef}
        >
          <div
            className="absolute top-1 right-0 -mr-14 p-1"
            onClick={handleCloseMenu}
          >
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
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === DASHBOARD_PAGE
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
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Home</span>
                  </span>
                </Link>

                <Link href="/dashboard/members">
                  <span
                    className={
                      page === MEMBERS_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === MEMBERS_DASHBOARD_PAGE
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
                    <span>Members</span>
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
                <Link href="/dashboard/billing">
                  <span
                    className={
                      page === BILLING_DASHBOARD_PAGE
                        ? "cursor-pointer bg-orange-500 text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                        : "cursor-pointer text-orange-600 hover:bg-orange-500 hover:text-white group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        page === BILLING_DASHBOARD_PAGE
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
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    <span>Billing</span>
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
          <div className="relative flex-shrink-0 h-16 bg-white dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 shadow-sm flex">
            <button
              type="button"
              onMouseDown={handleToggleMenu}
              className="border-r border-gray-200 dark:border-gray-600 px-4 text-gray-500 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 md:hidden"
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

            <div className="flex items-center justify-between w-full  px-4 sm:px-6">
              <div className="flex-1 flex justify-start">
                <div className="hidden md:flex items-center space-x-4 sm:space-x-6">
                  <div className="relative flex-shrink-0">
                    <div>
                      <Link href="/">
                        <button
                          type="button"
                          className=" rounded-full flex text-md items-center text-gray-500 dark:text-gray-100"
                          id="user-menu-button"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>

                          <span>Feed</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {(page === POSTS_DASHBOARD_PAGE ||
                  page === MEMBERS_DASHBOARD_PAGE ||
                  page === COMMUNITIES_DASHBOARD_PAGE) && (
                  <div className="flex-1 flex md:border-l dark:border-gray-600 sm:ml-4 sm:pl-4">
                    <form
                      className="w-full flex md:ml-0"
                      action="#"
                      method="GET"
                    >
                      <label for="search_field" className="sr-only">
                        Search all portals
                      </label>
                      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                          <svg
                            className="flex-shrink-0 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          name="search_field"
                          id="search_field"
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                          className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base dark:bg-gray-700  dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-400  focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-600  sm:hidden"
                          placeholder="Search"
                          type="search"
                        />
                        <input
                          name="search_field"
                          onChange={(e) => setSearch(e.target.value)}
                          value={search}
                          id="search_field"
                          className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-base  dark:bg-gray-700  dark:text-white text-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 dark:focus:placeholder-gray-600 sm:block"
                          placeholder="Search"
                          type="search"
                        />
                      </div>
                    </form>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="relative flex-shrink-0">
                  <div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="rounded-full flex text-md items-center text-gray-500 dark:text-gray-100"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign out</span>
                    </button>
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
