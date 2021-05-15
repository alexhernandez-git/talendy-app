import React, { useState } from "react";
import ContributeRequest from "components/Pages/MyPosts/ContributeRequest";
import Link from "next/link";
import { useSelector } from "react-redux";

const ContributeRequestsFeed = () => {
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
  const contributeRequestsReducer = useSelector(
    (state) => state.contributeRequestsReducer
  );
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
          Contribute Requests
          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white">
            <span>{contributeRequestsReducer.contribute_requests.count}</span>
          </span>
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
      <div className={`${isOpen ? "block" : "hidden"} flow-root pb-6 px-6`}>
        {contributeRequestsReducer.contribute_requests.results.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {contributeRequestsReducer.contribute_requests.results.map(
              (contribute_request) => (
                <ContributeRequest contribute_request={contribute_request} />
              )
            )}
          </ul>
        ) : (
          <div className="flex justify-center">
            <span className="text-gray-500 dark:text-gray-100 text-sm">
              No contribute requests found
            </span>
          </div>
        )}
        <div className="mt-2">
          <Link href={"/profile/requests"}>
            <span className="cursor-pointer w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl  text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
              See all
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContributeRequestsFeed;
