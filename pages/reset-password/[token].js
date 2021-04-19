import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPassword } from "redux/actions/auth";
import { useAlert } from "hooks/useAlert";
const loginPage = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const { isLoading, isAuthenticated } = authReducer;
  const router = useRouter();
  const { token } = router.query;

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "New password must be at least 8 characters long ")
        .required("New password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: async (values) => {
      // console.log(valores);
      dispatch(resetPassword({ ...values, token: token }, router));
    },
  });
  const alert = useAlert();

  return (
    <>
      {alert}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-orange-500.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create new password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-700 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <>
              <form className="space-y-6" onSubmit={formik.handleSubmit}>
                <div>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      placeholder="New password"
                      type="password"
                      autoComplete="current-password"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.password && formik.errors.password
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
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

                <div>
                  <div className="mt-1 relative">
                    <input
                      id="confirm_password"
                      name="confirm_password"
                      type="password"
                      placeholder="Confirm new password"
                      autoComplete="current-confirm_password"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2  dark:focus:text-white px-4 focus:outline-none  sm:text-sm  bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.confirm_password &&
                        formik.errors.confirm_password
                          ? "pr-10 border-red-300 text-red-600  placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirm_password}
                    />
                    {formik.touched.confirm_password &&
                      formik.errors.confirm_password && (
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
                  {formik.touched.confirm_password &&
                    formik.errors.confirm_password && (
                      <p
                        className="mt-2 text-sm text-red-600"
                        id="confirm_password-error"
                      >
                        {formik.errors.confirm_password}
                      </p>
                    )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                  >
                    Change password
                  </button>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default loginPage;
