import React from "react";
import { CardElement } from "@stripe/react-stripe-js";

const DonationForm = () => {
  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <div className="bg-white dark:bg-gray-700 px-4 shadow sm:px-6 sm:rounded-lg">
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt className="text-sm font-medium text-gray-500">Payment</dt>
              {true ? (
                <>
                  {true ? (
                    <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex justify-between items-center">
                      <div className="flex justify-between w-full mr-3">
                        <span className="text-gray-500 font-bold">Visa</span>
                        <span className="text-gray-500">
                          **** **** **** 4344
                        </span>
                      </div>
                      <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
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
                    <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <ul className="relative bg-white rounded-md -space-y-px w-full">
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
                        <button className="mr-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                          Cancel
                        </button>
                        <button className="justify-center inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
                          Select
                        </button>
                      </div>
                    </dd>
                  )}
                </>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:flex justify-between items-center col-span-2">
                  <CardElement className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />

                  <button className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-2 justify-center inline-flex items-center px-4 py-2 shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
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
                    Add
                  </button>
                </dd>
              )}
            </div>
            <div className="py-4 sm:py-5 sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Invite him to
              </dt>

              <dd className="mt-3 text-sm text-gray-900">
                <fieldset>
                  <legend className="sr-only">Amount options</legend>
                  <div className="space-y-4">
                    <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-orange-500">
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
                            className="font-medium text-gray-900"
                          >
                            A Coffe
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-0-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium text-gray-900">$3</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>

                    <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-orange-500">
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
                            id="server-size-1-label"
                            className="font-medium text-gray-900"
                          >
                            A Breakfast
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-1-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium text-gray-900">$6</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>

                    <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-orange-500">
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
                            className="font-medium text-gray-900"
                          >
                            A Pizza
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-2-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium text-gray-900">$12</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>

                    <label className="relative block rounded-lg border border-gray-300 bg-white shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus-within:ring-1 focus-within:ring-offset-2 focus-within:ring-orange-500">
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
                            id="server-size-3-label"
                            className="font-medium text-gray-900"
                          >
                            A Netflix subscription
                          </p>
                        </div>
                      </div>
                      <div
                        id="server-size-3-description-1"
                        className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                      >
                        <div className="font-medium text-gray-900">$16</div>
                      </div>
                      <div
                        className="border-transparent absolute -inset-px rounded-lg border-2 pointer-events-none"
                        aria-hidden="true"
                      ></div>
                    </label>
                  </div>
                </fieldset>
                <div className="mt-4">
                  <div>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      class="mt-2 text-center block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-200  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Other amount"
                      aria-describedby="title-description"
                      value=""
                    ></input>
                  </div>
                </div>
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt className="text-sm font-medium text-gray-500">
                Email address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                margotfoster@example.com
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt className="text-sm font-medium text-gray-500">
                Salary expectation
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                $120,000
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">About</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
