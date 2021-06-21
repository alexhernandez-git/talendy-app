import Layout from "components/Dashboard/Layout";
import { COMMUNITIES_DASHBOARD_PAGE } from "pages";
import React from "react";

const communities = () => {
  const page = COMMUNITIES_DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto">
            {/* Create user button */}

            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span class="relative z-0 inline-flex shadow-sm rounded-3xl">
                  <button
                    type="button"
                    class="-ml-px relative inline-flex items-center px-4 py-2 rounded-3xl border border-gray-300  text-sm font-medium text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Remove
                  </button>
                </span>
                <div className="ml-2">
                  <span className="text-gray-500 text-xs">
                    23 of 100 selected
                  </span>
                </div>
              </div>
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
            <div className="flex flex-col ">
              <div className="overflow-x-auto">
                <div className="py-2 align-middle inline-block min-w-full">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <span className="sr-only">Select all</span>
                            <span class="relative inline-flex items-center bg-white">
                              <label for="select-all" class="sr-only">
                                Select all
                              </label>
                              <input
                                id="select-all"
                                type="checkbox"
                                name="select-all"
                                class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </span>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>

                          {/* 
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th> */}
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* User item */}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span class="relative inline-flex items-center bg-white">
                              <label for="select-all" class="sr-only">
                                Select
                              </label>
                              <input
                                id="select-all"
                                type="checkbox"
                                name="select-all"
                                class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                              />
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-500">
                              Regional Paradigm Technician
                            </span>
                            {/* <div className="text-sm text-gray-500">
                              Optimization
                            </div> */}
                          </td>

                          {/* <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-orange-600 hover:text-orange-900 mr-3"
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
                          </td>
                        </tr>
                        {/* End user item */}
                      </tbody>
                    </table>
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
