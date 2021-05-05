import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCommunity } from "redux/actions/auth";

const LeftSidebar = ({ page }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const communitiesReducer = useSelector((state) => state.communitiesReducer);
  const { community } = authReducer;
  const handleSetCommunity = (selectedCommunity) => {
    if (selectedCommunity === community) {
      dispatch(changeCommunity(""));
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
