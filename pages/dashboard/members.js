import Layout from "components/Dashboard/Layout";
import Link from "next/link";
import { MEMBERS_DASHBOARD_PAGE } from "pages";
import React from "react";
import Head from "next/head";
import Spinner from "components/Layout/Spinner";
import useAuthRequired from "hooks/useAuthRequired";
const users = () => {
  const page = MEMBERS_DASHBOARD_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      {!canRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
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
                            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
                          </svg>
                          Kick
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
                      New member
                    </button>
                  </div>

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
                                  <span className="sr-only">Image</span>
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left  text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Username
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Email
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Role
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  <span className="sr-only">Edit</span>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  <span className="sr-only">See profile</span>
                                </th>
                                {/* 
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th> */}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {/* User item */}
                              <tr>
                                <td className="px-6 py-4 whitespace-nowrap">
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
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-8 w-8">
                                    <svg
                                      className="h-8 w-8 text-gray-300"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm">
                                    Alex Hernandez{" "}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm">afewafewfe</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm">
                                    alex@gmail.com
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase bg-gray-100 text-gray-800">
                                    BASIC
                                  </span>
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-orange-500 cursor-pointer"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <a href="/user/3443" target="_blank">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5 text-gray-500"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                    </svg>
                                  </a>
                                </td>

                                {/* <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td> */}
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
                                Showing <span className="font-medium">1</span>{" "}
                                to <span className="font-medium">10</span> of{" "}
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
        </>
      )}
    </>
  );
};

export default users;
