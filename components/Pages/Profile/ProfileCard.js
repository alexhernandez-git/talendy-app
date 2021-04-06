import React from "react";

const ProfileCard = ({ mobile }) => {
  return (
    <aside
      className={`lg:col-span-4  mb-10 lg:mb-0 ${
        mobile ? "block lg:hidden" : "hidden lg:block"
      }`}
    >
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="who-to-follow-heading" className="">
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
        <section aria-labelledby="trending-heading">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
            <div className="p-6">
              <div>
                <button
                  type="button"
                  class="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                >
                  Follow
                </button>
                <button
                  type="button"
                  class="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-orange-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
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
      </div>
    </aside>
  );
};

export default ProfileCard;
