import React from "react";

const LeftSidebar = () => {
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <nav
        aria-label="Sidebar"
        className="sticky top-4 divide-y divide-gray-300"
      >
        <div className="">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-white uppercase tracking-wider"
            id="communities-headline"
          >
            Communities
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Development</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Business</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Finance & Accounting</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">IT & Software</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Office Productivity</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Personal Development</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Design</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Marketing</span>
            </a>

            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Health & Fitness</span>
            </a>
            <a
              href="#"
              className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-100 rounded-md hover:text-gray-900 dark:hover:text-gray-900 hover:bg-gray-50"
            >
              <span className="truncate">Music</span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
