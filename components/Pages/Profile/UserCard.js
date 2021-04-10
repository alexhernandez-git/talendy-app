import {
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_POSTS_PROFILE_PAGE,
  PROFILE_PAGE,
  PROFILE_PORTFOLIO_PAGE,
} from "pages";
import React from "react";

const ProfileCard = ({ mobile, page, profile }) => {
  return (
    <aside
      className={`lg:col-span-4  mb-4 lg:mb-0 ${
        mobile ? "block lg:hidden" : "hidden lg:block"
      }`}
    >
      <div className="">
        <section aria-labelledby="who-to-follow-heading" className="mb-4">
          <div className="bg-white rounded-lg shadow relative overflow-hidden">
            <div className="absolute inset-0 h-2/4 bg-gray-500 dark:bg-gray-700"></div>
            <div className="space-y-6 p-6 relative">
              <img
                className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 z-20"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                alt=""
              />
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1 text-center">
                  <h3 className="mb-3">Whitney Francis</h3>
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
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="sticky top-4">
        {(page === PROFILE_PAGE ||
          page === ACTIVE_POSTS_PROFILE_PAGE ||
          page === CLOSED_POSTS_PROFILE_PAGE ||
          page === PROFILE_PORTFOLIO_PAGE) && (
          <>
            <section aria-labelledby="trending-heading" className="mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    <div className="mb-5 flex justify-center">
                      <span className="text-gray-500 dark:text-gray-300 text-sm">
                        Show your appreciation by leaving a tip
                      </span>
                    </div>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="mb-5 text-center block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-200  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      placeholder="$5"
                      aria-describedby="title-description"
                      value=""
                    ></input>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
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
                      Tip now
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <section aria-labelledby="trending-heading">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                    >
                      Follow
                    </button>
                    <button
                      type="button"
                      className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-orange-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
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
      </div>
    </aside>
  );
};

export default ProfileCard;
