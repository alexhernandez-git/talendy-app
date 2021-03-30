import React from "react";
import Header from "components/Layout/Header";
import { useState } from "react";
import { Transition } from "@tailwindui/react";
import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
const Layout = () => {
  const [messagesOpen, setMessagesOpen] = useState(false);
  const handleOpenMessages = () => {
    setMessagesOpen(true);
  };
  const handleCloseMessages = () => {
    setMessagesOpen(false);
  };
  const handleToggleMessages = () => {
    setMessagesOpen(!messagesOpen);
  };
  const messagesRef = useRef();
  useOutsideClick(messagesRef, () => handleCloseMessages());
  return (
    <>
      <div>
        <div className="min-h-screen bg-gray-100">
          <Header handleToggleMessages={handleToggleMessages} />
          <div className="py-10">
            <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="hidden lg:block lg:col-span-3 xl:col-span-2">
                <nav
                  aria-label="Sidebar"
                  className="sticky top-4 divide-y divide-gray-300"
                >
                  <div className="">
                    <p
                      className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                      id="communities-headline"
                    >
                      Communities
                    </p>
                    <div
                      className="mt-3 space-y-2"
                      aria-labelledby="communities-headline"
                    >
                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Development</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Business</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Finance & Accounting</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">IT & Software</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Office Productivity</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Personal Development</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Design</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Marketing</span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Health & Fitness</span>
                      </a>
                      <a
                        href="#"
                        className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                      >
                        <span className="truncate">Music</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
              <main className="lg:col-span-9 xl:col-span-6">
                <div className="px-4 sm:px-0">
                  <div className="sm:hidden">
                    <label htmlFor="question-tabs" className="sr-only">
                      Select a tab
                    </label>
                    <select
                      id="question-tabs"
                      className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    >
                      <option>Recent</option>

                      <option>Most Karmas</option>

                      <option>Most Followed</option>
                    </select>
                  </div>
                  <div className="hidden sm:block">
                    <nav
                      className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                      aria-label="Tabs"
                    >
                      <a
                        href="#"
                        aria-current="page"
                        className="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                      >
                        <span>Recent</span>
                        <span
                          aria-hidden="true"
                          className="bg-orange-500 absolute inset-x-0 bottom-0 h-0.5"
                        ></span>
                      </a>

                      <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                      >
                        <span>Most Karmas</span>
                        <span
                          aria-hidden="true"
                          className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                        ></span>
                      </a>

                      <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                      >
                        <span>Followed</span>
                        <span
                          aria-hidden="true"
                          className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                        ></span>
                      </a>
                    </nav>
                  </div>
                </div>
                <div className="mt-4">
                  <h1 className="sr-only">Recent questions</h1>
                  <ul className="space-y-4">
                    <li className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
                      <article aria-labelledby="question-title-81614">
                        <div>
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                <a href="#" className="hover:underline">
                                  Dries Vincent
                                </a>
                              </p>
                              <p className="text-sm text-gray-500">
                                <a href="#" className="hover:underline">
                                  <time datetime="2020-12-09T11:43:00">
                                    December 9 at 11:43 AM
                                  </time>
                                </a>
                              </p>
                            </div>
                            <div className="flex-shrink-0 self-center flex">
                              <div className="relative inline-block text-left">
                                <div>
                                  <button
                                    type="button"
                                    className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600"
                                    id="options-menu-0"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                  >
                                    <span className="sr-only">
                                      Open options
                                    </span>

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
                                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu-0"
                                >
                                  <div className="py-1" role="none">
                                    <a
                                      href="#"
                                      className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                      <span>Add to favorites</span>
                                    </a>
                                    <a
                                      href="#"
                                      className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span>Embed</span>
                                    </a>
                                    <a
                                      href="#"
                                      className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span>Report content</span>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h2
                            id="question-title-81614"
                            className="mt-4 text-base font-medium text-gray-900"
                          >
                            What would you have done differently if you ran
                            Jurassic Park?
                          </h2>
                        </div>
                        <div className="mt-2 text-sm text-gray-700 space-y-4">
                          <p>
                            Jurassic Park was an incredible idea and a
                            magnificent feat of engineering, but poor protocols
                            and a disregard for human safety killed what could
                            have otherwise been one of the best businesses of
                            our generation.
                          </p>
                          <p>
                            Ultimately, I think that if you wanted to run the
                            park successfully and keep visitors safe, the most
                            important thing to prioritize would be&hellip;
                          </p>
                        </div>
                        <div className="mt-6 flex justify-between space-x-8">
                          <div className="flex space-x-6">
                            <span className="inline-flex items-center text-sm">
                              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                </svg>
                                <span className="font-medium text-gray-900">
                                  29
                                </span>
                                <span className="sr-only">likes</span>
                              </button>
                            </span>
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
                                  11
                                </span>
                                <span className="sr-only">replies</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span className="font-medium text-gray-900">
                                  2.7k
                                </span>
                                <span className="sr-only">views</span>
                              </button>
                            </span>
                          </div>
                          <div className="flex text-sm">
                            <span className="inline-flex items-center text-sm">
                              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                                </svg>
                                <span className="font-medium text-gray-900">
                                  Share
                                </span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  </ul>
                </div>
              </main>
              <aside className="hidden xl:block xl:col-span-4">
                <div className="sticky top-4 space-y-4">
                  <section aria-labelledby="who-to-follow-heading">
                    <div className="bg-white rounded-lg shadow">
                      <div className="p-6">
                        <h2
                          id="who-to-follow-heading"
                          className="text-base font-medium text-gray-900"
                        >
                          Who to follow
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
                                <p className="text-sm text-gray-500">
                                  <a href="#">@leonardkrasner</a>
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
                  <section aria-labelledby="trending-heading">
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
                  </section>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={messagesOpen}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div
            ref={ref}
            class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            aria-hidden="true"
          ></div>
        )}
      </Transition>
      <Transition
        show={messagesOpen}
        enter="transform transition ease-in-out duration-500 sm:duration-700"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500 sm:duration-700"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        {(ref) => (
          <section
            ref={ref}
            className="fixed inset-0 overflow-hidden z-10"
            aria-labelledby="slide-over-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0" aria-hidden="true"></div>

              <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                {/* <!--
        Slide-over panel, show/hide based on slide-over state.

        Entering: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-full"
          To: "translate-x-0"
        Leaving: "transform transition ease-in-out duration-500 sm:duration-700"
          From: "translate-x-0"
          To: "translate-x-full"
      --> */}
                <div ref={messagesRef} className="w-screen max-w-5xl">
                  <div className="h-full flex flex-col pt-6 bg-white shadow-xl overflow-y-scroll">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Messages
                        </h2>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            onClick={handleToggleMessages}
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="h-6 w-6"
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
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex h-full">
                      <ul className="divide-y divide-gray-200 overflow-y-auto h-full w-72">
                        <li className="px-6 py-5 relative">
                          <div className="group flex justify-between items-center">
                            <a href="#" className="-m-1 p-1 block">
                              <div
                                className="absolute inset-0 group-hover:bg-gray-50"
                                aria-hidden="true"
                              ></div>
                              <div className="flex-1 flex items-center min-w-0 relative">
                                <span className="flex-shrink-0 inline-block relative">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                  />
                                  <span
                                    className="bg-green-400 absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                                    aria-hidden="true"
                                  ></span>
                                </span>
                                <div className="ml-4 truncate">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    Leslie Alexander
                                  </p>
                                  <p className="text-sm text-gray-500 truncate">
                                    @lesliealexander
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                        </li>
                      </ul>
                      <div className="w-full bg-gray-100">fewafe</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Transition>
    </>
  );
};

export default Layout;
