import React, { useEffect } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";
import { useState } from "react";
import { createModal } from "react-modal-promise";
import Spinner from "../components/Layout/Spinner";
const useUserConfirmation = ({ isOpen, onResolve, onReject }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState();
  const userConfirmationRef = useRef();
  useOutsideClick(userConfirmationRef, () => onReject());
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters long ")
        .required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
    },
  });

  if (!isOpen) {
    return <></>;
  }
  return (
    <div
      className={` fixed z-40 inset-0 overflow-y-auto`}
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
          ref={userConfirmationRef}
          className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-full sm:max-w-md w-full py-8 px-4  sm:px-10 relative"
        >
          <div className="absolute top-2 right-2">
            <button
              type="button"
              onClick={onReject}
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
                src="/static/images/talendy-logo.png"
                alt="Workflow"
              />
              <h2 className="mt-3 text-center text-2xl font-extrabold text-gray-900 dark:text-white">
                Your password
              </h2>
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
          </form>
        </section>
      </div>
    </div>
  );
};

export default createModal(useUserConfirmation);
