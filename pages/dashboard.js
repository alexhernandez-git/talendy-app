import Layout from "components/Dashboard/Layout";
import { DASHBOARD_PAGE } from "pages";
import React from "react";
import Link from "next/link";
const dashboard = () => {
  const page = DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto px-4">
        <div class="mt-8">
          <div class="max-w-6xl mx-auto">
            <div class="md:flex md:items-center md:justify-between md:space-x-5">
              <div class="flex items-start space-x-5">
                <div class="flex-shrink-0">
                  <div class="relative">
                    <span className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 p-2 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <span
                      class="absolute inset-0 shadow-inner rounded-full"
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>

                <div class="pt-1.5">
                  <h1 class="text-2xl font-bold text-gray-900">CESF</h1>
                  <p class="text-sm font-medium text-gray-500">
                    Created at{" "}
                    <time datetime="2020-08-25">August 25, 2020</time>
                  </p>
                </div>
              </div>
              <div class="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <Link href="/dashboard/settings">
                  <button
                    type="button"
                    class="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    Settings
                  </button>
                </Link>
              </div>
            </div>{" "}
            <div>
              <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div class="absolute  bg-gradient-to-r from-orange-500 to-pink-500 rounded-md p-3">
                      <svg
                        class="h-6 w-6 text-white"
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
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <p class="ml-16 text-sm font-medium text-gray-500 truncate">
                      Total Users
                    </p>
                  </dt>
                  <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p class="text-2xl font-semibold text-gray-900">10</p>
                    <span class="ml-2 text-sm font-medium text-gray-500">
                      of 50
                    </span>
                    <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div class="text-sm">
                        <Link href="/dashboard/users">
                          <span class="cursor-pointer font-medium text-orange-600 hover:text-orange-500">
                            {" "}
                            View all
                            <span class="sr-only">
                              {" "}
                              Total Subscribers stats
                            </span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </dd>
                </div>

                <div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div class="absolute  bg-gradient-to-r from-orange-500 to-pink-500 rounded-md p-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 text-white"
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
                    </div>
                    <p class="ml-16 text-sm font-medium text-gray-500 truncate">
                      Total Posts{" "}
                    </p>
                  </dt>
                  <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p class="text-2xl font-semibold text-gray-900">234</p>

                    <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div class="text-sm">
                        <Link href="/dashboard/posts">
                          <span class="cursor-pointer font-medium text-orange-600 hover:text-orange-500">
                            {" "}
                            View all
                            <span class="sr-only"> Avg. Open Rate stats</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </dd>
                </div>

                <div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                  <dt>
                    <div class="absolute  bg-gradient-to-r from-orange-500 to-pink-500 rounded-md p-3">
                      <svg
                        class="h-6 w-6 text-white"
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
                          d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                        />
                      </svg>
                    </div>
                    <p class="ml-16 text-sm font-medium text-gray-500 truncate">
                      Plan
                    </p>
                  </dt>
                  <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p class="text-2xl font-semibold text-gray-900">Trial</p>
                    <p class="ml-2 flex items-baseline text-sm font-semibold text-yellow-500">
                      Trial days left: 23
                    </p>
                    <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                      <div class="text-sm">
                        <Link href="/dashboard/billing">
                          <span class="cursor-pointer font-medium text-orange-600 hover:text-orange-500">
                            {" "}
                            Select plan
                            <span class="sr-only"> Avg. Click Rate stats</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>{" "}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default dashboard;
