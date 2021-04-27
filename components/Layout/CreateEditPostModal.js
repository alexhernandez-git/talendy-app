import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import Editor from "components/Editor/Editor";
import useOutsideClick from "hooks/useOutsideClick";
import Slider from "rc-slider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
const CreateEditPostModal = ({
  modalOpen,
  modalRef,
  isEdit,
  handleCloseModal,
}) => {
  const router = useRouter();
  const authReducer = useSelector((state) => state.authReducer);
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  const [publishedStatusOpen, setPublishedStatusOpen] = useState(false);
  const handleOpenPublishedStatus = () => {
    setPublishedStatusOpen(true);
  };
  const handleClosePublishedStatus = () => {
    if (publishedStatusOpen) {
      setPublishedStatusOpen(false);
    }
  };
  const handleTogglePublishedStatus = () => {
    setPublishedStatusOpen(!publishedStatusOpen);
  };
  const publishedStatusRef = useRef();
  useOutsideClick(publishedStatusRef, () => handleClosePublishedStatus());

  const formik = useFormik({
    initialValues: {
      karma_offered: 0,
      title: "",
    },
    validationSchema: Yup.object({
      karma_offered: Yup.number().required("Karmas offered are required"),
      title: Yup.string().required("Title is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // console.log(valores);
    },
  });
  const handleChangeKarmasOffered = (value) => {
    console.log(value);
    formik.setFieldValue("karma_offered", value);
  };
  const [imagesOpen, setImagesOpen] = useState(false);
  const handleOpenImages = () => {
    setImagesOpen(true);
  };
  const handleCloseImages = () => {
    setImagesOpen(false);
  };
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

        <section
          ref={modalRef}
          className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-full sm:max-w-2xl w-full"
        >
          <div className="shadow rounded-lg">
            <div className="flex justify-between items-center px-4 py-5 sm:px-6 bg-gradient-to-r from-orange-500 to-pink-500  rounded-t-lg">
              <h2
                id="applicant-information-title"
                className="text-lg leading-6 font-medium text-white"
              >
                {isEdit ? "Edit Post" : "Create Post"}
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
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="">
                  <dd className="text-sm text-gray-500 dark:text-white">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Karma offered</span>
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
                        {formik.values.karma_offered}
                      </span>
                    </div>
                    <Slider
                      onChange={handleChangeKarmasOffered}
                      max={authReducer.user?.karma_amount}
                      railStyle={{}}
                      handleStyle={{
                        backgroundColor: "#f97316",
                        border: 0,
                      }}
                      trackStyle={{
                        background: "none",
                      }}
                    />
                  </dd>
                </div>

                <div className="sm:col-start-2">
                  <dd className="text-sm text-gray-900 flex justify-end">
                    <div>
                      <label id="listbox-label" className="sr-only">
                        Change published status
                      </label>
                      <div className="relative">
                        <div className="inline-flex shadow-sm rounded-md divide-x divide-gray-900">
                          <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-gray-200 dark:divide-gray-900">
                            <div className="relative inline-flex items-center dark:bg-gray-800 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-gray-900 dark:text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <p className="ml-2.5 text-sm font-medium">
                                Anyone
                              </p>
                            </div>
                            <button
                              onMouseDown={handleTogglePublishedStatus}
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

                        {/* <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
                        <ul
                          ref={publishedStatusRef}
                          className={`${
                            publishedStatusOpen ? "block" : "hidden"
                          } origin-top-right absolute right-0 mt-2 w-full sm:w-72 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none`}
                          tabIndex="-1"
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-0"
                        >
                          {/* <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.
        
        Highlighted: "text-white bg-gray-800", Not Highlighted: "text-gray-900"
      --> */}
                          <li
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                                <p className="font-semibold">Anyone</p>
                                {/* <!--
              Checkmark, only display for selected option.
              
              Highlighted: "text-white", Not Highlighted: "text-orange-500"
            --> */}
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
                              </div>
                              {/* <!-- Highlighted: "text-orange-200", Not Highlighted: "text-gray-500" --> */}
                              <p className="text-gray-500 dark:text-gray-300 mt-2">
                                Everyone can ask to help you.
                              </p>
                            </div>
                          </li>
                          <li
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                {/* <!-- Selected: "font-semibold", Not Selected: "font-normal" --> */}
                                <p className="font-semibold">
                                  Connections only
                                </p>
                                {/* <!--
              Checkmark, only display for selected option.
              
              Highlighted: "text-white", Not Highlighted: "text-orange-500"
            --> */}
                                <span className="text-orange-500 hidden">
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
                              </div>
                              {/* <!-- Highlighted: "text-orange-200", Not Highlighted: "text-gray-500" --> */}
                              <p className="text-gray-500 dark:text-gray-300 mt-2">
                                Only your connections can ask to help you.
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dd className="text-sm text-gray-900">
                    <Editor postForm />
                  </dd>
                </div>

                {!imagesOpen && (
                  <div className="mt-2 sm:col-span-2">
                    <button
                      onClick={handleOpenImages}
                      className="inline-flex items-center py-2 text-sm font-medium rounded-md text-gray-500 dark:text-white bg-white dark:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add images
                    </button>
                  </div>
                )}
                {imagesOpen && (
                  <div className="sm:col-span-2 mt-2">
                    {imagesOpen && (
                      <div className="flex justify-end mb-2">
                        <button onClick={handleCloseImages}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-500 dark:text-gray-100"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="border border-dashed border-gray-500 dark:border-white px-4 py-10 w-100 rounded-lg flex justify-center items-center cursor-pointer">
                      <div className="flex items-center text-gray-500 dark:text-white">
                        <span className="mr-2">Drag and drop images or </span>
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">
                Attachments
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                <div className="w-0 flex-1 flex items-center">
                <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                resume_front_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>

                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <svg
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                coverletter_front_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>*/}
              </dl>
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
        </section>
      </div>
    </div>
  );
};

export default CreateEditPostModal;
