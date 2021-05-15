import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMoreContributeRequests } from "redux/actions/contributeRequests";
import ContributeRequest from "../MyPosts/ContributeRequest";
import HelpRequest from "../MyPosts/ContributeRequest";

const RequestsFeed = () => {
  const contributeRequestsReducer = useSelector(
    (state) => state.contributeRequestsReducer
  );
  const dispatch = useDispatch();
  const handleFetchMoreContributeRequests = () => {
    dispatch(fetchMoreContributeRequests());
  };
  const onChangeVisibility = (visible) => {
    if (visible) {
      handleFetchMoreContributeRequests();
    }
  };
  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <nav className="flex mb-4 mx-4 sm:mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link href="/feed">
                <span className="cursor-pointer text-gray-400 hover:text-gray-500">
                  <svg
                    className="flex-shrink-0 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">Home</span>
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href="/profile/posts">
                <span className="cursor-pointer ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  Profile
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="ml-4 text-sm font-medium text-orange-500"
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
          {contributeRequestsReducer.contribute_requests.results.length > 0 ? (
            <ul className="sm:divide-y sm:divide-gray-200">
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
          {!contributeRequestsReducer.is_fetching_more_contribute_requests &&
            contributeRequestsReducer.contribute_requests.results.length > 0 &&
            contributeRequestsReducer.contribute_requests.next && (
              <VisibilitySensor onChange={onChangeVisibility}>
                <div
                  className="p-3 flex justify-center"
                  onClick={handleFetchMoreContributeRequests}
                >
                  <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                    Load more contribute requests
                  </span>
                </div>
              </VisibilitySensor>
            )}
          {contributeRequestsReducer.is_fetching_more_contribute_requests && (
            <div className="flex justify-center space-y-4 w-full mb-4 p-3">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsFeed;
