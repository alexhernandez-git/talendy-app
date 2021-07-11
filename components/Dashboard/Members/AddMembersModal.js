import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import useOutsideClick from "hooks/useOutsideClick";
import Slider from "rc-slider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createMember,
  isMemberEmailAvailable,
  resetMemberEmailAvailable,
} from "redux/actions/members";

const AddMembersModal = ({ modalOpen, modalRef, handleCloseModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const membersReducer = useSelector((state) => state.membersReducer);
  const { member_email_available_error } = membersReducer;

  const [roleOpen, setRoleOpen] = useState(false);
  const handleOpenRole = () => {
    setRoleOpen(true);
  };
  const handleCloseRole = () => {
    if (roleOpen) {
      setRoleOpen(false);
    }
  };
  const handleToggleRole = () => {
    setRoleOpen(!roleOpen);
  };
  const roleRef = useRef();
  useOutsideClick(roleRef, () => handleCloseRole());

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      role: "BA",
      initial_karma_amount: 0,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      role: Yup.string().max(2),
      initial_karma_amount: Yup.number().required(
        "Initial Karma amount are required"
      ),

      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long ")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(createMember(values, resetForm, handleCloseModal));
    },
  });
  const handleChangeKarmasOffered = (value) => {
    formik.setFieldValue("initial_karma_amount", value);
  };

  const handleChangeRole = (value) => {
    formik.setFieldValue("role", value);
    handleCloseRole();
  };

  useEffect(() => {
    if (formik.values.email != "") {
      dispatch(resetMemberEmailAvailable());
      const timeoutId = setTimeout(() => {
        dispatch(isMemberEmailAvailable({ email: formik.values.email }));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formik.values.email]);

  return (
    <div
      className={`${
        modalOpen ? "block" : "hidden"
      } fixed z-40 inset-0 overflow-y-auto`}
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

        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}

        <form
          onSubmit={formik.handleSubmit}
          ref={modalRef}
          className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-full sm:max-w-2xl w-full"
        >
          <div className="shadow rounded-lg">
            <div className="flex justify-between items-center px-4 py-5 sm:px-6 bg-gradient-to-r from-orange-500 to-pink-500  rounded-t-lg">
              <h2
                id="applicant-information-title"
                className="text-lg leading-6 font-medium text-white"
              >
                New member
              </h2>
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-3xl p-1 inline-flex items-center justify-center text-white outline-none ring-1 ring-inset ring-white"
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
            <div className=" px-4 py-5 sm:px-6">
              <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
              >
                <div>
                  <dd className="text-sm text-gray-500 dark:text-white">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Initial Karma</span>
                      <span className="text-center text-sm text-orange-500 font-bold flex items-center ">
                        <svg
                          className="w-4 h-4 mr-1"
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
                        {formik.values.initial_karma_amount}
                      </span>
                    </div>
                    <Slider
                      value={formik.values.initial_karma_amount}
                      onChange={handleChangeKarmasOffered}
                      max={1000}
                      min={0}
                      railStyle={{}}
                      handleStyle={{
                        backgroundColor: "#f97316",
                        border: 0,
                      }}
                      trackStyle={{
                        background: "#f97316",
                      }}
                    />
                  </dd>
                </div>

                <div>
                  <dd className="text-sm text-gray-900 flex justify-end">
                    <div>
                      <label id="listbox-label" className="sr-only">
                        Change role
                      </label>
                      <div className="relative">
                        <div className="inline-flex shadow-sm rounded-md divide-x divide-gray-900">
                          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-200 dark:divide-gray-900">
                            <div className="relative inline-flex items-center dark:bg-gray-800 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-gray-900 dark:text-white">
                              <>
                                <p className="text-sm font-medium">
                                  {formik.values.role === "BA" && "Basic"}
                                  {formik.values.role === "MA" && "Manager"}
                                  {formik.values.role === "AD" && "Admin"}
                                </p>
                              </>
                            </div>
                            <button
                              onMouseDown={handleToggleRole}
                              type="button"
                              className="relative inline-flex items-center dark:bg-gray-800 p-2 rounded-l-none rounded-r-md text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                              aria-haspopup="listbox"
                              aria-expanded="true"
                              aria-labelledby="listbox-label"
                            >
                              <span className="sr-only">
                                Change published status
                              </span>

                              <svg
                                className="h-5 w-5 "
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <ul
                          ref={roleRef}
                          className={`${
                            roleOpen ? "block" : "hidden"
                          } origin-top-right absolute right-0 z-20 mt-2 w-full sm:w-72 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none`}
                          tabIndex="-1"
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-0"
                        >
                          <li
                            onClick={handleChangeRole.bind(this, "BA")}
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p className="font-semibold">Basic</p>
                                {formik.values.privacity === "BA" && (
                                  <span className="text-gray-900 dark:text-white">
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                              {/* <p className="text-gray-500 dark:text-gray-300 mt-2">
                                Everyone can ask to help you.
                              </p> */}
                            </div>
                          </li>

                          <li
                            onClick={handleChangeRole.bind(this, "MA")}
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p className="font-semibold">Manager</p>
                                {formik.values.privacity === "MA" && (
                                  <span className="text-gray-900 dark:text-white">
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                              {/* <p className="text-gray-500 dark:text-gray-300 mt-2">
                                Everyone can ask to help you.
                              </p> */}
                            </div>
                          </li>
                          <li
                            onClick={handleChangeRole.bind(this, "AD")}
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p className="font-semibold">Admin</p>
                                {formik.values.privacity === "AD" && (
                                  <span className="text-gray-900 dark:text-white">
                                    <svg
                                      className="h-5 w-5"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                      aria-hidden="true"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </span>
                                )}
                              </div>
                              {/* <p className="text-gray-500 dark:text-gray-300 mt-2">
                                Only your connections can ask to help you.
                              </p> */}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </dd>
                </div>

                <div>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                      placeholder="First name"
                      autocomplete="given-name"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.first_name && formik.errors.first_name
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
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
                  {formik.touched.first_name && formik.errors.first_name && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="first_name-error"
                    >
                      {formik.errors.first_name}
                    </p>
                  )}
                </div>
                <div>
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      placeholder="Last name"
                      name="last_name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                      id="last_name"
                      autocomplete="family-name"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.last_name && formik.errors.last_name
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    />
                    {formik.touched.last_name && formik.errors.last_name && (
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
                  {formik.touched.last_name && formik.errors.last_name && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="last_name-error"
                    >
                      {formik.errors.last_name}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <div className="mt-1 relative">
                    <input
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Email"
                      type="email"
                      autocomplete="email"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        (formik.touched.email && formik.errors.email) ||
                        member_email_available_error
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    />
                    {((formik.touched.email && formik.errors.email) ||
                      member_email_available_error) && (
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
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {formik.errors.email}
                    </p>
                  )}
                  {member_email_available_error?.data?.non_field_errors
                    ?.length > 0 &&
                    member_email_available_error?.data?.non_field_errors.map(
                      (message, i) => (
                        <p
                          className="mt-2 text-sm text-red-600"
                          id="email-error"
                        >
                          {message}
                        </p>
                      )
                    )}
                </div>
                <div className="sm:col-span-2">
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      placeholder="Password"
                      type="password"
                      autocomplete="password"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.password && formik.errors.password
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    />
                    {formik.touched.password && formik.errors.password && (
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
                  {formik.touched.password && formik.errors.password && (
                    <p
                      className="mt-2 text-sm text-red-600"
                      id="password-error"
                    >
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                {/* <div className="sm:col-span-2">
                  <div className="mt-1 relative">
                    <textarea
                      id="message"
                      name="message"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      rows="4"
                      placeholder="Notes"
                      className={`appearance-none block w-full border rounded-md shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.message && formik.errors.message
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    ></textarea>

                    {formik.touched.message && formik.errors.message && (
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
                  {formik.touched.message && formik.errors.message && (
                    <p className="mt-2 text-sm text-red-600" id="message-error">
                      {formik.errors.message}
                    </p>
                  )}
                </div> */}
              </form>
            </div>
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 text-right sm:px-6 rounded-b-xl">
              <button
                type="submit"
                className="cursor-pointer inline-flex items-center px-4 py-2 text-md font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembersModal;
