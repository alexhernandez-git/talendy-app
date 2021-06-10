import Layout from "components/Dashboard/Layout";
import { USER_DETAIL_DASHBOARD_PAGE } from "pages";
import React from "react";
import StarRatings from "react-star-ratings";

const DashboardUserDetail = () => {
  const page = USER_DETAIL_DASHBOARD_PAGE;
  return (
    <Layout page={page}>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      className="h-16 w-16 rounded-full"
                      src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                      alt=""
                    />
                    <span
                      className="absolute inset-0 shadow-inner rounded-full"
                      aria-hidden="true"
                    ></span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Ricardo Cooper
                  </h1>
                  <p className="text-sm font-medium text-gray-500">
                    <a
                      href="/user/reviews/5971d368-5fc8-42ee-83af-c6dd71fede8e"
                      target="_blank"
                    >
                      <button className="cursor-pointer">
                        <StarRatings
                          rating={4.5}
                          starRatedColor="#e5c07b"
                          numberOfStars={5}
                          starHoverColor="#e5c07b"
                          starDimension="15px"
                          starSpacing="0px"
                          name="rating"
                        />
                      </button>
                    </a>
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse items-center justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                <a
                  href="/user/5971d368-5fc8-42ee-83af-c6dd71fede8e"
                  target="_blank"
                >
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                  >
                    See the profile{" "}
                  </button>
                </a>
                <div class="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      class="rounded-full flex items-center text-gray-400 hover:text-gray-600"
                      id="menu-button"
                      aria-expanded="true"
                      aria-haspopup="true"
                    >
                      <span class="sr-only">Open options</span>
                      <svg
                        class="h-5 w-5"
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
                    class="z-30 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div class="py-1" role="none">
                      <a
                        href="#"
                        class="text-red-600 font-bold block px-4 py-2 text-sm text-center"
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                      >
                        Disable account
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
              <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                <section aria-labelledby="applicant-information-title">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="applicant-information-title"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Applicant Information
                      </h2>
                      <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Personal details and application.
                      </p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Username
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            sadgorilla813
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Email address
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            alex@gmail.com
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Karma amount
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
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
                                2121 Karma
                              </span>
                              <span className="sr-only">karmas amount</span>
                            </span>
                          </dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Country
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">Spain</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">120</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts created
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">4</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts created (active)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">3</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts created (solved)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">1</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts collaborated
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">10</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts collaborated (active)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">3</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            Posts collaborated (solved)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">4</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Reputation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">4.5</dd>
                        </div>
                        <div className="sm:col-span-1">
                          <dt className="text-sm font-medium text-gray-500">
                            Reviews
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">40</dd>
                        </div>
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-medium text-gray-500">
                            About
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            Fugiat ipsum ipsum deserunt culpa aute sint do
                            nostrud anim incididunt cillum culpa consequat.
                            Excepteur qui ipsum aliquip consequat sint. Sit id
                            mollit nulla mollit nostrud in ea officia proident.
                            Irure nostrud pariatur mollit ad adipisicing
                            reprehenderit deserunt qui eu.
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </section>
              </div>

              <section
                aria-labelledby="timeline-title"
                className="lg:col-start-3 lg:col-span-1"
              >
                <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                  <h2
                    id="timeline-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    Timeline
                  </h2>

                  <div className="mt-6 flow-root">
                    <ul className="-mb-8">
                      <li>
                        <div className="relative pb-8">
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                                <svg
                                  className="w-5 h-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Applied to{" "}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    Front End Developer
                                  </a>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time datetime="2020-09-20">Sep 20</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="relative pb-8">
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                <svg
                                  className="w-5 h-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Advanced to phone screening by{" "}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    Bethany Blake
                                  </a>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time datetime="2020-09-22">Sep 22</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="relative pb-8">
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                <svg
                                  className="w-5 h-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Completed phone screening with{" "}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    Martha Gardner
                                  </a>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time datetime="2020-09-28">Sep 28</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="relative pb-8">
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          ></span>
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                                <svg
                                  className="w-5 h-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Advanced to interview by{" "}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    Bethany Blake
                                  </a>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time datetime="2020-09-30">Sep 30</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <div className="relative pb-8">
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                                <svg
                                  className="w-5 h-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Completed interview with{" "}
                                  <a
                                    href="#"
                                    className="font-medium text-gray-900"
                                  >
                                    Katherine Snyder
                                  </a>
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                <time datetime="2020-10-04">Oct 4</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 flex flex-col justify-stretch">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                    >
                      More
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default DashboardUserDetail;
