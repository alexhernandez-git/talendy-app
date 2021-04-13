import React from "react";
import { useRouter } from "next/router";

import Post from "components/Layout/Post";

const HelpRequest = ({ page }) => {
  const router = useRouter();

  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  return (
    <div className="py-4 ">
      <div className="flex items-center  space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            <span onClick={handleGoToProfile} className="cursor-pointer">
              Leonard Krasner
            </span>
          </p>
          <p className="text-sm text-orange-500 flex items-center font-medium">
            <svg
              className="w-4 h-4 mr-1"
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
            34000 Karma
          </p>
        </div>
        <div className="flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-100  dark:hover:bg-gray-500"
          >
            <span>Ignore</span>
          </button>
        </div>
        <div className="flex-shrink-0">
          <button
            type="button"
            className="inline-flex items-center px-3 py-0.5 rounded-full bg-orange-50 text-sm font-medium  bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 text-white"
          >
            <span>Accept</span>
          </button>
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis deleniti,
        commodi itaque aliquid doloribus illum dolore aut nisi minus, sint
        eligendi harum veniam totam, iure modi aliquam dicta unde quo?
      </div>
      <div className="border sm:rounded-lg mt-4">
        <Post />
      </div>
    </div>
  );
};

export default HelpRequest;
