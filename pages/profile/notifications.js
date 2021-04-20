import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import UserCard from "components/Pages/Profile/UserCard";
import { NOTIFICATIONS_PAGE } from "pages";
import { useSelector } from "react-redux";
import Link from "next/link";
const Notifications = () => {
  const page = NOTIFICATIONS_PAGE;
  const authReducer = useSelector((state) => state.authReducer);

  return (
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
              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>

              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>

              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
