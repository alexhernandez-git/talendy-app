import React from "react";

const RightSidebar = () => {
  return (
    <aside className="hidden xl:block xl:col-span-4">
      <div className="sticky top-4 space-y-4">
        <section aria-labelledby="who-to-follow-heading">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2
                id="who-to-follow-heading"
                className="text-base font-medium text-gray-900"
              >
                Top Karmas
              </h2>
              <div className="mt-6 flow-root">
                <ul className="-my-4 divide-y divide-gray-200">
                  <li className="flex items-center py-4 space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        <a href="#">Leonard Krasner</a>
                      </p>
                      <p className="text-sm text-orange-500 flex items-center">
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
                        34000 Karmas
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-0.5 rounded-full bg-orange-50 text-sm font-medium text-orange-700 hover:bg-orange-100"
                      >
                        <svg
                          className="-ml-1 mr-0.5 h-5 w-5 text-orange-400"
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
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View all
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* <section aria-labelledby="trending-heading">
                    <div className="bg-white rounded-lg shadow">
                      <div className="p-6">
                        <h2
                          id="trending-heading"
                          className="text-base font-medium text-gray-900"
                        >
                          Trending
                        </h2>
                        <div className="mt-6 flow-root">
                          <ul className="-my-4 divide-y divide-gray-200">
                            <li className="flex py-4 space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt="Floyd Miles"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-800">
                                  What books do you have on your bookshelf just
                                  to look smarter than you actually are?
                                </p>
                                <div className="mt-2 flex">
                                  <span className="inline-flex items-center text-sm">
                                    <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                      <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="font-medium text-gray-900">
                                        291
                                      </span>
                                    </button>
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-6">
                          <a
                            href="#"
                            className="w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View all
                          </a>
                        </div>
                      </div>
                    </div>
                  </section> */}
      </div>
    </aside>
  );
};

export default RightSidebar;
