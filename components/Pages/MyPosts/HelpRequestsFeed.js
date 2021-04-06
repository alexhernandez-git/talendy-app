import React, { useState } from "react";
import HelpRequest from "components/Pages/MyPosts/HelpRequest";
import { Transition } from "@tailwindui/react";

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
            class="ml-2 inline-flex items-center px-3 py-0.5 rounded-full bg-orange-100 text-sm font-medium text-orange-500 dark:text-orange-100 dark:bg-orange-500 "
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
        <ul className="-my-4 divide-y divide-gray-200">
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
      </div>
    </div>
  );
};

export default HelpRequestsFeed;
