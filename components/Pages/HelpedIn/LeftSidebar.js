import Link from "next/link";
import {
  ACTIVE_HELPED_IN_PAGE,
  CLOSED_HELPED_IN_PAGE,
  HELPED_IN_PAGE,
} from "pages";
import React from "react";

const LeftSidebar = ({ page }) => {
  return (
    <div className="hidden xl:block  xl:col-span-2">
      <nav aria-label="Sidebar" className="divide-y divide-gray-300">
        <div className="">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-white uppercase tracking-wider"
            id="communities-headline"
          >
            Helped in posts
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <Link href="/user/helpedin">
              <span
                className={`
                  ${
                    page === HELPED_IN_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
              >
                <span className="truncate">All</span>
                <span>30</span>
              </span>
            </Link>
            <Link href="/user/helpedin/active">
              <span
                className={`
                  ${
                    page === ACTIVE_HELPED_IN_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
              >
                <span className="truncate">Active</span>
                <span>10</span>
              </span>
            </Link>
            <Link href="/user/helpedin/closed">
              <span
                className={`
                  ${
                    page === CLOSED_HELPED_IN_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
              >
                <span className="truncate">Closed</span>
                <span>20</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
