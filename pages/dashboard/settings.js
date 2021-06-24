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
import {
  isNameAvailable,
  isUrlAvailable,
  resetNameAvailable,
  resetUrlAvailable,
  updatePortal,
} from "redux/actions/portal";
import { useSelector } from "react-redux";
const settings = () => {
  const page = SETTINGS_DASHBOARD_PAGE;
  const router = useRouter();
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  const portalReducer = useSelector((state) => state.portalReducer);
  const { portal } = portalReducer;
  const { user } = authReducer;

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: portal && portal.name,
      url: portal && portal.url,
      about: portal && portal.about,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Organization name is required"),
      url: Yup.string()
        .required("URL is required")
        .min(2, "URL must be at least 2 characters")
        .max(40, "URL must be at most 40 characters")
        .matches(
          /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
          "Avoid weird characters, accents, and uppercase words"
        ),
      about: Yup.string()
        .notRequired()
        .max(500, "About must be at most 500 characters"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      dispatch(updatePortal(values));
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

  const [nameFirstLoad, setNameFirstLoad] = useState(false);
  React.useEffect(() => {
    if (nameFirstLoad) {
      dispatch(resetNameAvailable());
      if (formik.values.name != portal.name) {
        const timeoutId = setTimeout(() => {
          dispatch(isNameAvailable({ name: formik.values.name }));
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    }
    if (formik.values.name) {
      setNameFirstLoad(true);
    }
  }, [formik.values.name]);

  // Check if this url is used
  const [urlFirstLoad, setUrlFirstLoad] = useState(false);
  React.useEffect(() => {
    if (urlFirstLoad) {
      dispatch(resetUrlAvailable());
      if (formik.values.url != portal.url) {
        const timeoutId = setTimeout(() => {
          dispatch(isUrlAvailable({ url: formik.values.url }));
        }, 500);
        return () => clearTimeout(timeoutId);
      }
    }
    if (formik.values.url) {
      setUrlFirstLoad(true);
    }
  }, [formik.values.url]);

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
                        <form onSubmit={formik.handleSubmit}>
                          <div className="shadow  sm:rounded-md sm:overflow-hidden">
                            <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                              <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-3 sm:col-span-2">
                                  <label
                                    htmlFor="company_website"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                                  >
                                    Organization name
                                  </label>
                                  <div className="mt-1 sm:col-span-2">
                                    <div className="max-w-lg flex relative">
                                      <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="name"
                                        className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                                          (formik.touched.name &&
                                            formik.errors.name) ||
                                          portalReducer.name_available_error
                                            ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                                            : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                                        }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                      />
                                      {((formik.touched.name &&
                                        formik.errors.name) ||
                                        portalReducer.name_available_error) && (
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
                                    {portalReducer.name_available_error &&
                                      portalReducer.name_available_error?.data?.non_field_errors?.map(
                                        (message, i) => (
                                          <p
                                            className="mt-2 text-sm text-red-600"
                                            id="name-error"
                                          >
                                            {message}
                                          </p>
                                        )
                                      )}

                                    {formik.touched.name &&
                                    formik.errors.name ? (
                                      <p
                                        className="mt-2 text-sm text-red-600"
                                        id="email-error"
                                      >
                                        {formik.errors.name}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                                <div className="col-span-3 sm:col-span-2">
                                  <label
                                    htmlFor="company_website"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                                  >
                                    Url
                                  </label>
                                  <div className="mt-1 sm:col-span-2">
                                    <div className="max-w-lg flex relative">
                                      <input
                                        type="text"
                                        name="url"
                                        id="url"
                                        autoComplete="url"
                                        className={`appearance-none block w-full border rounded-l-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                                          (formik.touched.url &&
                                            formik.errors.url) ||
                                          portalReducer.url_available_error
                                            ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                                            : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                                        }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.url}
                                      />

                                      {((formik.touched.url &&
                                        formik.errors.url) ||
                                        portalReducer.url_available_error) && (
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
                                      <span className="inline-flex items-center px-3 rounded-r-3xl border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        talendy.com/
                                      </span>
                                    </div>
                                    {portalReducer.url_available_error &&
                                      portalReducer.url_available_error?.data?.non_field_errors?.map(
                                        (message, i) => (
                                          <p
                                            className="mt-2 text-sm text-red-600"
                                            id="url-error"
                                          >
                                            {message}
                                          </p>
                                        )
                                      )}
                                    {formik.touched.url && formik.errors.url ? (
                                      <p
                                        className="mt-2 text-sm text-red-600"
                                        id="email-error"
                                      >
                                        {formik.errors.url}
                                      </p>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="col-span-3">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-100"
                                  >
                                    About
                                  </label>
                                  <div className="mt-1 sm:col-span-3">
                                    <div className="max-w-lg flex relative">
                                      <textarea
                                        id="about"
                                        name="about"
                                        rows="3"
                                        className={`appearance-none block w-full border rounded-md shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                                          formik.touched.about &&
                                          formik.errors.about
                                            ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                                            : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                                        }`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                      >
                                        {formik.values.about}
                                      </textarea>
                                      {formik.touched.about &&
                                        formik.errors.about && (
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

                                    {formik.touched.about &&
                                    formik.errors.about ? (
                                      <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{formik.errors.about}</p>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>

                                <div className="col-span-3">
                                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                                    Photo
                                  </label>
                                  <div className="mt-1 flex items-center">
                                    {portal?.logo ? (
                                      <img
                                        className="inline-block h-12 w-12 rounded-full"
                                        src={
                                          new RegExp(
                                            `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                                          ).test(portal?.logo)
                                            ? portal?.logo
                                            : process.env.HOST + portal?.logo
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
                                  isPortal
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
