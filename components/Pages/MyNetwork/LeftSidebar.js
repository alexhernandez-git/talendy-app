import Link from "next/link";
import { CONNECTIONS_PAGE, MY_NETWORK_PAGE, PEOPLE_I_FOLLOW_PAGE } from "pages";
import React from "react";
import { useSelector } from "react-redux";

const LeftSidebar = ({ page, mobile }) => {
  return (
    <div
      className={`${
        mobile ? "mx-2 xl:hidden" : "hidden xl:block  xl:col-span-2"
      }`}
    >
      <nav aria-label="Sidebar" className="divide-y divide-gray-300">
        <div className="">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            id="communities-headline"
          >
            MANAGE MY NETWORK
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <Link href="/profile/mynetwork">
              <span
                className={`
                  ${
                    page === MY_NETWORK_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 xl:hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl xl:hover:text-gray-900 xl:dark:hover:text-gray-900`}
              >
                <span className="truncate">Invitations</span>
                <span>23</span>
              </span>
            </Link>
            <Link href="/profile/mynetwork/connections">
              <span
                className={`
                  ${
                    page === CONNECTIONS_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 xl:hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl xl:hover:text-gray-900 xl:dark:hover:text-gray-900`}
              >
                <span className="truncate">Connections</span>
                <span>35</span>
              </span>
            </Link>
            <Link href="/profile/mynetwork/following">
              <span
                className={`
                  ${
                    page === PEOPLE_I_FOLLOW_PAGE
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 xl:hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl xl:hover:text-gray-900 xl:dark:hover:text-gray-900`}
              >
                <span className="truncate">People I Follow</span>
                <span>32</span>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
