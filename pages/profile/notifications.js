import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import UserCard from "components/Pages/Profile/UserCard";
import { NOTIFICATIONS_PAGE } from "pages";
import { useSelector } from "react-redux";
import Link from "next/link";
import useAuthRequired from "hooks/useAuthRequired";
import { useDispatch } from "react-redux";
import { fetchNotifications } from "redux/actions/notifications";
import { useEffect } from "react";
import NotificationItem from "components/Pages/Notifications/NotificationItem";
import Spinner from "components/Layout/Spinner";
const Notifications = () => {
  const page = NOTIFICATIONS_PAGE;
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  useEffect(() => {
    if (initialDataFetched) {
      dispatch(fetchNotifications());
    }
  }, [initialDataFetched]);
  const notificationsReducer = useSelector(
    (state) => state.notificationsReducer
  );

  return !canRender ? (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <Spinner />
    </div>
  ) : (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile user={authReducer.user} />

          <div className="lg:col-span-8 xl:col-span-6 xl:col-start-3 ">
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
                      Notifications
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <ul className="divide-y divide-gray-200 bg-white dark:bg-gray-700 px-4 py-5 shadow sm:rounded-lg sm:px-6">
              {notificationsReducer.notifications.results.length === 0 && (
                <span className="text-sm text-gray-500 dark:text-gray-100">
                  You don't have notifications
                </span>
              )}
              {notificationsReducer.notifications.results.map(
                (notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification.notification}
                  />
                )
              )}
            </ul>
          </div>
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
