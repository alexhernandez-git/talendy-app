import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchLastNotifications } from "redux/actions/lastNotifications";
import NotificationItem from "./NotificationItem";

const NotificationsDropdown = ({ notificationsOpen, notificationsRef }) => {
  const dispatch = useDispatch();
  const lastNotificationsReducer = useSelector(
    (state) => state.lastNotificationsReducer
  );
  const authReducer = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (authReducer.is_authenticated && notificationsOpen) {
      dispatch(fetchLastNotifications());
    }
  }, [notificationsOpen]);
  return (
    <div
      ref={notificationsRef}
      className={notificationsOpen ? "block" : "hidden"}
    >
      <div
        ref={ref}
        className={`
                   origin-top-right absolute right-0 mt-2 w-80 rounded-3xl shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-40 overflow-hidden`}
      >
        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 ">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-gray-400 dark:text-gray-100"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Notifications
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <div className="flow-root px-4 max-h-72 overflow-auto">
            {lastNotificationsReducer.notifications.length === 0 && (
              <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                You don't have notifications
              </p>
            )}
            <ul className="divide-y divide-gray-200">
              {lastNotificationsReducer.notifications.results.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification.notification}
                  />
                )
              )}
            </ul>
          </div>
          <div className="p-4">
            <Link href="/profile/notifications">
              <span className="cursor-pointer w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl  text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                See all
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDropdown;
