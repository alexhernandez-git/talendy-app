import React from "react";
import Opportunity from "components/Pages/Index/OpportunitiesFeed/Oportunity";
const OpportunitiesFeed = () => {
  return (
    <main className="lg:col-span-9 xl:col-span-6">
      <div className="px-4 sm:px-0">
        <div className="sm:hidden">
          <label htmlFor="question-tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="question-tabs"
            className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          >
            <option>Recent</option>

            <option>Most Karmas</option>

            <option>Most Followed</option>
          </select>
        </div>
        <div className="hidden sm:block">
          <nav
            className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
            aria-label="Tabs"
          >
            <a
              href="#"
              aria-current="page"
              className="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
            >
              <span>Recent</span>
              <span
                aria-hidden="true"
                className="bg-orange-500 absolute inset-x-0 bottom-0 h-0.5"
              ></span>
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
            >
              <span>Most Karmas</span>
              <span
                aria-hidden="true"
                className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              ></span>
            </a>

            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
            >
              <span>Followed</span>
              <span
                aria-hidden="true"
                className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
              ></span>
            </a>
          </nav>
        </div>
      </div>
      <div className="mt-4">
        <h1 className="sr-only">Recent questions</h1>
        <ul className="space-y-4">
          <li>
            <Opportunity />
          </li>
          <li>
            <Opportunity />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default OpportunitiesFeed;
