import Layout from "components/Dashboard/Layout";
import { SETTINGS_DASHBOARD_PAGE } from "pages";

import TabMenu from "components/Dashboard/TabMenu";
import ChangePaymentMethodForm from "components/Dashboard/Billing/ChangePaymentMethodForm";
import PaymentMethodInfo from "components/Dashboard/Billing/PaymentMethodInfo";
import BillingPlan from "components/Dashboard/Billing/BillingPlan";
import BillingHistory from "components/Dashboard/Billing/BillingHistory";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import useAuthRequired from "hooks/useAuthRequired";
import { useDispatch } from "react-redux";
import useOutsideClick from "hooks/useOutsideClick";
import CropperModal from "components/Pages/Settings/CropperModal";
import {
  isUsernameAvailable,
  resetEmailAvailable,
  resetUsernameAvailable,
} from "redux/actions/auth";
import Head from "next/head";
import Spinner from "components/Layout/Spinner";
const settings = () => {
  const page = SETTINGS_DASHBOARD_PAGE;
  const [addBillingInformation, setAddBillingInformation] = useState(false);
  const handleOpenAddBilling = () => {
    setAddBillingInformation(true);
  };
  const [changingPaymentMethod, setChangingPaymentMethod] = useState(false);
  const handleOpenChangePaymentMethod = () => {
    setChangingPaymentMethod(true);
  };
  const handleCloseChangePaymentMethod = () => {
    setChangingPaymentMethod(false);
  };
  const [planPaymentMethod, setPlanPaymentMethod] = useState(null);
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
  const notificationsForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      email_notifications_allowed: user && user.email_notifications_allowed,
    },
    validationSchema: Yup.object({
      email_notifications_allowed: Yup.boolean().nullable(),
    }),
    onSubmit: async (values) => {
      dispatch(updateUser(values));
    },
  });
  const handleToggleEmailNotificaitonsAllowed = () => {
    notificationsForm.setFieldValue(
      "email_notifications_allowed",
      !notificationsForm.values.email_notifications_allowed
    );
  };
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

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>
      {!canRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
          <Layout page={page}>
            <main class="flex-1 relative pb-8 z-0 overflow-y-auto px-4">
              <div class="mt-8">
                <div class="max-w-6xl mx-auto">
                  <div className="mt-6">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-6">
                      <div className="lg:col-span-1">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                            Portal
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 lg:mt-0 md:col-span-2">
                        <form onSubmit={profileForm.handleSubmit}>
                          <div className="shadow  sm:rounded-md sm:overflow-hidden">
                            <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                  <label
                                    htmlFor="company_website"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                                  >
                                    Name
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
                                    username_available_error.data
                                      .non_field_errors &&
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
                                            `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                                          ).test(user.picture)
                                            ? user.picture
                                            : process.env.HOST + user.picture
                                        }
                                        alt=""
                                      ></img>
                                    ) : (
                                      <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                                        <svg
                                          className="h-12 w-12 text-gray-300"
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
                                  profile
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </Layout>
        </>
      )}
    </>
  );
};

export default settings;
