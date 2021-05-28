import Link from "next/link";
import {
  FOLLOWED_USERS_POSTS_PAGE,
  FEED_PAGE,
  MOST_KARMA_POSTS_PAGE,
  NEAREST_POSTS_PAGE,
} from "pages";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCommunityFilter, changeStatusFilter } from "redux/actions/auth";

const LeftSidebar = ({ page }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const communitiesReducer = useSelector((state) => state.communitiesReducer);
  const { community_filter, status_filter } = authReducer;
  const handleSetCommunity = (selectedCommunity) => {
    if (selectedCommunity === community_filter) {
      dispatch(changeCommunityFilter(""));
      return;
    }
    dispatch(changeCommunityFilter(selectedCommunity));
  };
  const handleSetStatus = (selectedStatus) => {
    if (selectedStatus === status_filter) {
      dispatch(changeStatusFilter(""));
      return;
    }
    dispatch(changeStatusFilter(selectedStatus));
  };
  return (
    <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
      <nav aria-label="Sidebar" className="divide-y divide-gray-300">
        <div className="pb-3">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            id="communities-headline"
          >
            Filters
          </p>
          <div
            className="mt-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <Link href="/feed">
              <span
                className={`
              ${
                page === FEED_PAGE
                  ? "bg-gray-200 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
              } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Recent</span>
              </span>
            </Link>
            <Link href="/most-karma">
              <span
                className={`
              ${
                page === MOST_KARMA_POSTS_PAGE
                  ? "bg-gray-200 text-gray-900 "
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
              } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate flex items-center">
                  Most{" "}
                  <span
                    className={`text-center text-orange-500 font-bold inline-flex items-center ml-1`}
                  >
                    <svg
                      className="w-5 h-5 mr-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Karma
                  </span>
                </span>
              </span>
            </Link>
            <Link href="/nearest">
              <span
                className={`
              ${
                page === NEAREST_POSTS_PAGE
                  ? "bg-gray-200 text-gray-900 "
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
              } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Nearest</span>
              </span>
            </Link>
            <Link href="/followed">
              <span
                className={`
              ${
                page === FOLLOWED_USERS_POSTS_PAGE
                  ? "bg-gray-200 text-gray-900 "
                  : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
              } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">Followed</span>
              </span>
            </Link>
          </div>
        </div>
        <div className="pt-3">
          <p
            className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
            id="communities-headline"
          >
            Status
          </p>
          <div
            className="my-3 space-y-2"
            aria-labelledby="communities-headline"
          >
            <span
              onClick={handleSetStatus.bind(this, "AC")}
              className={`
            ${
              status_filter === "AC"
                ? "bg-gray-200 text-gray-900 "
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
            } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
            >
              <span className="truncate">Active</span>
            </span>
            <span
              onClick={handleSetStatus.bind(this, "SO")}
              className={`
            ${
              status_filter === "SO"
                ? "bg-gray-200 text-gray-900 "
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
            } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
            >
              <span className="truncate">Solved</span>
            </span>
          </div>
        </div>
        <div className="pt-3">
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
            {communitiesReducer.communities?.map((communityItem) => (
              <span
                onClick={handleSetCommunity.bind(this, communityItem.id)}
                className={`
            ${
              community_filter === communityItem.id
                ? "bg-gray-200 text-gray-900 "
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
            } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">{communityItem.name}</span>
              </span>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
