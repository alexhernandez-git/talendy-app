import React from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import {
  CONNECTIONS_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  SEARCH_USERS_PAGE,
} from "pages";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { removeConnection } from "redux/actions/connections";
import { unfollow } from "redux/actions/following";
import { getOrCreateChat } from "redux/actions/chats";
import { followUser } from "redux/actions/user";
import { followUserInUsers } from "redux/actions/users";
import { useSelector } from "react-redux";
import { createAlert } from "redux/actions/alerts";

const User = ({ page, user }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const authReducer = useSelector((state) => state.authReducer);
  const handleOpenOptions = () => {
    setOptionsOpen(true);
  };
  const handleCloseOptions = () => {
    setOptionsOpen(false);
  };
  const handleToggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  const optionsRef = useRef();
  useOutsideClick(optionsRef, () => handleCloseOptions());

  const dispatch = useDispatch();

  const handleRemoveConnection = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(removeConnection(user?.id));
  };
  const handleUnfollow = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(unfollow(user?.id));
  };
  const handleGetOrCreateChat = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(getOrCreateChat(user?.id));
  };
  const handleFollow = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(followUserInUsers(user?.id));
  };
  console.log(user);
  return (
    <li>
      <div className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 items-center">
            <div className="flex-shrink-0">
              {user?.picture ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    new RegExp(
                      `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                    ).test(user.picture)
                      ? user.picture
                      : process.env.HOST + user.picture
                  }
                  alt=""
                ></img>
              ) : (
                <svg
                  className="bg-gray-100 text-gray-300 rounded-full overflow-hidden h-10 w-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                <Link href={`/user/${user?.id}`}>
                  <span className="hover:underline cursor-pointer">
                    {user?.username}
                  </span>
                </Link>
              </p>
              <span className="inline-flex items-center text-sm">
                <svg
                  className="h-5 w-5 text-orange-500 mr-1"
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
                <span className="font-medium text-orange-500">
                  {user?.karma_amount} Karma
                </span>
                <span className="sr-only">karmas amount</span>
              </span>
            </div>
          </div>
          {page === SEARCH_USERS_PAGE && authReducer.user?.id !== user?.id && (
            <>
              {user?.is_followed ? (
                <span className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 bg-white dark:bg-gray-700">
                  Followed
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleFollow}
                  className="inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-3xl text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                >
                  Follow
                </button>
              )}
            </>
          )}
          {page === PEOPLE_I_FOLLOW_PAGE && (
            <button
              onClick={handleUnfollow}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
            >
              Unfollow
            </button>
          )}
          {page === CONNECTIONS_PAGE && (
            <div className="flex items-center">
              <button
                onClick={handleGetOrCreateChat}
                type="button"
                className="inline-flex items-center mr-2 px-4 py-2 shadow-sm text-sm font-medium rounded-3xl text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
              >
                Message
              </button>
              <div className="flex-shrink-0 self-center flex">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      onClick={handleToggleOptions}
                      type="button"
                      className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                      id="options-menu-0"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open options</span>

                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>

                  <div
                    className={`${
                      optionsOpen ? "block" : "hidden"
                    } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu-0"
                  >
                    <div className="py-1" role="none" ref={optionsRef}>
                      <span
                        onClick={handleRemoveConnection}
                        className="cursor-pointer flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                        role="menuitem"
                      >
                        <svg
                          className="mr-3 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Remove connection</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default User;
