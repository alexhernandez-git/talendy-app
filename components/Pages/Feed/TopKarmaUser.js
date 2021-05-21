import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAlert } from "redux/actions/alerts";
import {
  followTopKarmaUser,
  unfollowTopKarmaUser,
} from "redux/actions/topKarmaUsers";

const TopKarmaUser = ({ user }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoToProfile = (e) => {
    e.stopPropagation();
    if (authReducer.user?.id === user.id) {
      router.push(`/profile/posts`);
    } else {
      router.push(`/user/${user.id}`);
    }
  };
  const authReducer = useSelector((state) => state.authReducer);
  const handleFollowUser = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(followTopKarmaUser(user.id));
  };

  return (
    <li>
      <div className="flex items-center py-4 space-x-3">
        <div className="flex-shrink-0">
          {user?.picture ? (
            <img
              className="h-8 w-8 rounded-full"
              src={
                new RegExp(
                  `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                ).test(user.picture)
                  ? user.picture
                  : process.env.HOST + user.picture
              }
              alt=""
            ></img>
          ) : (
            <span className="bg-gray-100 rounded-full overflow-hidden h-8 w-8">
              <svg
                className=" h-8 w-8 rounded-full text-gray-300 bg-gray-100"
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
            <span onClick={handleGoToProfile} className="cursor-pointer">
              {user?.username}
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
            {user?.karma_amount} Karma
          </p>
        </div>
        {authReducer.user?.id !== user.id && (
          <div className="flex-shrink-0">
            {user?.is_followed ? (
              <span className="inline-flex items-center px-3 py-0.5 rounded-full text-orange-50 text-sm font-medium bg-orange-600 dark:bg-orange-100 dark:text-orange-600">
                <span>Following</span>
              </span>
            ) : (
              <button
                onClick={handleFollowUser}
                type="button"
                className="inline-flex items-center px-3 py-0.5 rounded-full bg-orange-50 text-sm font-medium text-orange-700 hover:bg-orange-100 dark:text-orange-100 dark:bg-orange-600 dark:hover:bg-orange-500"
              >
                <svg
                  className="-ml-1 mr-0.5 h-4 w-4 text-orange-400 dark:text-orange-100"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Follow</span>
              </button>
            )}
          </div>
        )}
      </div>
    </li>
  );
};

export default TopKarmaUser;
