import React, { useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import useOutsideClick from "hooks/useOutsideClick";
import Slider from "rc-slider";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  createMember,
  isMemberEmailAvailable,
  resetMemberEmailAvailable,
} from "redux/actions/members";
import { createCommunity } from "redux/actions/dashboardCommunities";

const AddCommunitiesModal = ({ modalOpen, modalRef, handleCloseModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const membersReducer = useSelector((state) => state.membersReducer);
  const { member_email_available_error } = membersReducer;

  const [roleOpen, setRoleOpen] = useState(false);
  const handleOpenRole = () => {
    setRoleOpen(true);
  };
  const handleCloseRole = () => {
    if (roleOpen) {
      setRoleOpen(false);
    }
  };
  const handleToggleRole = () => {
    setRoleOpen(!roleOpen);
  };
  const roleRef = useRef();
  useOutsideClick(roleRef, () => handleCloseRole());

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      dispatch(createCommunity(values, resetForm, handleCloseModal));
    },
  });

  useEffect(() => {
    if (formik.values.email != "") {
      dispatch(resetMemberEmailAvailable());
      const timeoutId = setTimeout(() => {
        dispatch(isMemberEmailAvailable({ email: formik.values.email }));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [formik.values.email]);

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
                New community
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
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div className="sm:col-span-2">
                  <div className="mt-1 relative">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.name}
                      placeholder="Community name"
                      autocomplete="given-name"
                      className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.name && formik.errors.name
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                    />
                    {formik.touched.name && formik.errors.name && (
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
                  {formik.touched.name && formik.errors.name && (
                    <p className="mt-2 text-sm text-red-600" id="name-error">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
              </div>
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

export default AddCommunitiesModal;
