import React from "react";
import Header from "components/Layout/Header";
import { Transition } from "@tailwindui/react";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const Layout = ({ children }) => {
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
    <div>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header handleToggleMessages={handleToggleMessages} />
        {children}
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
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
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

              <div className="absolute inset-y-0 right-0 pl-0 max-w-full flex sm:pl-16">
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
                  <div className="h-full flex flex-col pt-6 bg-white shadow-xl">
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
                      <div className="w-full bg-gray-100 ">
                        <div class="min-h-0 flex-1 overflow-y-auto">
                          <div class="bg-white pt-5 pb-6 shadow">
                            <div class="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
                              <div class="sm:w-0 sm:flex-1">
                                <h1
                                  id="message-heading"
                                  class="text-lg font-medium text-gray-900"
                                >
                                  Leslie Alexander
                                </h1>
                                <p class="mt-1 text-sm text-gray-500 truncate">
                                  joearmstrong@example.com
                                </p>
                              </div>
                            </div>
                          </div>
                          <ul
                            class="py-4 space-y-2 sm:px-6 sm:space-y-4 lg:px-8"
                            style={{ height: "calc(100vh - 196px)" }}
                          >
                            <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                              <div class="sm:flex sm:justify-between sm:items-baseline">
                                <h3 class="text-base font-medium">
                                  <span class="text-gray-900">
                                    Joe Armstrong
                                  </span>
                                  <span class="text-gray-600">wrote</span>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                                  <time dateTime="2021-01-28T19:24">
                                    Yesterday at 7:24am
                                  </time>
                                </p>
                              </div>
                              <div class="mt-4 space-y-6 text-sm text-gray-800">
                                <p>Thanks so much! Can't wait to try it out.</p>
                              </div>
                            </li>

                            <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                              <div class="sm:flex sm:justify-between sm:items-baseline">
                                <h3 class="text-base font-medium">
                                  <span class="text-gray-900">
                                    Monica White
                                  </span>
                                  <span class="text-gray-600">wrote</span>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                                  <time dateTime="2021-01-27T16:35">
                                    Wednesday at 4:35pm
                                  </time>
                                </p>
                              </div>
                              <div class="mt-4 space-y-6 text-sm text-gray-800">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Malesuada at ultricies
                                  tincidunt elit et, enim. Habitant nunc,
                                  adipiscing non fermentum, sed est a, aliquet.
                                  Lorem in vel libero vel augue aliquet dui
                                  commodo.
                                </p>
                                <p>
                                  Nec malesuada sed sit ut aliquet. Cras ac
                                  pharetra, sapien purus vitae vestibulum auctor
                                  faucibus ullamcorper. Leo quam tincidunt
                                  porttitor neque, velit sed. Tortor mauris
                                  ornare ut tellus sed aliquet amet venenatis
                                  condimentum. Convallis accumsan et nunc
                                  eleifend.
                                </p>
                                <p>
                                  <strong className="font-weight-normal">
                                    Monica White
                                  </strong>
                                  <br />
                                  Customer Service
                                </p>
                              </div>
                            </li>

                            <li class="bg-white px-4 py-6 shadow sm:rounded-lg sm:px-6">
                              <div class="sm:flex sm:justify-between sm:items-baseline">
                                <h3 class="text-base font-medium">
                                  <span class="text-gray-900">
                                    Joe Armstrong
                                  </span>
                                  <span class="text-gray-600">wrote</span>
                                </h3>
                                <p class="mt-1 text-sm text-gray-600 whitespace-nowrap sm:mt-0 sm:ml-3">
                                  <time dateTime="2021-01-27T16:09">
                                    Wednesday at 4:09pm
                                  </time>
                                </p>
                              </div>
                              <div class="mt-4 space-y-6 text-sm text-gray-800">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Malesuada at ultricies
                                  tincidunt elit et, enim. Habitant nunc,
                                  adipiscing non fermentum, sed est a, aliquet.
                                  Lorem in vel libero vel augue aliquet dui
                                  commodo.
                                </p>
                                <p>
                                  Nec malesuada sed sit ut aliquet. Cras ac
                                  pharetra, sapien purus vitae vestibulum auctor
                                  faucibus ullamcorper. Leo quam tincidunt
                                  porttitor neque, velit sed. Tortor mauris
                                  ornare ut tellus sed aliquet amet venenatis
                                  condimentum. Convallis accumsan et nunc
                                  eleifend.
                                </p>
                                <p>– Joe</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Transition>
    </div>
  );
};

export default Layout;
