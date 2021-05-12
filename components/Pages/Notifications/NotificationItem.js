import useGetNotification from "hooks/useGetNotification";
import React from "react";
import moment from "moment";
import { useRouter } from "next/router";
const NotificationItem = ({ notification }) => {
  const content = useGetNotification(notification);
  const router = useRouter();
  const handleOpenNotification = () => {
    if (content.link) {
      router.push(content.link);
    }
  };
  return (
    <li
      className={`py-4 hover:opacity-90 cursor-pointer`}
      onClick={handleOpenNotification}
    >
      <div className="flex space-x-3">
        {content.user?.picture ? (
          <img
            className="h-6 w-6 rounded-full"
            src={
              new RegExp(
                `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
              ).test(content.user.picture)
                ? content.user.picture
                : process.env.HOST + content.user.picture
            }
            alt=""
          />
        ) : (
          <span className="inline-block h-6 w-6 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              {content.event_message}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {moment(notification.modified).subtract(1, "seconds").fromNow()}
            </p>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {content.message}
          </p>
        </div>
      </div>
    </li>
  );
};

export default NotificationItem;
