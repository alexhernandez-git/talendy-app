import Layout from "components/Dashboard/Layout";
import { COMMUNITIES_DASHBOARD_PAGE } from "pages";
import React from "react";

const communities = () => {
  const page = COMMUNITIES_DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
        <div class="mt-8">
          <div class="max-w-6xl mx-auto">
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
                New community
              </button>
            </div>
            {/* End create user button */}
            {/* Start users table */}
            <div class="flex flex-col ">
              <div class="overflow-x-auto">
                <div class="py-2 align-middle inline-block min-w-full">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>

                          {/* <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th> */}
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit - Remove</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {/* User item */}
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              Regional Paradigm Technician
                            </div>
                            {/* <div class="text-sm text-gray-500">
                              Optimization
                            </div> */}
                          </td>
                          {/* <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td> */}
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              class="text-orange-600 hover:text-orange-900 mr-3"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </a>

                            <a href="#" class="text-red-600 hover:text-red-900">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 inline"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </a>
                          </td>
                        </tr>
                        {/* End user item */}
                      </tbody>
                    </table>
                    {/* Pagination */}
                    <nav
                      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                      aria-label="Pagination"
                    >
                      <div class="hidden sm:block">
                        <p class="text-sm text-gray-700">
                          Showing <span class="font-medium">1</span> to{" "}
                          <span class="font-medium">10</span> of{" "}
                          <span class="font-medium">20</span> results
                        </p>
                      </div>
                      <div class="flex-1 flex justify-between sm:justify-end">
                        <a
                          href="#"
                          class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          Previous
                        </a>
                        <a
                          href="#"
                          class="ml-3 inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          Next
                        </a>
                      </div>
                    </nav>
                    {/* End pagination */}
                  </div>
                </div>
              </div>
            </div>
            {/* End users table */}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default communities;
