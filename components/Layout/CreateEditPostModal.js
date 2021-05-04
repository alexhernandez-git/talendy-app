import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import Editor from "components/Editor/Editor";
import useOutsideClick from "hooks/useOutsideClick";
import Slider from "rc-slider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import CreateEditPostEditor from "components/Editor/CreateEditPostEditor";
import { createPost, updatePost } from "redux/actions/posts";
import { useDispatch } from "react-redux";
const CreateEditPostModal = ({
  modalOpen,
  modalRef,
  isEdit,
  handleCloseModal,
  post,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const communitiesReducer = useSelector((state) => state.communitiesReducer);
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  const [privacityOpen, setPrivacityOpen] = useState(false);
  const handleOpenPrivacity = () => {
    setPrivacityOpen(true);
  };
  const handleClosePrivacity = () => {
    if (privacityOpen) {
      setPrivacityOpen(false);
    }
  };
  const handleTogglePrivacity = () => {
    setPrivacityOpen(!privacityOpen);
  };
  const privacityRef = useRef();
  useOutsideClick(privacityRef, () => handleClosePrivacity());

  const formik = useFormik({
    initialValues: {
      karma_offered: post
        ? post.karma_offered
        : authReducer.user?.karma_amount / 2,
      privacity: post ? post.privacity : "AN",
      community: post ? post.community : "",
      title: post ? post.title : "",
      text: post ? post.text : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      karma_offered: Yup.number().required("Karmas offered are required"),
      title: Yup.string().max(300).required("Title is required"),
      text: Yup.string(),
      privacity: Yup.string(),
      community: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const fd = new FormData();
      fd.append("title", values.title);
      fd.append("text", values.text);
      console.log(images);
      for (let i = 0; i < images.length; i++) {
        fd.append("images", images[i], images[i].name);
      }
      fd.append("privacity", values.privacity);
      fd.append("community", values.community);
      fd.append("karma_offered", values.karma_offered);
      if (post) {
        dispatch(
          updatePost(
            post.id,
            fd,
            resetForm,
            handleCloseModal,
            handleResetImages
          )
        );
      } else {
        dispatch(
          createPost(fd, resetForm, handleCloseModal, handleResetImages)
        );
      }
      console.log(images);
    },
  });
  const handleChangeKarmasOffered = (value) => {
    if (post) return;
    console.log(value);
    formik.setFieldValue("karma_offered", value);
  };
  const [imagesOpen, setImagesOpen] = useState(
    post?.images?.length > 0 ? true : false
  );
  const handleOpenImages = () => {
    setImagesOpen(true);
  };
  const handleCloseImages = () => {
    setImagesOpen(false);
  };
  const [communitiesOpen, setCommunitiesOpen] = useState(false);
  const handleOpenCommunities = () => {
    setCommunitiesOpen(true);
  };
  const handleCloseCommunities = () => {
    if (communitiesOpen) {
      setCommunitiesOpen(false);
    }
  };
  const handleToggleCommunities = () => {
    setCommunitiesOpen(!communitiesOpen);
  };
  const communitiesRef = useRef();
  useOutsideClick(communitiesRef, () => handleCloseCommunities());

  const fileValidator = (file) => {
    console.log("file", file);
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/jpg"
    ) {
      alert("Only .png, .jpg, .jpeg files are allowed");
      return {
        code: "Type not allowed",
        message: `Only .png, .jpg, .jpeg files are allowed`,
      };
    }
    return null;
  };
  const [images, setImages] = useState(post ? post.images : []);
  const onDrop = useCallback((acceptedFilesNew) => {
    // Do something with the files
    let totalSize = 0;

    for (let i; i < acceptedFilesNew.length; i++) {
      console.log(acceptedFilesNew[i].type);

      console.log(acceptedFilesNew[i].size);
      totalSize += acceptedFilesNew[i]?.size;
    }
    const maxAllowedSize = 1073741824;
    console.log("total size", totalSize);
    if (totalSize > maxAllowedSize) {
      alert("Over max size");
      return;
    }
    setImages(acceptedFilesNew);
  }, []);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    validator: fileValidator,
    accept: "image/jpeg, image/png, image/jpg",
    maxSize: 1073741824,
  });
  const handleRemoveFile = (file, index) => {
    acceptedFiles.splice(acceptedFiles.indexOf(file), 1);
    let imagesArr = [...images];
    imagesArr.splice(index, 1);
    setImages(imagesArr);
  };
  const handleChangeCommunity = (id) => {
    formik.setFieldValue("community", id);

    handleCloseCommunities();
  };

  const handleChangeTitle = (e) => {
    console.log(e.target.innerText);
    formik.setFieldValue("title", e.target.innerText);
  };
  const handleChangeText = (e) => {
    console.log(e.target.innerText);
    formik.setFieldValue("text", e.target.innerHTML);
  };

  const handleChangePrivacity = (value) => {
    formik.setFieldValue("privacity", value);
    handleClosePrivacity();
  };

  const handleResetImages = () => {
    setImages([]);
    acceptedFiles.splice(0, acceptedFiles.length);
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
                      value={formik.values.karma_offered}
                      onChange={handleChangeKarmasOffered}
                      max={authReducer.user?.karma_amount}
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
                              {formik.values.privacity === "AN" && (
                                <>
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
                                </>
                              )}
                              {formik.values.privacity === "CO" && (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                                      clipRule="evenodd"
                                    />
                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                  </svg>
                                  <p className="ml-2.5 text-sm font-medium">
                                    Connections only
                                  </p>
                                </>
                              )}
                            </div>
                            <button
                              onMouseDown={handleTogglePrivacity}
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
                          ref={privacityRef}
                          className={`${
                            privacityOpen ? "block" : "hidden"
                          } origin-top-right absolute right-0 z-20 mt-2 w-full sm:w-72 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none`}
                          tabIndex="-1"
                          role="listbox"
                          aria-labelledby="listbox-label"
                          aria-activedescendant="listbox-option-0"
                        >
                          <li
                            onClick={handleChangePrivacity.bind(this, "AN")}
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p className="font-semibold">Anyone</p>
                                {formik.values.privacity === "AN" && (
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
                              <p className="text-gray-500 dark:text-gray-300 mt-2">
                                Everyone can ask to help you.
                              </p>
                            </div>
                          </li>
                          <li
                            onClick={handleChangePrivacity.bind(this, "CO")}
                            className="text-gray-900 dark:text-white  dark:hover:bg-gray-900 hover:bg-gray-100 dark:hover:text-white cursor-pointer select-none relative p-4 text-sm"
                            id="listbox-option-0"
                            role="option"
                          >
                            <div className="flex flex-col">
                              <div className="flex justify-between">
                                <p className="font-semibold">
                                  Connections only
                                </p>
                                {formik.values.privacity === "CO" && (
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
                    <CreateEditPostEditor
                      handleChangeTitle={handleChangeTitle}
                      handleChangeText={handleChangeText}
                      titleValue={formik.values.title}
                      textValue={formik.values.text}
                    />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dd className="text-sm text-gray-900">
                    <div>
                      <label
                        id="listbox-label"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Community
                      </label>
                      <div className="mt-2 relative">
                        <button
                          type="button"
                          onMouseDown={handleToggleCommunities}
                          className="text-gray-500 cursor-pointer dark:text-gray-100 bg-white dark:bg-gray-700 relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left sm:text-sm"
                          aria-haspopup="listbox"
                          aria-expanded="true"
                          aria-labelledby="listbox-label"
                        >
                          <span className="block truncate">
                            {formik.values.community
                              ? communitiesReducer.communities.find(
                                  (community_item) =>
                                    community_item.id ===
                                    formik.values.community
                                ).name
                              : "Choose one (optional)"}
                          </span>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        </button>
                        <div ref={communitiesRef}>
                          {communitiesOpen && (
                            <ul
                              className=" absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                              tabindex="-1"
                              role="listbox"
                              aria-labelledby="listbox-label"
                              aria-activedescendant="listbox-option-3"
                            >
                              {communitiesReducer.communities.map(
                                (community_item) => (
                                  <li
                                    key={community_item.id}
                                    onClick={handleChangeCommunity.bind(
                                      this,
                                      community_item.id
                                    )}
                                    className="text-gray-500 dark:text-gray-100 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 dark:hover:bg-gray-900"
                                    id="listbox-option-0"
                                    role="option"
                                  >
                                    <span className="font-normal block truncate">
                                      {community_item.name}
                                    </span>
                                    {formik.values.community ===
                                      community_item.id && (
                                      <span className="text-orange-600 absolute inset-y-0 right-0 flex items-center pr-4">
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
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
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
                {images.length === 0 && imagesOpen && (
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
                    <div
                      {...getRootProps()}
                      className="border border-dashed border-gray-500 dark:border-white px-4 py-10 w-100 rounded-lg flex justify-center items-center cursor-pointer"
                    >
                      <div className="flex items-center text-gray-500 dark:text-white">
                        <span className="mr-2">Drag and drop images or </span>
                        <input
                          {...getInputProps()}
                          type="file"
                          className="hidden"
                          multiple
                          id="attach-files-input"
                        />
                        <button className="cursor-pointer inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {images.length > 0 && (
                  <div className="sm:col-span-2  mt-2">
                    <dd className="mt-1 text-sm text-gray-600 dark:text-white">
                      <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                        {images.map((image, index) => (
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="ml-2 flex-1 w-0 truncate">
                                {image.name}
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <svg
                                onClick={handleRemoveFile.bind(
                                  this,
                                  image,
                                  index
                                )}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 cursor-pointer"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
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
        </form>
      </div>
    </div>
  );
};

export default CreateEditPostModal;
