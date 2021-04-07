import React from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { Transition } from "@tailwindui/react";
import {
  ACTIVE_HELPED_IN_PAGE,
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_HELPED_IN_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  HELPED_IN_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
  MY_POSTS_PAGE,
  PROFILE_PAGE,
  SEARCH_POSTS_PAGE,
} from "pages";
import Link from "next/link";
import { useRouter } from "next/router";
import Editor from "components/Editor/Editor";

const PostModal = ({ page, image, modalOpen, modalRef }) => {
  const router = useRouter();
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/profile/123");
  };
  return (
    <Transition
      show={modalOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      {(refModal) => (
        <div
          ref={refModal}
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <Transition
              show={modalOpen}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {(ref) => (
                <>
                  <div
                    ref={ref}
                    className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"
                    aria-hidden="true"
                  ></div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                </>
              )}
            </Transition>
            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}

            <section
              ref={modalRef}
              className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-full sm:max-w-2xl w-full"
            >
              <div class="shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6 bg-gradient-to-r from-orange-500 to-pink-500  sm:rounded-t-lg">
                  <h2
                    id="applicant-information-title"
                    class="text-lg leading-6 font-medium text-white"
                  >
                    Create Post
                  </h2>
                </div>
                <div class=" px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="sm:col-start-2">
                      <dd class="mt-1 text-sm text-gray-900 flex justify-end">
                        <div>
                          <label id="listbox-label" class="sr-only">
                            Change published status
                          </label>
                          <div class="relative">
                            <div class="inline-flex shadow-sm rounded-md divide-x divide-gray-900">
                              <div class="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-200 dark:divide-gray-900">
                                <div class="relative inline-flex items-center dark:bg-gray-800 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-gray-900 dark:text-white">
                                  <svg
                                    class="h-5 w-5"
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
                                  <p class="ml-2.5 text-sm font-medium">
                                    Anyone
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  class="relative inline-flex items-center dark:bg-gray-800 p-2 rounded-l-none rounded-r-md text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                                  aria-haspopup="listbox"
                                  aria-expanded="true"
                                  aria-labelledby="listbox-label"
                                >
                                  <span class="sr-only">
                                    Change published status
                                  </span>
                                  <svg
                                    class="h-5 w-5 "
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>

                            {/* <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
                            <ul
                              class="origin-top-right absolute right-0 mt-2 w-full sm:w-72 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
                              tabindex="-1"
                              role="listbox"
                              aria-labelledby="listbox-label"
                              aria-activedescendant="listbox-option-0"
                            >
                              {/* <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-gray-800", Not Highlighted: "text-gray-900"
      --> */}
                              <li
                                class="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                                id="listbox-option-0"
                                role="option"
                              >
                                <div class="flex flex-col">
                                  <div class="flex justify-between">
                                    {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                                    <p class="font-semibold">Anyone</p>
                                    {/* <!--
              Checkmark, only display for selected option.

              Highlighted: "text-white", Not Highlighted: "text-orange-500"
            --> */}
                                    <span class="text-gray-900 dark:text-white">
                                      <svg
                                        class="h-5 w-5"
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
                                  {/* <!-- Highlighted: "text-orange-200", Not Highlighted: "text-gray-500" --> */}
                                  <p class="text-gray-500 dark:text-gray-300 mt-2">
                                    Everyone can ask to help you.
                                  </p>
                                </div>
                              </li>
                              <li
                                class="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                                id="listbox-option-0"
                                role="option"
                              >
                                <div class="flex flex-col">
                                  <div class="flex justify-between">
                                    {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                                    <p class="font-normal">Connections only</p>
                                    {/* <!--
              Checkmark, only display for selected option.

              Highlighted: "text-white", Not Highlighted: "text-orange-500"
            --> */}
                                    <span class="text-orange-500 hidden">
                                      <svg
                                        class="h-5 w-5"
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
                                  {/* <!-- Highlighted: "text-orange-200", Not Highlighted: "text-gray-500" --> */}
                                  <p class="text-gray-500 dark:text-gray-300 mt-2">
                                    Only your connections can ask to help you.
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dd class="mt-1 text-sm text-gray-900">
                        <Editor title />
                      </dd>
                    </div>
                    {/* <div class="sm:col-span-2">
                      <dt class="text-sm font-medium text-gray-500">
                        Attachments
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        <ul class="border border-gray-200 rounded-md divide-y divide-gray-200">
                          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div class="w-0 flex-1 flex items-center">
                              <svg
                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="ml-2 flex-1 w-0 truncate">
                                resume_front_end_developer.pdf
                              </span>
                            </div>
                            <div class="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                class="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>

                          <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div class="w-0 flex-1 flex items-center">
                              <svg
                                class="flex-shrink-0 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clip-rule="evenodd"
                                />
                              </svg>
                              <span class="ml-2 flex-1 w-0 truncate">
                                coverletter_front_end_developer.pdf
                              </span>
                            </div>
                            <div class="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                class="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>*/}
                  </dl>
                </div>
                <div class="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6">
                  <button
                    type="submit"
                    class="bg-gray-800 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-gray-900 "
                  >
                    Save
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default PostModal;
