import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCommunityFilter } from "redux/actions/auth";

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
        <div className="">
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
            {communitiesReducer.communities.map((communityItem) => (
              <span
                onClick={handleSetCommunity.bind(this, communityItem.id)}
                className={`
            ${
              community === communityItem.id
                ? "bg-gray-200 text-gray-900 "
                : "text-gray-600 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-gray-800"
            } cursor-pointer group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-3xl hover:text-gray-900`}
              >
                <span className="truncate">{communityItem.name}</span>
              </span>
            ))}
          </div>{" "}
        </div>
      </nav>
    </div>
  );
};

export default LeftSidebar;
