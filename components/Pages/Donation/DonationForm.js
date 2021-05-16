import React, { useEffect } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { IconContext } from "react-icons/lib";
import { FaCoffee, FaPizzaSlice } from "react-icons/fa";
import { GiCroissant } from "react-icons/gi";
import { SiNetflix } from "react-icons/si";
import { useSelector } from "react-redux";
import Link from "next/link";

const DonationForm = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const userReducer = useSelector((state) => state.userReducer);

  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <nav className="flex mb-4 mx-4 sm:mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link href="/feed">
                <span className="cursor-pointer text-gray-400 hover:text-gray-500">
                  <svg
                    className="flex-shrink-0 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">Home</span>
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href={`/user/${userReducer.user?.id}`}>
                <span className="cursor-pointer ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {userReducer.user?.username}
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="ml-4 text-sm font-medium text-orange-500"
                aria-current="page"
              >
                Donate
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-700 px-4 shadow sm:px-6 sm:rounded-lg">
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y divide-gray-200 dark:sm:divide-gray-400">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Payment
              </dt>
              {false ? (
                <>
                  {false ? (
                    <dd className="text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex justify-between items-center">
                      <div className="flex justify-between w-full mr-3">
                        <span className="text-gray-500 dark:text-gray-100 font-bold">
                          Visa
                        </span>
                        <span className="text-gray-500 dark:text-gray-100">
                          **** **** **** 4344
                        </span>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
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
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Edit
                      </button>
                    </dd>
                  ) : (
                    <dd className="text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      <ul className="relative bg-white dark:bg-gray-700 rounded-3xl -space-y-px w-full">
                        <li>
                          <div
                            className={`relative border ${
                              true && "rounded-tl-md rounded-tr-md"
                            } flex justify-between`}
                          >
                            <label className="flex items-center justify-between text-sm cursor-pointer w-full  p-4">
                              <input
                                name="payment_method_id"
                                type="radio"
                                className="focus:ring-orange-500 h-4 w-4 text-orange-600 cursor-pointer border-gray-300"
                                aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                              />
                              <p
                                id="plan-option-pricing-1"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                              >
                                <span className="font-medium">
                                  **** **** **** 4325
                                </span>
                              </p>
                              <div
                                id="plan-option-limit-1"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:flex justify-end items-center"
                              >
                                <p
                                  id="plan-option-limit-2"
                                  className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right "
                                >
                                  Visa
                                </p>
                              </div>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`relative border ${
                              false && "rounded-tl-md rounded-tr-md"
                            } flex justify-between`}
                          >
                            <label className="flex items-center justify-between text-sm cursor-pointer w-full  p-4">
                              <input
                                name="payment_method_id"
                                type="radio"
                                className="focus:ring-orange-500 h-4 w-4 text-orange-600 cursor-pointer border-gray-300"
                                aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                              />
                              <p
                                id="plan-option-pricing-1"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                              >
                                <span className="font-medium">
                                  **** **** **** 4325
                                </span>
                              </p>
                              <div
                                id="plan-option-limit-1"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:flex justify-end items-center"
                              >
                                <p
                                  id="plan-option-limit-2"
                                  className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right "
                                >
                                  Visa
                                </p>
                              </div>
                            </label>
                          </div>
                        </li>
                        <li>
                          <div
                            className={`relative border ${
                              true && "rounded-bl-md rounded-br-md"
                            } flex justify-between`}
                          >
                            <label className="flex items-center justify-between text-sm cursor-pointer w-full  p-4">
                              <input
                                name="payment_method_id"
                                type="radio"
                                className="focus:ring-orange-500 h-4 w-4 text-orange-600 cursor-pointer border-gray-300"
                                aria-describedby="plan-option-pricing-0 plan-option-limit-0"
                              />
                              <p
                                id="plan-option-pricing-1"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                              >
                                <span className="font-medium">
                                  **** **** **** 4325
                                </span>
                              </p>
                              <div
                                id="plan-option-limit-1"
                                className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:flex justify-end items-center"
                              >
                                <p
                                  id="plan-option-limit-2"
                                  className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right "
                                >
                                  Visa
                                </p>
                              </div>
                            </label>
                          </div>
                        </li>
                      </ul>
                      <div className="flex justify-end mt-2">
                        <button className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                          Cancel
                        </button>
                        <button className="justify-center inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-3xl text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
                          Select
                        </button>
                      </div>
                    </dd>
                  )}
                </>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:flex justify-between items-center col-span-2">
                  <CardElement
                    options={{
                      hidePostalCode: true,
                      style: {
                        base: {
                          color: authReducer.theme ? "#fff" : "#424770",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#9e2146",
                        },
                      },
                    }}
                    className="block w-full border bg-white dark:bg-gray-600 border-gray-300  rounded-3xl shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </dd>
              )}
            </div>
            <div className="py-4 sm:pt-5 pb-6 sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Invite him to
              </dt>

              <dd className="mt-3 text-sm text-gray-900 dark:text-white">
                <fieldset>
                  <legend className="sr-only">Amount options</legend>
                  <div className="space-y-4">
                    <label className="relative block rounded-3xl border border-gray-300 bg-white dark:bg-gray-700 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between">
                      <input
                        type="radio"
                        name="server_size"
                        value="Hobby"
                        className="sr-only"
                        aria-labelledby="server-size-0-label"
                        aria-describedby="server-size-0-description-0 server-size-0-description-1"
                      />
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p
                            id="server-size-0-label"
                            className="font-medium  flex items-center"
                          >
                            <IconContext.Provider
                              value={{ size: 18, className: "mr-2" }}
                            >
                              <FaCoffee />
                            </IconContext.Provider>
                            A Coffe
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-0-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium">$4</div>
                      </div>
                      {/* Border selected */}
                      <div
                        className="border-orange-500 absolute -inset-px rounded-3xl border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>

                    <label className="relative block rounded-3xl border border-gray-300 bg-white dark:bg-gray-700 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between">
                      <input
                        type="radio"
                        name="server_size"
                        value="Startup"
                        className="sr-only"
                        aria-labelledby="server-size-1-label"
                        aria-describedby="server-size-1-description-0 server-size-1-description-1"
                      />
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p
                            id="server-size-2-label"
                            className="font-medium flex items-center"
                          >
                            <IconContext.Provider
                              value={{ size: 18, className: "mr-2" }}
                            >
                              <GiCroissant />
                            </IconContext.Provider>
                            A Breakfast
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-1-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium">$8</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-3xl border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>

                    <label className="relative block rounded-3xl border border-gray-300 bg-white dark:bg-gray-700 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between">
                      <input
                        type="radio"
                        name="server_size"
                        value="Business"
                        className="sr-only"
                        aria-labelledby="server-size-2-label"
                        aria-describedby="server-size-2-description-0 server-size-2-description-1"
                      />
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p
                            id="server-size-2-label"
                            className="font-medium  flex items-center"
                          >
                            <IconContext.Provider
                              value={{ size: 18, className: "mr-2" }}
                            >
                              <FaPizzaSlice />
                            </IconContext.Provider>
                            A Pizza
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-2-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium ">$12</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-3xl border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>

                    <label className="relative block rounded-3xl border border-gray-300 bg-white dark:bg-gray-700 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between">
                      <input
                        type="radio"
                        name="server_size"
                        value="Enterprise"
                        className="sr-only"
                        aria-labelledby="server-size-3-label"
                        aria-describedby="server-size-3-description-0 server-size-3-description-1"
                      />
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p
                            id="server-size-2-label"
                            className="font-medium  flex items-center"
                          >
                            <IconContext.Provider
                              value={{ size: 18, className: "mr-2" }}
                            >
                              <SiNetflix />
                            </IconContext.Provider>
                            A Netflix subscription
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-3-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium ">$16</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-3xl border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>
                  </div>
                </fieldset>

                <div className="relative my-4">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-100">
                      Other amount
                    </span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <input
                    type="text"
                    name="title"
                    id="donation-title"
                    className="text-center w-full block border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-300  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-3xl shadow-sm py-2 px-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="$ Other"
                    aria-describedby="title-description"
                    value=""
                  ></input>
                </div>
              </dd>
            </div>
            <div className="mb-4 sm:mb-5 pt-5">
              <div className="">
                <textarea
                  id="about"
                  name="about"
                  rows="3"
                  className="focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-300"
                  placeholder="Message (optional)"
                ></textarea>
              </div>
            </div>
          </dl>
        </div>
        <div className="pb-6">
          <button
            type="button"
            className="w-full uppercase bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
          >
            DONATE NOW
          </button>

          {authReducer.is_authenticated ? (
            <div className="flex justify-center mt-5 text-gray-500 dark:text-gray-100">
              <span className="text-xs flex items-center">
                You will earn{" "}
                <span className="text-orange-500 flex items-center mx-1">
                  <svg
                    className="w-4 h-4 inline"
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
                  5000 Karma
                </span>{" "}
                for this good action
              </span>
            </div>
          ) : (
            <div className="mt-5 flex justify-center">
              <span className="text-sm text-gray-400 dark:text-gray-300">
                Anonymous donation enabled, no sign in required
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
