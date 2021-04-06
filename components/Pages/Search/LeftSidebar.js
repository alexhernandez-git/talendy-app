import Link from "next/link";
import {
  FOLLOWED_USERS_POSTS_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
} from "pages";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCommunity } from "redux/actions/user";

const LeftSidebar = ({ page }) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const { community } = userReducer;
  const handleSetCommunity = (selectedCommunity) => {
    if (selectedCommunity === community) {
      dispatch(changeCommunity(null));
      return;
    }
    dispatch(changeCommunity(selectedCommunity));
  };
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <nav aria-label="Sidebar" className="divide-y divide-gray-300">
        <div className="">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            id="communities-headline"
          >
            Communities
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <span
              onClick={handleSetCommunity.bind(this, 0)}
              className={`
                  ${
                    community === 0
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Development</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 1)}
              className={`
                  ${
                    community === 1
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Business</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 2)}
              className={`
                  ${
                    community === 2
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Finance & Accounting</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 3)}
              className={`
                  ${
                    community === 3
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">IT & Software</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 4)}
              className={`
                  ${
                    community === 4
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Office Productivity</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 5)}
              className={`
                  ${
                    community === 5
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Personal Development</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 6)}
              className={`
                  ${
                    community === 6
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Design</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 7)}
              className={`
                  ${
                    community === 7
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Marketing</span>
            </span>

            <span
              onClick={handleSetCommunity.bind(this, 8)}
              className={`
                  ${
                    community === 8
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Health & Fitness</span>
            </span>
            <span
              onClick={handleSetCommunity.bind(this, 9)}
              className={`
                  ${
                    community === 9
                      ? "bg-gray-200 text-gray-900 "
                      : "text-gray-600 hover:bg-gray-50 dark:text-gray-100"
                  } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:text-gray-900 dark:hover:text-gray-900`}
            >
              <span className="truncate">Music</span>
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
