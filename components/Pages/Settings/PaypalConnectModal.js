import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

const PaypalConnectModal = ({
  paypalConnectModalRef,
  openPaypalConnectModal,
  handleClosePaypalConnectModal,
}) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      email_confirmation: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("PayPal email is required"),
      email_confirmation: Yup.string()
        .email()
        .oneOf([Yup.ref("email"), null], "Emails must match")
        .required("PayPal email confirmation is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
    },
  });
  return (
    <div
      className={`${
        !openPaypalConnectModal && "hidden"
      } fixed z-10 inset-0 overflow-y-auto `}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <form id="paypal-connect-form" onSubmit={formik.handleSubmit}></form>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          ref={paypalConnectModalRef}
          className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div className="sm:pb-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Configure Your PayPal Account
                  </h3>
                </div>
                <div className="mb-3 text-sm text-gray-500 dark:text-gray-300">
                  <span>
                    We will use this PayPal account to send you money when you
                    initiate a withdrawal.
                  </span>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <label
                        for="company_website"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                      >
                        Email
                      </label>
                      <div className="mt-1 relative rounded-3xl shadow-sm">
                        <input
                          type="text"
                          form="paypal-connect-form"
                          name="email"
                          id="email"
                          className={
                            formik.touched.email && formik.errors.email
                              ? "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-3xl dark:bg-gray-600"
                              : "shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-3xl dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          }
                          placeholder="johndoe@gmail.com"
                          aria-describedby="email-description"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
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
                      {formik.touched.email && formik.errors.email && (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {formik.errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3">
                      <label
                        for="company_website"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                      >
                        Email confirmation
                      </label>
                      <div className="mt-1 relative rounded-3xl shadow-sm">
                        <input
                          type="text"
                          form="paypal-connect-form"
                          name="email_confirmation"
                          id="email_confirmation"
                          className={
                            formik.touched.email_confirmation &&
                            formik.errors.email_confirmation
                              ? "block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-3xl dark:bg-gray-600"
                              : "shadow-sm focus:ring-orange-500 focus:border-orange-500 block w-full sm:text-sm border-gray-300 rounded-3xl dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          }
                          placeholder="johndoe@gmail.com"
                          aria-describedby="email_confirmation-description"
                          value={formik.values.email_confirmation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email_confirmation &&
                          formik.errors.email_confirmation && (
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
                      {formik.touched.email_confirmation &&
                        formik.errors.email_confirmation && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email_confirmation-error"
                          >
                            {formik.errors.email_confirmation}
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-300">
            <span>
              We will not be able to recover funds sent to the wrong address,
              please make sure the information you enter is correct.
            </span>
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              type="submit"
              form="paypal-connect-form"
              className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 sm:col-start-2 sm:text-sm"
            >
              Connect with Paypal
            </button>
            <button
              type="button"
              onClick={handleClosePaypalConnectModal}
              className="mt-3 w-full inline-flex justify-center rounded-3xl border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 sm:mt-0 sm:col-start-1 sm:text-sm bg-white dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaypalConnectModal;
