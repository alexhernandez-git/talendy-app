import Link from "next/link";
import {
  ACCOUNT_PAGE,
  BILLING_DASHBOARD_PAGE,
  BILLING_PAGE,
  EARNINGS_PAGE,
  PROFILE_PAGE,
  PURCHASED_PORTALS_PAGE,
  SETTINGS_DASHBOARD_PAGE,
  SETTINGS_PAGE,
} from "pages";
import React from "react";

const TabMenu = ({ page }) => {
  return (
    <div>
      {/* Mobile tabs */}
      <div className="sm:hidden">
        <label for="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
        >
          <option>Info</option>
        </select>
      </div>
      {/* End mobile tabs */}
      {/* Desktop tabs */}
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 uppercase" aria-label="Tabs">
            <Link href="/dashboard/settings">
              <span
                className={
                  page === SETTINGS_DASHBOARD_PAGE
                    ? "cursor-pointer border-orange-500 text-orange-600 dark:text-orange-500 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    : "cursor-pointer border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                }
              >
                Info
              </span>
            </Link>

            {/* 
            <Link href="/billing">
              <span
                className={
                  page === BILLING_PAGE
                    ? "cursor-pointer border-orange-500 text-orange-600  dark:text-orange-500 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                    : "cursor-pointer border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                }
              >
                Billing
              </span>
            </Link> */}
          </nav>
        </div>
      </div>
      {/* End desktop tabs */}
    </div>
  );
};

export default TabMenu;
