import Layout from "components/Dashboard/Layout";
import { POSTS_DASHBOARD_PAGE } from "pages";
import React from "react";
import Link from "next/link";

const posts = () => {
  const page = POSTS_DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      {" "}
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto">
            {/* Create user button */}
            <div className="flex justify-end items-center mb-2">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New posts
              </button>
            </div>

            {/* Start users lists */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-3">
              <ul className="divide-y divide-gray-200">
                <li>
                  <a
                    target="_blank"
                    href="/user/122"
                    className="block hover:bg-gray-50"
                  >
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="min-w-0 flex-1 pr-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-orange-600 truncate">
                              Post ttitleaiffeaw Lorem ipsum dolor sit amet
                              conecessitatibus alias dolores eligendi odit
                              nostrum?
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="truncate">Ricardo cooper</span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                Created on{" "}
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
                                Active
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

export default posts;
