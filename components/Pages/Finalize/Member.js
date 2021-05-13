import useOutsideClick from "hooks/useOutsideClick";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { updateMemberReview } from "redux/actions/contributeRoom";
import { useDispatch } from "react-redux";
const Member = ({ member }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    if (isFormOpen) {
      setIsFormOpen(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      rate: member?.rate,
      comment: member?.comment,
    },
    validationSchema: Yup.object({
      rate: Yup.number().nullable(),
      comment: Yup.string().nullable(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await dispatch(updateMemberReview(values, member?.id));
    },
  });
  console.log(formik.errors);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (!firstLoad && formik?.values?.comment) {
      const timeoutId = setTimeout(() => {
        formik.handleSubmit();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
    setFirstLoad(false);
  }, [formik?.values?.comment]);
  const handleChangeRating = (rating) => {
    if (rating > 0) {
      formik.setFieldValue("rate", rating);
      formik.handleSubmit();
    }
  };
  const formRef = useRef();
  useOutsideClick(formRef, () => handleCloseForm());
  return (
    <li>
      <div className="block ">
        <div
          className="flex items-center px-4 py-4 sm:px-6 cursor-pointer bg-gray-50 dark:bg-gray-700"
          onMouseDown={handleToggleForm}
        >
          <div className="min-w-0 flex-1 flex items-center">
            <div className="flex-shrink-0">
              {member?.user?.picture ? (
                <img
                  className="h-12 w-12 rounded-full"
                  src={
                    new RegExp(
                      `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                    ).test(member?.user?.picture)
                      ? member?.user?.picture
                      : process.env.HOST + member?.user?.picture
                  }
                  alt=""
                ></img>
              ) : (
                <span className="bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                  <svg
                    className="text-gray-300 bg-gray-100 rounded-full h-12 w-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-5 md:gap-4">
              <div className="flex items-center">
                <a
                  href={`/${
                    authReducer.user?.id === member?.user?.id
                      ? "profile/posts"
                      : "user/" + member?.user?.id
                  }`}
                  target="_blank"
                >
                  <p
                    onMouseDown={(e) => e.stopPropagation()}
                    className="text-sm font-medium text-gray-500 dark:text-gray-100 truncate rounded-2xl px-3 py-1 hover:underline"
                  >
                    {member?.user?.username}
                  </p>
                </a>
              </div>

              <div className="hidden  col-start-3 col-span-2 md:flex items-center">
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    Applied on{" "}
                    <time dateTime="2020-01-07">
                      {" "}
                      {moment(member?.created).format("MMM D [at] h:mm A z")}
                    </time>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="sm:flex items-end">
              <div className=" mr-2">
                {formik?.values?.rate ? (
                  <StarRatings
                    rating={formik.values.rate}
                    starRatedColor="#e5c07b"
                    numberOfStars={5}
                    starHoverColor="#e5c07b"
                    starDimension="15px"
                    starSpacing="0px"
                    name="rating"
                  />
                ) : (
                  <StarRatings
                    rating={0}
                    starRatedColor="#e5c07b"
                    numberOfStars={5}
                    starHoverColor="#e5c07b"
                    starDimension="15px"
                    starSpacing="0px"
                    name="rating"
                  />
                )}
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-100">
                  Rate
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    isFormOpen ? "hidden" : "block"
                  } h-5 w-5 text-gray-400`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    isFormOpen ? "block" : "hidden"
                  } h-5 w-5 text-gray-400`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isFormOpen ? "block" : "hidden"}`} ref={formRef}>
          <form action="#" method="POST">
            <div className="sm:overflow-hidden">
              <div className="px-4 py-5 bg-white dark:bg-gray-800 space-y-6 sm:p-6">
                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    And if you invite him to a coffee?
                  </label>
                  <div className="mt-1">
                    <a
                      href={`/user/donation/${member?.user?.id}`}
                      target="_blank"
                    >
                      <button
                        type="button"
                        className="bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Donate
                      </button>
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Rate
                    </label>
                    <div className="mt-1 flex">
                      {formik?.values?.rate ? (
                        <StarRatings
                          rating={formik.values.rate}
                          changeRating={(rating) => handleChangeRating(rating)}
                          starRatedColor="#e5c07b"
                          numberOfStars={5}
                          starHoverColor="#e5c07b"
                          starDimension="25px"
                          starSpacing="0px"
                          name="rating"
                        />
                      ) : (
                        <StarRatings
                          rating={0}
                          changeRating={(rating) => handleChangeRating(rating)}
                          starRatedColor="#e5c07b"
                          numberOfStars={5}
                          starHoverColor="#e5c07b"
                          starDimension="25px"
                          starSpacing="0px"
                          name="rating"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Comment
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="comment"
                      name="comment"
                      rows="3"
                      onChange={formik.handleChange}
                      className="focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-300"
                      placeholder="Message"
                    >
                      {formik?.values?.comment}
                    </textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-100">
                    This review will be reflected when you finalize the post
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </li>
  );
};

export default Member;
