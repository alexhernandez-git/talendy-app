import React from "react";

import Post from "components/Layout/Post";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  acceptContributeRequest,
  ignoreContributeRequest,
} from "redux/actions/collaborateRequests";

const ContributeRequest = ({ collaborate_request }) => {
  const dispatch = useDispatch();
  const handleAcceptContributeRequest = () => {
    dispatch(acceptContributeRequest(collaborate_request?.id));
  };
  const handleIgnoreContributeRequest = () => {
    dispatch(ignoreContributeRequest(collaborate_request?.id));
  };
  return (
    <li>
      <div className="py-4 ">
        <div className="flex items-center  space-x-3">
          <div className="flex-shrink-0">
            {collaborate_request?.user?.picture ? (
              <img
                className="h-8 w-8 overflow-hidden rounded-full m-auto"
                src={
                  new RegExp(
                    `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                  ).test(collaborate_request?.user?.picture)
                    ? collaborate_request?.user?.picture
                    : process.env.HOST + collaborate_request?.user?.picture
                }
                alt=""
              ></img>
            ) : (
              <span className="bg-gray-100 rounded-full overflow-hidden h-8 w-8">
                <svg
                  className="text-gray-300 bg-gray-100 rounded-full h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              <Link href={`/user/${collaborate_request?.user?.id}`}>
                <span>{collaborate_request?.user?.username}</span>
              </Link>
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
              {collaborate_request?.user?.member?.karma_amount} Karma
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleIgnoreContributeRequest}
              type="button"
              className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-100  dark:hover:bg-gray-500"
            >
              <span>Ignore</span>
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={handleAcceptContributeRequest}
              type="button"
              className="inline-flex items-center px-3 py-0.5 rounded-full bg-orange-50 text-sm font-medium  bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 text-white"
            >
              <span>Accept</span>
            </button>
          </div>
        </div>
        {collaborate_request?.reason && (
          <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4">
            {collaborate_request.reason}
          </div>
        )}
        <div className="border sm:rounded-lg mt-4">
          <Post post={collaborate_request?.post} />
        </div>
      </div>
    </li>
  );
};

export default ContributeRequest;
