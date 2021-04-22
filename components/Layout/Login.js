import React, { useState } from "react";
import { Transition } from "@tailwindui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgetPassword, login } from "redux/actions/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchNotifications } from "redux/actions/notifications";
import {
  initialDataFetched,
  resetDataFetched,
} from "redux/actions/initialData";
const Login = ({ loginOpen, loginRef, mobile, handleClose }) => {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isForgotPasswordOpen, setIsForgotPassowrdOpen] = useState(false);
  const handleOpenForgotPassword = () => {
    setIsForgotPassowrdOpen(true);
  };
  const handleCloseForgotPassword = () => {
    setIsForgotPassowrdOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid")
        .required("Email can't be empty"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log(valores);
      await dispatch(resetDataFetched());
      await dispatch(login(values, handleClose, resetForm));
      await dispatch(fetchNotifications());
      await dispatch(initialDataFetched());
    },
  });
  const resetPasswordForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email is not valid")
        .required("Email can't be empty"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(forgetPassword(values, handleClose, resetForm));
    },
  });
  return (
    <Transition
      show={loginOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-out duration-100"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {(ref) => (
        <div ref={loginRef}>
          <div
            ref={ref}
            className={`origin-top-right absolute z-40 right-0 mt-2 ${
              mobile ? "w-full" : "w-64"
            } ring-opacity-5 py-1 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                {isForgotPasswordOpen ? (
                  <form
                    className="space-y-6"
                    onSubmit={resetPasswordForm.handleSubmit}
                    method="POST"
                  >
                    <div>
                      <span
                        className="text-gray-500 dark:text-gray-100 text-sm flex items-center cursor-pointer"
                        onClick={handleCloseForgotPassword}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Back
                      </span>
                    </div>
                    {authReducer.forget_password_error &&
                      authReducer.forget_password_error?.data
                        ?.non_field_errors &&
                      authReducer.forget_password_error?.data?.non_field_errors.map(
                        (message, i) => (
                          <div
                            key={i}
                            className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                          >
                            <p>{message}</p>
                          </div>
                        )
                      )}
                    <div>
                      <div className="mt-1 relative">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          autoComplete="email"
                          onChange={resetPasswordForm.handleChange}
                          onBlur={resetPasswordForm.handleBlur}
                          value={resetPasswordForm.values.email}
                          placeholder="Email"
                          className={`appearance-none block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm focus:text-gray-900 dark:focus:text-white rounded-3xl shadow-sm py-2 px-4 focus:outline-none sm:text-sm
                           ${
                             resetPasswordForm.touched.email &&
                             resetPasswordForm.errors.email
                               ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                               : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500  focus:border-orange-500"
                           }`}
                        />
                        {resetPasswordForm.touched.email &&
                          resetPasswordForm.errors.email && (
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
                      {resetPasswordForm.touched.email &&
                        resetPasswordForm.errors.email && (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {resetPasswordForm.errors.email}
                          </p>
                        )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                      >
                        Reset password
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    className="space-y-6"
                    onSubmit={formik.handleSubmit}
                    method="POST"
                  >
                    {authReducer.error &&
                      authReducer.error.data.non_field_errors &&
                      authReducer.error.data.non_field_errors.map(
                        (message, i) => (
                          <div
                            key={i}
                            className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                          >
                            <p>{message}</p>
                          </div>
                        )
                      )}
                    {authReducer.error && authReducer.error.data.detail && (
                      <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p>Invalid credentials</p>
                      </div>
                    )}
                    <div>
                      {/* <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-700"
                                  >
                                  Email address
                                </label> */}
                      <div className="mt-1 relative">
                        <input
                          id="email"
                          name="email"
                          type="text"
                          autoComplete="email"
                          placeholder="Email"
                          className={`appearance-none block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm focus:text-gray-900 dark:focus:text-white rounded-3xl shadow-sm py-2 px-4 focus:outline-none sm:text-sm
                           ${
                             formik.touched.email && formik.errors.email
                               ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                               : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500  focus:border-orange-500"
                           }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
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

                    <div>
                      {/* <label
                                  htmlFor="password"
                                  className="block text-sm font-medium text-gray-700"
                                  >
                                  Password
                                </label> */}
                      <div className="mt-1 relative">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          placeholder="Password"
                          className={`appearance-none block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm focus:text-gray-900 dark:focus:text-white rounded-3xl shadow-sm py-2 px-4 focus:outline-none sm:text-sm
                           ${
                             formik.touched.password && formik.errors.password
                               ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                               : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500  focus:border-orange-500"
                           }`}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
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

                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span
                          onClick={handleOpenForgotPassword}
                          className="cursor-pointer font-medium text-orange-600 hover:text-orange-500"
                        >
                          Forgot your password?
                        </span>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Login;
