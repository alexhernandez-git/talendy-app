import React, { useState } from "react";
import HelpRequest from "components/Pages/MyPosts/HelpRequest";
import { Transition } from "@tailwindui/react";
import Link from "next/link";

const HelpRequestsFeed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="my-4 bg-white dark:bg-gray-700 rounded-lg shadow">
      <div
        className="flex justify-between cursor-pointer p-6"
        onClick={handleToggle}
      >
        <h2
          id="who-to-follow-heading"
          className="text-base font-medium text-gray-900 dark:text-white"
        >
          Help Requests
          <button
            type="button"
            className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white"
          >
            <span>12</span>
          </button>
        </h2>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              isOpen ? "block" : "hidden"
            } h-6 w-6 text-gray-500 dark:text-white`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`${
              isOpen ? "hidden" : "block"
            } h-6 w-6 text-gray-500 dark:text-white`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        </div>
      </div>
      <div
        className={`${isOpen ? "block" : "hidden"} mt-6 flow-root pb-6 px-6`}
      >
        <ul className="divide-y divide-gray-200">
          <li>
            <HelpRequest />
          </li>
          <li>
            <HelpRequest />
          </li>
          <li>
            <HelpRequest />
          </li>
          <li>
            <HelpRequest />
          </li>
        </ul>
        <div className="mt-2">
          <Link href={"/requests/123"}>
            <span class="cursor-pointer w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md  text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
              See all
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpRequestsFeed;
