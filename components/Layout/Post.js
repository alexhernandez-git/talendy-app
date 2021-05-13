import React, { useEffect } from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";

import PostModal from "./PostModal";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateEditPostModal from "components/Layout/CreateEditPostModal";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { createAlert } from "redux/actions/alerts";
import DeletePostModal from "./DeletePostModal";
import { createContributeRequest, deletePost } from "redux/actions/posts";

import { useFormik } from "formik";
import * as Yup from "yup";

const Post = ({ page, post }) => {
  const router = useRouter();
  const [optionsOpen, setOptionsOpen] = useState(false);
  const handleOpenOptions = () => {
    setOptionsOpen(true);
  };
  const handleCloseOptions = () => {
    setOptionsOpen(false);
  };
  const handleToggleOptions = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setOptionsOpen(!optionsOpen);
  };
  const optionsRef = useRef();
  useOutsideClick(optionsRef, () => handleCloseOptions());
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    if (optionsOpen) {
      handleCloseOptions();
    }
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleCloseModal());
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);
  const [editOpen, setEditOpen] = useState(false);
  const handleOpenEdit = (e) => {
    handleCloseOptions();
    setEditOpen(true);
    if (e) {
      e.stopPropagation();
    }
  };
  const handleCloseEdit = () => {
    setEditOpen(false);
  };
  const handleToggleEdit = () => {
    setEditOpen(!editOpen);
  };
  const editRef = useRef();
  useOutsideClick(editRef, () => handleCloseEdit());
  useEffect(() => {
    if (editOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [editOpen]);
  const dispatch = useDispatch();

  const authReducer = useSelector((state) => state.authReducer);
  const handleRequestToContribute = (e) => {
    e.stopPropagation();
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
    }
  };
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    if (post?.user?.id === authReducer.user?.id) {
      router.push(`/profile/posts`);
      return;
    }
    router.push(`/user/${post?.user?.id}`);
  };
  const copyToClipboard = (e) => {
    e.stopPropagation();
    const el = document.createElement("textarea");
    el.value = `${location.origin}/post/${post?.id}`;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    dispatch(createAlert("SUCCESS", "Post link copied to clipboard"));
  };
  const [deleteOpen, setDeleteOpen] = useState(false);
  const handleOpenDelete = () => {
    handleCloseOptions();
    setDeleteOpen(true);
  };
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };
  const handleToggleDelete = () => {
    setDeleteOpen(!deleteOpen);
  };
  const deleteRef = useRef();
  useOutsideClick(deleteRef, () => handleCloseDelete());
  const handleDeletePost = () => {
    dispatch(deletePost(post, handleCloseDelete));
  };

  const formik = useFormik({
    initialValues: {
      reason: "",
      post: post?.id,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      reason: Yup.string(),
      post: Yup.string().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(createContributeRequest(values, resetForm));
    },
  });

  const handleSubmitContributeRequest = (e) => {
    e.stopPropagation();
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    formik.handleSubmit();
  };

  return (
    <li>
      <article
        onMouseDown={handleOpenModal}
        aria-labelledby="question-title-81614"
        className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg cursor-pointer"
      >
        <div>
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              {post?.user && post?.user.picture ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    new RegExp(
                      `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                    ).test(post?.user.picture)
                      ? post?.user.picture
                      : process.env.HOST + post?.user.picture
                  }
                  alt=""
                ></img>
              ) : (
                <span className="bg-gray-100 rounded-full overflow-hidden h-10 w-10">
                  <svg
                    className="text-gray-300 bg-gray-100 rounded-full h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                <span
                  onClick={handleGoToProfile}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  {post?.user?.username}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-100">
                <time dateTime="2020-12-09T11:43:00">
                  {moment(post?.created).format("MMM D [at] h:mm A z")}
                </time>
              </p>
            </div>
            <div className="flex-shrink-0 self-center flex">
              <div className="relative inline-block text-left">
                {authReducer.user?.id === post?.user?.id && (
                  <div>
                    <button
                      onMouseDown={handleToggleOptions}
                      type="button"
                      className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
                      id="options-menu-0"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open options</span>

                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                )}

                <div
                  className={`${
                    optionsOpen ? "block" : "hidden"
                  } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu-0"
                >
                  <div className="py-1" role="none" ref={optionsRef}>
                    <span
                      onMouseDown={handleOpenEdit}
                      className="cursor-pointer flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      role="menuitem"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path
                          fillRule="evenodd"
                          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Edit</span>
                    </span>
                    <span
                      onMouseDown={handleOpenDelete}
                      className="cursor-pointer flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                      role="menuitem"
                    >
                      <svg
                        className="mr-3 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Delete</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2
            id="question-title-81614"
            className="mt-4 text-2xl font-medium text-gray-900 dark:text-white break-words"
          >
            {post?.title}
          </h2>
        </div>
        <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4 whitespace-pre-line">
          <p
            className="whitespace-pre-line break-all"
            dangerouslySetInnerHTML={{
              __html:
                post?.text?.length > 250
                  ? post?.text.substring(0, 250 - 3) + "..."
                  : post?.text,
            }}
          ></p>
        </div>

        {post?.images?.length > 0 && (
          <div className="mt-4">
            <img
              src={
                new RegExp(
                  `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                ).test(post.images[0].image)
                  ? post.images[0].image
                  : process.env.HOST + post.images[0].image
              }
            />
          </div>
        )}
        {post?.images?.length > 1 && (
          <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4 flex justify-center hover:underline cursor-pointer">
            <span>{post.images.length - 1} images more</span>
          </div>
        )}
        {post?.solution && (
          <div className="mt-2 text-sm text-gray-700  dark:text-gray-100 space-y-4 bg-green-50 dark:bg-green-700 p-3 rounded shadow">
            <span className="font-medium">Solution</span>
            <div className="whitespace-pre-line">
              <p
                className="whitespace-pre-line break-all"
                dangerouslySetInnerHTML={{
                  __html:
                    post?.solution?.length > 250
                      ? post?.solution.substring(0, 250 - 3) + "..."
                      : post?.solution,
                }}
              ></p>
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                <svg
                  className="h-5 w-5 text-orange-500"
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
                <span className="font-medium text-orange-500">
                  {post?.karma_offered} Karma
                </span>
                <span className="sr-only">karmas amount</span>
              </button>
            </span>
          </div>

          <div className="flex text-sm">
            <span className="inline-flex items-center text-sm">
              <button
                onMouseDown={copyToClipboard}
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
                <span className="font-medium text-gray-900 dark:text-white">
                  Share
                </span>
              </button>
            </span>
          </div>
        </div>
        {post?.privacity === "CO" && (
          <div className="mt-6 flex justify-between space-x-8">
            <span className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Private, connections only
            </span>
          </div>
        )}
        {post?.status === "SO" && (
          <div className="mt-6 flex justify-between space-x-8">
            <span className="mt-2 flex w-full items-center justify-center px-4 py-2 border dark:border-green-300 border-green-500 shadow-sm text-sm font-medium rounded-3xl dark:text-green-300 text-green-500 bg-white dark:bg-gray-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Solved
            </span>
          </div>
        )}
        {!post?.members?.some(
          (member) => member.user.id === authReducer.user?.id
        ) &&
          !post?.is_contribute_requested &&
          post?.privacity !== "CO" &&
          post?.status !== "SO" && (
            <form
              onSubmit={handleSubmitContributeRequest}
              className="mt-6 sm:flex justify-between sm:space-x-8"
            >
              <input
                type="text"
                name="reason"
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                value={formik.values.reason}
                onChange={formik.handleChange}
                id="reason"
                className="block mb-2 sm:mb-0 w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-300  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-3xl shadow-sm py-2 px-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Message"
                aria-describedby="reason"
              />
              <button
                type="button"
                onMouseDown={handleSubmitContributeRequest}
                className="w-full sm:w-72 bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
              >
                Request to contribute
              </button>
            </form>
          )}
        {post?.is_contribute_requested && (
          <div className="mt-6 flex justify-between space-x-8">
            <span className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 ">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg> */}
              Contribute requested
            </span>
          </div>
        )}
      </article>
      <PostModal
        page={page}
        post={post}
        modalOpen={modalOpen}
        handleToggleModal={handleToggleModal}
        modalRef={modalRef}
        handleCloseModal={handleCloseModal}
        formik={formik}
        handleSubmitContributeRequest={handleSubmitContributeRequest}
      />
      <CreateEditPostModal
        isEdit
        page={page}
        post={post}
        modalOpen={editOpen}
        handleCloseModal={handleCloseEdit}
        handleToggleModal={handleToggleEdit}
        modalRef={editRef}
      />
      <DeletePostModal
        modalOpen={deleteOpen}
        handleCloseModal={handleCloseDelete}
        modalRef={deleteRef}
        handleDeletePost={handleDeletePost}
      />
    </li>
  );
};

export default Post;
