import Link from "next/link";
import React, { useEffect } from "react";
import HelpRequest from "../MyPosts/ContributeRequest";

const RequestsFeed = () => {
  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <nav class="flex mb-4" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-4">
          <li>
            <div>
              <Link href="/">
                <span class="cursor-pointer text-gray-400 hover:text-gray-500">
                  <svg
                    class="flex-shrink-0 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span class="sr-only">Home</span>
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <Link href="/profile/posts">
                <span class="cursor-pointer ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Profile
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div class="flex items-center">
              <svg
                class="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span
                class="ml-4 text-sm font-medium text-orange-500"
                aria-current="page"
              >
                Requests to contribute
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg">
        <div className="flow-root">
          <ul className="sm:divide-y sm:divide-gray-200">
            <HelpRequest />
            <HelpRequest />
            <HelpRequest />
            <HelpRequest />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestsFeed;
