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
              className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
            >
              <div class="bg-white shadow sm:rounded-lg">
                <div class="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    class="text-lg leading-6 font-medium text-gray-900"
                  >
                    Create Post
                  </h2>
                </div>
                <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Application for
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        Backend Developer
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        ricardocooper@example.com
                      </dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">
                        Salary expectation
                      </dt>
                      <dd class="mt-1 text-sm text-gray-900">$120,000</dd>
                    </div>
                    <div class="sm:col-span-1">
                      <dt class="text-sm font-medium text-gray-500">Phone</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        +1 555-555-5555
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt class="text-sm font-medium text-gray-500">About</dt>
                      <dd class="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
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
                    </div>
                  </dl>
                </div>
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
