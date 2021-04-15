import React from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { Transition } from "@tailwindui/react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createAlert } from "redux/actions/alerts";

const PostModal = ({ modalOpen, modalRef, handleCloseModal }) => {
  const router = useRouter();
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  const dispatch = useDispatch();

  const userReducer = useSelector((state) => state.userReducer);
  const handleRequestToContribute = () => {
    if (!userReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
    }
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
          className="fixed z-40 inset-0 overflow-y-auto"
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
            <article
              ref={modalRef}
              aria-labelledby="question-title-81614"
              className="inline-block align-bottom relative bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
            >
              <div className="flex justify-end mb-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-3xl p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 outline-none ring-1 ring-inset ring-white"
                  aria-expanded="false"
                >
                  <svg
                    className={`block h-4 w-4`}
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
              <div className=" grid grid-cols-1 gap-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                <div className="space-y-6 lg:col-start-1 lg:col-span-2">
                  <div className="flex justify-between items-baseline">
                    <h2
                      id="question-title-81614"
                      className="text-xl font-medium text-gray-900 dark:text-white"
                    >
                      What would you have done differently if you ran Jurassic
                      Park?
                    </h2>
                  </div>
                  <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4">
                    <p>
                      Jurassic Park was an incredible idea and a magnificent
                      feat of engineering, but poor protocols and a disregard
                      for human safety killed what could have otherwise been one
                      of the best businesses of our generation.
                    </p>
                    <p>
                      Ultimately, I think that if you wanted to run the park
                      successfully and keep visitors safe, the most important
                      thing to prioritize would be Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Cumque dolor eligendi,
                      culpa, quaerat earum possimus porro nam perspiciatis
                      tempora temporibus tenetur optio ipsa distinctio cum! Sunt
                      soluta veritatis nisi id?
                    </p>
                  </div>

                  <div className="mt-4 relative">
                    <img src="/static/images/freelaniumsc.png" />
                    <div className="absolute bottom-4 right-4">
                      <a
                        target="_blank"
                        href={"/static/images/freelaniumsc.png"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4 bg-green-50 dark:bg-green-700 p-3 rounded shadow">
                    <span className="font-medium">Solution</span>
                    <p>
                      Jurassic Park was an incredible idea and a magnificent
                      feat of engineering, but poor protocols and a disregard
                      for human safety killed what could have otherwise been one
                      of the best businesses of our generation.
                    </p>
                    <p>
                      Ultimately, I think that if you wanted to run the park
                      successfully and keep visitors safe, the most important
                      thing to prioritize would be Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Cumque dolor eligendi,
                      culpa, quaerat earum possimus porro nam perspiciatis
                      tempora temporibus tenetur optio ipsa distinctio cum! Sunt
                      soluta veritatis nisi id?
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between space-x-8">
                    <div className="flex space-x-6">
                      <span className="inline-flex items-center text-sm">
                        <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                          <svg
                            className="h-5 w-5 text-orange-500"
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
                            100 Karma
                          </span>
                          <span className="sr-only">karmas amount</span>
                        </button>
                      </span>
                    </div>

                    <div className="flex text-sm">
                      <span className="inline-flex items-center text-sm">
                        <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                          </svg>
                          <span className="font-medium text-gray-900 dark:text-white">
                            Share
                          </span>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between space-x-8">
                    <span className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Private
                    </span>
                  </div>
                  <div className="mt-6 flex justify-between space-x-8">
                    <span className="mt-2 flex w-full items-center justify-center px-4 py-2 border dark:border-green-300 border-green-500 shadow-sm text-sm font-medium rounded-3xl dark:text-green-300 text-green-500 bg-white dark:bg-gray-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Solved
                    </span>
                  </div>
                  <div className="mt-6 flex justify-between space-x-8">
                    <input
                      type="text"
                      name="title"
                      onClick={(e) => e.stopPropagation()}
                      id="title"
                      className="block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-300  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-3xl shadow-sm py-2 px-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Message"
                      aria-describedby="title-description"
                      value=""
                    />
                    <button
                      type="button"
                      onClick={handleRequestToContribute}
                      className="w-72 bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                    >
                      Request to contribute
                    </button>
                  </div>
                </div>
                <div className="lg:col-start-3 lg:col-span-1">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        <span
                          onClick={handleGoToProfile}
                          className="hover:underline cursor-pointer"
                        >
                          Dries Vincent
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-100">
                        <time dateTime="2020-12-09T11:43:00">
                          December 9 at 11:43 AM
                        </time>
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link href="/contribute/123">
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        Contribute
                      </button>
                    </Link>
                  </div>
                  <div className="mt-5">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Members Contributing
                    </h3>
                    <ul className="mt-2 border-t border-gray-200 dark:border-gray-400 divide-y divide-gray-200 dark:divide-gray-400">
                      <li className="py-3 flex justify-between items-center">
                        <div className="flex items-center">
                          <img
                            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                            alt=""
                            className="w-8 h-8 rounded-full"
                          />

                          <p
                            onClick={handleGoToProfile}
                            className="cursor-pointer ml-4 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Aimee Douglas
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default PostModal;
