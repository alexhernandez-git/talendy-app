import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { useSelector } from "react-redux";
import SettingsLayout from "components/Layout/SettingsLayout";
import { changePassword, resetChangePasswordErrors } from "redux/actions/user";
import useAuthRequired from "hooks/useAuthRequired";
import Spinner from "components/Layout/Spinner";
const security = () => {
  const [canRender, authReducer] = useAuthRequired();

  const userReducer = useSelector((state) => state.userReducer);
  const { user } = userReducer;
  const dispatch = useDispatch();
  const changePasswordForm = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      repeat_password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Current password is required")
        .min(8, "Current password must have at least 8 characters"),
      new_password: Yup.string()
        .required("New password is required")
        .min(8, "New password must have at least 8 characters"),
      repeat_password: Yup.string()
        .required("New password confirmation is required")
        .min(8, "New password confirmation must have at least 8 characters")
        .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(changePassword(values, resetForm));
    },
  });
  useEffect(() => {
    dispatch(resetChangePasswordErrors());
  }, [changePasswordForm.values.password]);
  return (
    <>
      <Head>
        <title>Security</title>
      </Head>
      {!canRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Asside */}
          <SettingsLayout>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <form onSubmit={changePasswordForm.handleSubmit}>
                <div className="shadow sm:rounded-3xl sm:overflow-hidden">
                  <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Change password
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Change your password.
                      </p>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700  dark:text-gray-100"
                        >
                          Current password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="password"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={changePasswordForm.handleChange}
                          onBlur={changePasswordForm.handleBlur}
                          value={changePasswordForm.values.password}
                        />
                        {changePasswordForm.touched.password &&
                        changePasswordForm.errors.password ? (
                          <p className="mt-2 text-sm text-red-600">
                            {changePasswordForm.errors.password}
                          </p>
                        ) : null}

                        {userReducer.change_password_error &&
                          userReducer.change_password_error.data
                            .non_field_errors &&
                          userReducer.change_password_error.data.non_field_errors.map(
                            (message, i) => (
                              <p key={i} className="mt-2 text-sm text-red-600">
                                {message}
                              </p>
                            )
                          )}
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="new_password"
                          className="block text-sm font-medium text-gray-700  dark:text-gray-100"
                        >
                          New password
                        </label>
                        <input
                          type="password"
                          name="new_password"
                          id="new_password"
                          autoComplete="email"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={changePasswordForm.handleChange}
                          onBlur={changePasswordForm.handleBlur}
                          value={changePasswordForm.values.new_password}
                        />
                        {changePasswordForm.touched.new_password &&
                        changePasswordForm.errors.new_password ? (
                          <p className="mt-2 text-sm text-red-600">
                            {changePasswordForm.errors.new_password}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="repeat_password"
                          className="block text-sm font-medium text-gray-700  dark:text-gray-100"
                        >
                          Confirm new password
                        </label>
                        <input
                          type="password"
                          name="repeat_password"
                          id="repeat_password"
                          autoComplete="email"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={changePasswordForm.handleChange}
                          onBlur={changePasswordForm.handleBlur}
                          value={changePasswordForm.values.repeat_password}
                        />
                        {changePasswordForm.touched.repeat_password &&
                        changePasswordForm.errors.repeat_password ? (
                          <p className="mt-2 text-sm text-red-600">
                            {changePasswordForm.errors.repeat_password}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </SettingsLayout>
        </>
      )}
    </>
  );
};

export default security;
