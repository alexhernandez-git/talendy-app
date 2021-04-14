import Link from "next/link";
import {
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_POSTS_PROFILE_PAGE,
  DONATION_PAGE,
  PROFILE_PAGE,
  USER_CONTRIBUTED,
} from "pages";
import React from "react";

const UserCard = ({ mobile, page, profile }) => {
  return (
    <aside
      className={`lg:col-span-4  mb-4 lg:mb-0 ${
        mobile ? "block lg:hidden" : "hidden lg:block"
      }`}
    >
      <div className={""}>
        <section aria-labelledby="who-to-follow-heading" className="mb-4">
          <div className="bg-white rounded-lg shadow relative overflow-hidden">
            <div className="absolute inset-0 h-2/4 bg-gray-500 dark:bg-gray-700"></div>
            <div className="space-y-6 p-6 relative">
              <div className="relative  flex justify-center">
                <div className=" h-40 w-40 rounded-full overflow-hidden xl:w-56 xl:h-56">
                  <img
                    className="mx-auto z-20"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    alt=""
                  />
                  {profile && (
                    <>
                      <div
                        className="absolute m-auto h-40 w-40 rounded-full overflow-hidden xl:w-56 xl:h-56 inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-20 cursor-default"
                        aria-hidden="true"
                      ></div>
                      <div className="absolute m-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 z-30  inset-0 cursor-pointer flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium text-center">
                  <Link href={profile ? "/profile/tasks" : "/user/123"}>
                    <h3 className="mb-3 cursor-pointer">Whitney Francis</h3>
                  </Link>
                  <div className=" flex justify-center items-center">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm flex justify-center items-center py-1 px-4 rounded-xl">
                      <svg
                        className="w-6 h-6 mr-1"
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
                      300 Karma
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Link href={profile ? "/profile/reviews" : "/reviews/123"}>
                      <button className="cursor-pointer">
                        <div className="flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500 ml-1">
                          9 Reviews
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="sticky top-4">
        {!profile && page !== DONATION_PAGE && (
          <>
            <section aria-labelledby="trending-heading" className="mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    <div className="mb-5 flex justify-center">
                      <span className="text-gray-500 dark:text-gray-300 text-sm">
                        Show your appreciation by leaving a donation
                      </span>
                    </div>
                    <Link href="/donation/123">
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Donate
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section aria-labelledby="trending-heading" className="mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                    >
                      Follow
                    </button>
                    <button
                      type="button"
                      className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                      </svg>
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        <div className={profile ? "sticky top-4" : ""}>
          <section aria-labelledby="trending-heading" className="mb-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      Margot Foster
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Posts Helped
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      300
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      About
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                      anim incididunt cillum culpa consequat. Excepteur qui
                      ipsum aliquip consequat sint. Sit id mollit nulla mollit
                      nostrud in ea officia proident. Irure nostrud pariatur
                      mollit ad adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default UserCard;
