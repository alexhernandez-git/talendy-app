import Layout from "components/Dashboard/Layout";
import Link from "next/link";
import { USERS_DASHBOARD_PAGE } from "pages";
import React from "react";

const users = () => {
  const page = USERS_DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto">
            {/* Mobile tabs */}
            <div className="sm:hidden">
              <label for="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              >
                <option>Users</option>

                <option selected>Admins</option>
              </select>
              {/* Create user button */}
              <div className="flex justify-end items-center mt-3">
                <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  New user
                </button>
              </div>
              {/* End create user button */}
            </div>
            {/* End mobile tabs */}
            {/* Desktop tabs */}
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="flex justify-between" aria-label="Tabs">
                  <div className="-mb-px flex space-x-8">
                    <a
                      href="#"
                      className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    >
                      Users
                      <span className="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        52
                      </span>
                    </a>

                    <a
                      href="#"
                      className="border-orange-500 text-orange-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      aria-current="page"
                    >
                      Admins
                      <span className="bg-orange-100 text-orange-600 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        4
                      </span>
                    </a>
                  </div>
                  {/* Create user button */}
                  <div className="flex justify-end items-center">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      New user
                    </button>
                  </div>
                  {/* End create user button */}
                </nav>
              </div>
            </div>
            {/* End desktop tabs */}

            {/* Start users lists */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-3">
              <ul className="divide-y divide-gray-200">
                <li>
                  <Link href="/dashboard/user/123">
                    <a href="#" className="block hover:bg-gray-50">
                      <div className="flex items-center px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="text-sm font-medium text-orange-600 truncate">
                                Ricardo Cooper
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="truncate">
                                  ricardo.cooper@example.com
                                </span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">
                                  Applied on
                                  <time datetime="2020-01-07">
                                    January 7, 2020
                                  </time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <svg
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  Completed phone screening
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <svg
                            className="h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              </ul>
              {/* Pagination */}
              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination"
              >
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">10</span> of{" "}
                    <span className="font-medium">20</span> results
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="ml-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    Next
                  </a>
                </div>
              </nav>
              {/* End pagination */}
            </div>
            {/* End users lists */}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default users;
