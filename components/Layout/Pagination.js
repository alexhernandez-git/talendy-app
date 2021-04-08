import React from "react";

const Pagination = ({ previous, next, changePage }) => {
  return (
    <nav className="w-full border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mt-4">
      <div className="-mt-px w-0 flex-1 flex">
        {previous && (
          <a
            onClick={() => changePage(previous)}
            className="cursor-pointer border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 hover:border-gray-300"
          >
            <svg
              className="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Previous
          </a>
        )}
      </div>

      <div className="-mt-px w-0 flex-1 flex justify-end">
        {next && (
          <a
            onClick={() => changePage(next)}
            className="cursor-pointer border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-200 hover:border-gray-300"
          >
            Next
            <svg
              className="ml-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
