import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import countries from "data/countries";
import currencies from "data/currencies";
import Spinner from "components/Layout/Spinner";
import useOutsideClick from "hooks/useOutsideClick";
import { useRouter } from "next/router";
import Head from "next/head";
import SettingsLayout from "components/Layout/SettingsLayout";
import CropperModal from "components/Pages/Settings/CropperModal";
import { useSelector } from "react-redux";
import useAuthRequired from "hooks/useAuthRequired";
import { SETTINGS_PAGE } from "pages";
import {
  changeEmail,
  isEmailAvailable,
  removeAccount,
  resetEmailAvailable,
  resetUsernameAvailable,
  isUsernameAvailable,
  updateUser,
  sendVerificationEmail,
} from "redux/actions/auth";
const settings = () => {
  const page = SETTINGS_PAGE;
  const router = useRouter();
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);

  const {
    username_available_error,
    username_available,
    email_available,
    email_available_error,
    user,
  } = authReducer;
  const profileForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: user && user.username,
      about: user && user.about,
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      about: Yup.string().max(1000).nullable(),
    }),
    onSubmit: async (values) => {
      // console.log(valores);
      dispatch(updateUser(values));
    },
  });
  React.useEffect(() => {
    if (user) {
      dispatch(resetUsernameAvailable());
      if (profileForm.values.username != user.username) {
        const timeoutId = setTimeout(() => {
          dispatch(
            isUsernameAvailable({ username: profileForm.values.username })
          );
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [profileForm.values.username]);

  const [showCropper, setShowCropper] = React.useState(false);
  const [newImage, setNewImage] = React.useState({
    image: null,
    name: "",
  });
  const handleOpenCropper = (e) => {
    setShowCropper(true);
  };
  const handleCloseCropper = () => {
    setShowCropper(false);
  };
  const handleChangeImage = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    console.log(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImage({ image: reader.result, name: files[0].name });
        handleOpenCropper();
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const personalInfoForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      first_name: user && user.first_name,
      last_name: user && user.last_name,
      country: user && user.country,
      currency: user && user.currency,
    },
    validationSchema: Yup.object({
      first_name: Yup.string().max(150).nullable(),
      last_name: Yup.string().max(150).nullable(),
      country: Yup.string().max(2).nullable(),
      currency: Yup.string().max(3).nullable(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      dispatch(updateUser(values));
    },
  });
  const emailForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: user && user.email,
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      dispatch(changeEmail(values));
    },
  });
  React.useEffect(() => {
    if (user) {
      dispatch(resetEmailAvailable());
      if (emailForm.values.email != user.email) {
        const timeoutId = setTimeout(() => {
          dispatch(isEmailAvailable({ email: emailForm.values.email }));
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [emailForm.values.email]);
  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleModalClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleModalClose());

  const handleDeleteAccount = () => {
    dispatch(removeAccount(router));
  };
  const handleSendVerificationEmail = () => {
    dispatch(sendVerificationEmail());
  };
  return (
    <>
      <Head>
        <title>Account</title>
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
              <form onSubmit={profileForm.handleSubmit}>
                <div className="shadow sm:rounded-3xl sm:overflow-hidden">
                  <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                    {!user?.is_verified && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 ">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg
                              className="h-5 w-5 text-yellow-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Account not validated.{" "}
                              <span
                                onClick={handleSendVerificationEmail}
                                className="cursor-pointer font-medium underline text-yellow-700 hover:text-yellow-600"
                              >
                                Resend validation email.
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Profile
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        This information will be displayed publicly so be
                        careful what you share.
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company_website"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                        >
                          Username
                        </label>

                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={profileForm.handleChange}
                          onBlur={profileForm.handleBlur}
                          value={profileForm.values.username}
                        />
                        {username_available && (
                          <p
                            className="mt-2 text-sm text-green-600"
                            id="email-error"
                          >
                            {username_available}
                          </p>
                        )}
                        {username_available_error &&
                          username_available_error.data.non_field_errors &&
                          username_available_error.data.non_field_errors.map(
                            (message, i) => (
                              <p
                                key={i}
                                className="mt-2 text-sm text-green-600"
                                id="email-error"
                              >
                                {message}
                              </p>
                            )
                          )}
                        {profileForm.touched.username &&
                        profileForm.errors.username ? (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {profileForm.errors.username}
                          </p>
                        ) : null}
                      </div>
                      <div className="col-span-3">
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                        >
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="about"
                            name="about"
                            rows="3"
                            className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-lg sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                            onChange={profileForm.handleChange}
                            onBlur={profileForm.handleBlur}
                            value={profileForm.values.about}
                          ></textarea>
                        </div>
                        {profileForm.touched.about &&
                        profileForm.errors.about ? (
                          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{profileForm.errors.about}</p>
                          </div>
                        ) : null}
                      </div>

                      <div className="col-span-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          {user && user.picture ? (
                            <img
                              className="inline-block h-12 w-12 rounded-full"
                              src={
                                new RegExp(
                                  `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                                ).test(user.picture)
                                  ? user.picture
                                  : process.env.HOST + user.picture
                              }
                              alt=""
                            ></img>
                          ) : (
                            <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                              <svg
                                className="h-full w-full text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                            </span>
                          )}

                          <label
                            className="ml-3 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                            htmlFor="profile-img"
                          >
                            Change
                          </label>
                          <input
                            id={"profile-img"}
                            type="file"
                            hidden
                            onChange={handleChangeImage}
                          />
                        </div>
                      </div>
                      <CropperModal
                        show={showCropper}
                        handleClose={handleCloseCropper}
                        newImage={newImage}
                      />
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right sm:px-6">
                    <button
                      type="submit"
                      className=" text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>

              <form onSubmit={personalInfoForm.handleSubmit}>
                <div className="shadow sm:rounded-3xl sm:overflow-hidden">
                  <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Personal Information
                      </h3>
                      {/* <p className="mt-1 text-sm text-gray-500">
                    Use a permanent address where you can recieve mail.
                  </p> */}
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first_name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                        >
                          First name
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          id="first_name"
                          autoComplete="given-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={personalInfoForm.handleChange}
                          onBlur={personalInfoForm.handleBlur}
                          value={personalInfoForm.values.first_name}
                        />
                        {personalInfoForm.touched.first_name &&
                        personalInfoForm.errors.first_name ? (
                          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{personalInfoForm.errors.first_name}</p>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last_name"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                        >
                          Last name
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          id="last_name"
                          autoComplete="family-name"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={personalInfoForm.handleChange}
                          onBlur={personalInfoForm.handleBlur}
                          value={personalInfoForm.values.last_name}
                        />
                        {personalInfoForm.touched.last_name &&
                        personalInfoForm.errors.last_name ? (
                          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{personalInfoForm.errors.last_name}</p>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                        >
                          Country / Region
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={personalInfoForm.handleChange}
                          onBlur={personalInfoForm.handleBlur}
                          value={personalInfoForm.values.country}
                        >
                          <option defaultValue disabled value="">
                            Select one
                          </option>

                          {countries.map((country) => (
                            <option value={country.abbreviation}>
                              {country.country}
                            </option>
                          ))}
                        </select>
                        {personalInfoForm.touched.country &&
                        personalInfoForm.errors.country ? (
                          <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{personalInfoForm.errors.country}</p>
                          </div>
                        ) : null}
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="currency"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                        >
                          Currency
                        </label>
                        <select
                          id="currency"
                          name="currency"
                          autoComplete="currency"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={personalInfoForm.handleChange}
                          onBlur={personalInfoForm.handleBlur}
                          value={personalInfoForm.values.currency}
                          disabled
                        >
                          <option defaultValue disabled value="">
                            Select one
                          </option>

                          {currencies.map((currency) => (
                            <option value={currency.code}>
                              {currency.code}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50  dark:bg-gray-800 text-right sm:px-6">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
              <form onSubmit={emailForm.handleSubmit}>
                <div className="shadow sm:rounded-3xl sm:overflow-hidden">
                  <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Change email
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Use a permanent address where you can recieve mail.
                      </p>
                    </div>

                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label
                          htmlFor="email_address"
                          className="block text-sm font-medium text-gray-700  dark:text-gray-100"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email_address"
                          autoComplete="email"
                          className="mt-1 focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                          onChange={emailForm.handleChange}
                          onBlur={emailForm.handleBlur}
                          value={emailForm.values.email}
                        />

                        {emailForm.touched.email && emailForm.errors.email ? (
                          <p
                            className="mt-2 text-sm text-red-600"
                            id="email-error"
                          >
                            {emailForm.errors.email}
                          </p>
                        ) : (
                          <>
                            {email_available && (
                              <p
                                className="mt-2 text-sm text-green-600"
                                id="email-error"
                              >
                                Email is available
                              </p>
                            )}
                            {email_available_error &&
                              email_available_error?.data?.non_field_errors &&
                              email_available_error?.data?.non_field_errors.map(
                                (message, i) => (
                                  <p
                                    key={i}
                                    className="mt-2 text-sm text-red-600"
                                    id="email-error"
                                  >
                                    {message}
                                  </p>
                                )
                              )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50  dark:bg-gray-800 text-right sm:px-6">
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600  border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove account
                </button>
              </div>
              <div
                className={`${
                  isModalOpen ? "block" : "hidden"
                } fixed z-10 inset-0 overflow-y-auto`}
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div
                    className="fixed inset-0 transition-opacity"
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>

                  <div
                    ref={modalRef}
                    className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                  >
                    <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg
                            className="h-6 w-6 text-red-600"
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
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <h3
                            className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                            id="modal-headline"
                          >
                            Remove account
                          </h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              All your personal data will be removed.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        onClick={handleDeleteAccount}
                        type="button"
                        className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Remove
                      </button>
                      <button
                        onClick={handleModalClose}
                        type="button"
                        className="mt-3 inline-flex justify-center rounded-3xl border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 sm:mt-0 sm:col-start-1 sm:text-sm bg-white dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SettingsLayout>
        </>
      )}
    </>
  );
};

export default settings;
