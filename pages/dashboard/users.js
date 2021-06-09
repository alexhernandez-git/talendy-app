import Layout from "components/Dashboard/Layout";
import { USERS_DASHBOARD_PAGE } from "pages";
import React from "react";

const users = () => {
  const page = USERS_DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      <main class="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
        <div class="mt-8">
          <div class="max-w-6xl mx-auto">
            {/* Mobile tabs */}
            <div class="sm:hidden">
              <label for="tabs" class="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              >
                <option>Standard users</option>

                <option>Managers</option>

                <option selected>Admins</option>
              </select>
            </div>
            {/* End mobile tabs */}
            {/* Desktop tabs */}
            <div class="hidden sm:block">
              <div class="border-b border-gray-200">
                <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                  <a
                    href="#"
                    class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Standard users
                    <span class="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                      52
                    </span>
                  </a>

                  <a
                    href="#"
                    class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                  >
                    Managers
                    <span class="bg-gray-100 text-gray-900 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                      6
                    </span>
                  </a>

                  <a
                    href="#"
                    class="border-orange-500 text-orange-600 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    aria-current="page"
                  >
                    Admins
                    <span class="bg-orange-100 text-orange-600 hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                      4
                    </span>
                  </a>
                </nav>
              </div>
            </div>
            {/* End desktop tabs */}
            {/* Start users table */}
            <div class="flex flex-col mt-4">
              <div class="overflow-x-auto">
                <div class="py-2 align-middle inline-block min-w-full">
                  <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
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
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {/* User item */}
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10">
                                <img
                                  class="h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                  alt=""
                                />
                              </div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  Jane Cooper
                                </div>
                                <div class="text-sm text-gray-500">
                                  jane.cooper@example.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-900">
                              Regional Paradigm Technician
                            </div>
                            <div class="text-sm text-gray-500">
                              Optimization
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              class="text-orange-600 hover:text-orange-900"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        {/* End user item */}
                      </tbody>
                    </table>
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

export default users;
