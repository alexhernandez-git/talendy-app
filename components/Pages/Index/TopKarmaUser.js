import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAlert } from "redux/actions/alerts";

const TopKarmaCoinsUser = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  const userReducer = useSelector((state) => state.userReducer);
  const handleFollowUser = () => {
    if (!userReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
    }
  };
  return (
    <div className="flex items-center py-4 space-x-3">
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
          onClick={handleFollowUser}
          type="button"
          className="inline-flex items-center px-3 py-0.5 rounded-full bg-orange-50 text-sm font-medium text-orange-700 hover:bg-orange-100 dark:text-orange-100 dark:bg-orange-600 dark:hover:bg-orange-500"
        >
          <svg
            className="-ml-1 mr-0.5 h-5 w-5 text-orange-400 dark:text-orange-100"
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
      </div>
    </div>
  );
};

export default TopKarmaCoinsUser;
