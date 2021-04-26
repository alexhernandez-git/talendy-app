import React, { useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import {
  register,
  isEmailAvailable,
  resetEmailAvailable,
} from "redux/actions/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
const RegisterModal = ({ registerOpen, registerRef, handleCloseRegister }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const router = useRouter();
  const { email_available_error } = authReducer;

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Email is not valid")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long ")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log(valores);
      dispatch(register(values, handleCloseRegister, resetForm));
    },
  });
  useEffect(() => {
    dispatch(resetEmailAvailable());
    if (formik.values.email != "") {
      const timeoutId = setTimeout(() => {
        dispatch(isEmailAvailable({ email: formik.values.email }));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formik.values.email]);
  return (
    <div
      className={`${
        registerOpen ? "block" : "hidden"
      } fixed z-40 inset-0 overflow-y-auto`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

        <section
          ref={registerRef}
          className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-full sm:max-w-md w-full py-8 px-4  sm:px-10 relative"
        >
          <div className="absolute top-2 right-2">
            <button
              type="button"
              onClick={handleCloseRegister}
              className="rounded-3xl p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 focus:outline-none ring-1 ring-inset ring-white"
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

          <form
            className="space-y-6"
            onSubmit={formik.handleSubmit}
            method="POST"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-md ">
              <img
                className="mx-auto h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-orange-500.svg"
                alt="Workflow"
              />
              <h2 className="mt-3 text-center text-2xl font-extrabold text-gray-900 dark:text-white">
                Join the community
              </h2>
            </div>
            <div>
              <div className="mt-1 relative">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  placeholder="First Name"
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
                <p className="mt-2 text-sm text-red-600" id="first_name-error">
                  {formik.errors.first_name}
                </p>
              )}
            </div>
            <div>
              <div className="mt-1 relative">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  placeholder="Last Name"
                  className={`appearance-none block w-full border rounded-3xl shadow-sm py-2  dark:focus:text-white px-4 focus:outline-none  sm:text-sm  bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                    formik.touched.last_name && formik.errors.last_name
                      ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
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
                <p className="mt-2 text-sm text-red-600" id="last_name-error">
                  {formik.errors.last_name}
                </p>
              )}
            </div>
            <div>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  placeholder="Email"
                  className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4  dark:focus:text-white focus:outline-none  sm:text-sm  bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                    (formik.touched.email && formik.errors.email) ||
                    email_available_error
                      ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                      : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                  }`}
                />
                {((formik.touched.email && formik.errors.email) ||
                  email_available_error) && (
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
              {email_available_error &&
                email_available_error?.data?.non_field_errors.map(
                  (message, i) => (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {message}
                    </p>
                  )
                )}
            </div>

            <div>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  placeholder="Password"
                  className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4  dark:focus:text-white focus:outline-none  sm:text-sm  bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                    formik.touched.password && formik.errors.password
                      ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                      : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
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
                <p className="mt-2 text-sm text-red-600" id="password-error">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
              >
                {authReducer.registing && <Spinner className="mr-2" />}
                Register
              </button>
              <div className="pt-5">
                <p className="text-xs leading-5 text-gray-500 dark:text-gray-300">
                  By signing up, you agree to our{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    className="font-medium text-gray-900 dark:text-white hover:underline"
                  >
                    Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    className="font-medium text-gray-900 dark:text-white hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default RegisterModal;
