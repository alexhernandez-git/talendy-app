import Layout from "components/Dashboard/Layout";
import React from "react";

const dashboard = () => {
  return (
    <Layout>
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto">
        <div class="mt-8">
          <div class="max-w-6xl mx-auto">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Last 30 days
            </h3>

            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div class="absolute bg-orange-500 rounded-md p-3">
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
                    Total Subscribers
                  </p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900">71,897</p>
                  <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <svg
                      class="self-center flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Increased by</span>
                    122
                  </p>
                  <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium text-orange-600 hover:text-orange-500"
                      >
                        {" "}
                        View all
                        <span class="sr-only"> Total Subscribers stats</span>
                      </a>
                    </div>
                  </div>
                </dd>
              </div>

              <div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div class="absolute bg-orange-500 rounded-md p-3">
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
                        d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                      />
                    </svg>
                  </div>
                  <p class="ml-16 text-sm font-medium text-gray-500 truncate">
                    Avg. Open Rate
                  </p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900">58.16%</p>
                  <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    <svg
                      class="self-center flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Increased by</span>
                    5.4%
                  </p>
                  <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium text-orange-600 hover:text-orange-500"
                      >
                        {" "}
                        View all
                        <span class="sr-only"> Avg. Open Rate stats</span>
                      </a>
                    </div>
                  </div>
                </dd>
              </div>

              <div class="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
                <dt>
                  <div class="absolute bg-orange-500 rounded-md p-3">
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
                    Avg. Click Rate
                  </p>
                </dt>
                <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
                  <p class="text-2xl font-semibold text-gray-900">24.57%</p>
                  <p class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                    <svg
                      class="self-center flex-shrink-0 h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="sr-only">Decreased by</span>
                    3.2%
                  </p>
                  <div class="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                      <a
                        href="#"
                        class="font-medium text-orange-600 hover:text-orange-500"
                      >
                        {" "}
                        View all
                        <span class="sr-only"> Avg. Click Rate stats</span>
                      </a>
                    </div>
                  </div>
                </dd>
              </div>
            </dl>

            <h2 class="mx-auto mt-8 text-lg leading-6 font-medium text-gray-900">
              Recent posts
            </h2>

            <div class="shadow sm:hidden">
              <ul class="mt-5 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
                <li>
                  <a href="#" class="block px-4 py-4 bg-white hover:bg-gray-50">
                    <span class="flex items-center space-x-4">
                      <span class="flex-1 flex space-x-2 truncate">
                        <svg
                          class="flex-shrink-0 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span class="flex flex-col text-gray-500 text-sm truncate">
                          <span class="truncate">Payment to Molly Sanders</span>
                          <span>
                            <span class="text-gray-900 font-medium">
                              $20,000
                            </span>{" "}
                            USD
                          </span>
                          <time datetime="2020-07-11">July 11, 2020</time>
                        </span>
                      </span>
                      <svg
                        class="flex-shrink-0 h-5 w-5 text-gray-400"
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
                    </span>
                  </a>
                </li>
              </ul>

              <nav
                class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div class="flex-1 flex justify-between">
                  <a
                    href="#"
                    class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>

            <div class="hidden sm:block">
              <div class="mx-auto">
                <div class="flex flex-col mt-5">
                  <div class="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction
                          </th>
                          <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th class="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                            Status
                          </th>
                          <th class="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="bg-white">
                          <td class="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div class="flex">
                              <a
                                href="#"
                                class="group inline-flex space-x-2 truncate text-sm"
                              >
                                <svg
                                  class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                                <p class="text-gray-500 truncate group-hover:text-gray-900">
                                  Payment to Molly Sanders
                                </p>
                              </a>
                            </div>
                          </td>
                          <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span class="text-gray-900 font-medium">
                              $20,000{" "}
                            </span>
                            USD
                          </td>
                          <td class="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                              success
                            </span>
                          </td>
                          <td class="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <time datetime="2020-07-11">July 11, 2020</time>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <nav
                      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div class="hidden sm:block">
                        <p class="text-sm text-gray-700">
                          Showing
                          <span class="font-medium">1</span>
                          to
                          <span class="font-medium">10</span>
                          of
                          <span class="font-medium">20</span>
                          results
                        </p>
                      </div>
                      <div class="flex-1 flex justify-between sm:justify-end">
                        <a
                          href="#"
                          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default dashboard;
