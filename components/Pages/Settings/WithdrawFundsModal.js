import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "components/Layout/Spinner";

const WithdrawFundsModal = ({
  withdrawFundsRef,
  openWithdrawFunds,
  handleCloseWithdrawFunds,
}) => {
  const userReducer = useSelector((state) => state.userReducer);
  const earningsReducer = useSelector((state) => state.earningsReducer);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .typeError("Amount must be a number")
        .positive("Amount must be greater than zero")
        .required("Amount is required")
        .moreThan(1, "Amount must be greater than $1.00")
        .lessThan(
          userReducer.user?.available_for_withdrawal + 1,
          `Amount can not exceed total available for withdrawal ($${userReducer.user?.available_for_withdrawal})`
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
    },
  });

  return (
    <div
      className={`${
        !openWithdrawFunds && "hidden"
      } fixed z-10 inset-0 overflow-y-auto `}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <form id="withdraw-funds-form" onSubmit={formik.handleSubmit}>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            ref={withdrawFundsRef}
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            {earningsReducer?.withdrawing_founds && (
              <div className="absolute right-6">
                <Spinner />
              </div>
            )}
            <div>
              <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                <div>
                  <div className="sm:pb-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Withdraw Funds
                    </h3>
                  </div>

                  <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200">
                      <label
                        for="first_name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Transfer to
                      </label>

                      <div className="mt-1   sm:mt-0 sm:col-span-2">
                        <div className="flex items-center">
                          <div className="h-5 w-5">
                            <img
                              className="w-full"
                              src="/static/images/paypal-logo.png"
                              alt=""
                            />
                          </div>
                          <div className="relative text-gray-500 ml-2">
                            PayPal Account
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200">
                      <label
                        for="first_name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Paypal account
                      </label>

                      <div className="mt-1   sm:mt-0 sm:col-span-2">
                        <div className="flex items-center">
                          <div className="relative text-gray-500">
                            {userReducer.user?.paypal_email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200">
                      <label
                        for="first_name"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Amount
                      </label>

                      <div className="mt-1   sm:mt-0 sm:col-span-2">
                        <div>
                          <div className="relative">
                            <input
                              type="text"
                              name="amount"
                              id="amount"
                              className={
                                formik.touched.amount && formik.errors.amount
                                  ? "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                                  : "shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              }
                              placeholder={`$300`}
                              form={"withdraw-funds-form"}
                              aria-describedby="amount"
                              value={formik.values.amount}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.amount && formik.errors.amount && (
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <svg
                                  className="h-5 w-5 text-red-500"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>

                        {formik.touched.amount && formik.errors.amount && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="amount-error"
                          >
                            {formik.errors.amount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
              <button
                type="submit"
                form={"withdraw-funds-form"}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-teal-500 to-orange-600 text-base font-medium text-white hover:from-teal-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:col-start-2 sm:text-sm"
              >
                ​ Withdraw Funds
              </button>
              <button
                type="button"
                onClick={handleCloseWithdrawFunds}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <span>
                Currency conversion fees are included. Please note{" "}
                <span className="text-bold">
                  withdrawals are limited to 5000 per withdrawal
                </span>{" "}
                and cannot be undone. It may take up to 7 business days to
                transfer funds. Your bank or payment processor may apply extra
                fees.
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawFundsModal;
