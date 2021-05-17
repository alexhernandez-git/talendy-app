import React, { useEffect, useRef } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { IconContext } from "react-icons/lib";
import { FaCoffee, FaPizzaSlice } from "react-icons/fa";
import { GiMeal, GiHotMeal, GiSandwich } from "react-icons/gi";
import { useSelector } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MdRestaurantMenu } from "react-icons/md";
import { useState } from "react";
import { donateUser } from "redux/actions/user";
import currencies from "data/currencies";
import { changeCurrency } from "redux/actions/auth";
import { useDispatch } from "react-redux";
import Spinner from "components/Layout/Spinner";

import Container from "react-modal-promise";
import useUserConfirmationModal from "../../../hooks/useUserConfirmation";

const DonationForm = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const userReducer = useSelector((state) => state.userReducer);
  const donationOptionsReducer = useSelector(
    (state) => state.donationOptionsReducer
  );
  const dispatch = useDispatch();
  const [userConfirmationOpen, setUserConfirmationOpen] = useState(false);
  const handleOpenUserConfirmation = () => {
    setUserConfirmationOpen(true);
  };
  const handleCloseRegister = () => {
    if (userConfirmationOpen) {
      setUserConfirmationOpen(false);
    }
  };
  const handleToggleUserConfirmation = () => {
    setUserConfirmationOpen(!userConfirmationOpen);
  };

  const stripe = useStripe();
  const elements = useElements();

  const [stripeError, setStripeError] = useState(null);
  const handleCardElement = (e) => {
    console.log(e);
    setStripeError(e.error);
  };

  const stripeSubmit = async (values, resetForm) => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    console.log("card element", cardElement);

    if (!cardElement) {
      dispatch(
        donateUser(
          userReducer.user?.id,
          values,
          resetForm,
          handleCloseNewPaymentMethod,
          handleCloseChangePaymentMethod
        )
      );
      return;
    }

    // Use your card Element with other Stripe.js APIs

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setStripeError(error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setStripeError(null);
      dispatch(
        donateUser(
          userReducer.user?.id,
          {
            ...values,

            payment_method_id: paymentMethod.id,
          },
          resetForm,
          handleCloseNewPaymentMethod,
          handleCloseChangePaymentMethod,
          cardElement.clear
        )
      );
    }
  };
  const formik = useFormik({
    initialValues: {
      donation_option_id: donationOptionsReducer.options.filter(
        (option) => option.currency === authReducer.currency
      )[0]?.id,
      other_amount: "",
      message: "",
      currency: authReducer.currency,
      email: "",
      is_authenticated: authReducer.is_authenticated,
      other_amount_karma: "",
      payment_method_id: authReducer.user?.default_payment_method
        ? authReducer.user?.default_payment_method
        : "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      donation_option_id: Yup.string(),
      other_amount: Yup.number().when("donation_option_id", {
        is: (donation_option_id) => !donation_option_id,
        then: Yup.number()
          .required("Amount is required")
          .typeError("Amount must be a number")
          .positive("Amount must be greater than zero")
          .moreThan(2, "Amount must be greater than 2.00"),
      }),
      other_amount_karma: Yup.number().when("donation_option_id", {
        is: (donation_option_id) => !donation_option_id,
        then: Yup.number()
          .required("Amount is required")
          .typeError("Amount must be a number")
          .positive("Amount must be greater than zero"),
      }),
      message: Yup.string().max(
        300,
        "Message must be less than or equal to 300 characters"
      ),
      currency: Yup.string().required(),
      email: Yup.string().when("is_authenticated", {
        is: false,
        then: Yup.string().required("Email is required"),
      }),
      payment_method_id: Yup.string(),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      useUserConfirmationModal()
        .then(() => {
          console.log("success");
          stripeSubmit(values, resetForm);
        })
        .catch(() => {
          console.log("error");
        });
    },
  });
  console.log(formik.errors);
  const inviteTo = {
    L1: {
      label: "A coffe",
      icon: (
        <IconContext.Provider value={{ size: 18, className: "mr-2" }}>
          <FaCoffee />
        </IconContext.Provider>
      ),
    },
    L2: {
      label: "A meal",
      icon: (
        <IconContext.Provider value={{ size: 18, className: "mr-2" }}>
          <GiSandwich />
        </IconContext.Provider>
      ),
    },
    L3: {
      label: "A dinner",
      icon: (
        <IconContext.Provider value={{ size: 18, className: "mr-2" }}>
          <GiMeal />
        </IconContext.Provider>
      ),
    },
    L4: {
      label: "A luxury dinner",
      icon: (
        <IconContext.Provider value={{ size: 18, className: "mr-2" }}>
          <GiHotMeal />
        </IconContext.Provider>
      ),
    },
  };
  const handleChangeDonationOption = (id) => {
    formik.setFieldValue("other_amount", "");
    formik.setFieldValue("donation_option_id", id);
  };
  const handleRemoveDonationOption = () => {
    formik.setFieldValue("donation_option_id", "");
  };
  const handleChangeCurrency = (e) => {
    formik.handleChange(e);
    dispatch(changeCurrency(e.target.value));
  };
  const handleChangeOtherAmount = (e) => {
    formik.handleChange(e);
    console.log(e.target.value);
    let karmaAmount;
    if (e.target.value >= 50) {
      karmaAmount = 5000;
    } else if (e.target.value >= 25) {
      karmaAmount = 2500;
    } else if (e.target.value >= 15) {
      karmaAmount = 1500;
    } else if (e.target.value >= 5) {
      karmaAmount = 500;
    } else if (e.target.value >= 2) {
      karmaAmount = 200;
    }
    formik.setFieldValue("other_amount_karma", karmaAmount);
  };
  console.log(formik.values);

  const [changePaymentMethod, setChangePaymentMethod] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState(false);
  const handleOpenChangePaymentMethod = () => {
    setChangePaymentMethod(true);
  };
  const handleCloseChangePaymentMethod = () => {
    setChangePaymentMethod(false);
  };
  const handleOpenNewPaymentMethod = () => {
    setNewPaymentMethod(true);
  };
  const handleCloseNewPaymentMethod = () => {
    setNewPaymentMethod(false);
  };
  const handleChangeCard = (id) => {
    formik.setFieldValue("payment_method_id", id);
    setChangePaymentMethod(false);
  };
  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <form id="donation-form" onSubmit={formik.handleSubmit} />
      <Container />
      <nav className="flex mb-4 mx-4 sm:mx-auto" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link href="/feed">
                <span className="cursor-pointer text-gray-400 hover:text-gray-500">
                  <svg
                    className="flex-shrink-0 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">Home</span>
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Link href={`/user/${userReducer.user?.id}`}>
                <span className="cursor-pointer ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {userReducer.user?.username}
                </span>
              </Link>
            </div>
          </li>

          <li>
            <div className="flex items-center">
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="ml-4 text-sm font-medium text-orange-500"
                aria-current="page"
              >
                Donate
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="bg-white dark:bg-gray-700 px-4 shadow sm:px-6 sm:rounded-lg">
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y divide-gray-200 dark:sm:divide-gray-400">
            {!authReducer.is_authenticated && (
              <div className="py-4 sm:pt-5 pb-6 sm:col-span-2 flex justify-end">
                <select
                  id="currency"
                  name="currency"
                  value={authReducer.currency}
                  autoComplete="currency"
                  onBlur={formik.handleBlur}
                  value={formik.values.currency}
                  onChange={handleChangeCurrency}
                  className="mt-1 focus:ring-orange-500 focus:border-orange-500 block min-w-0 rounded-3xl sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                >
                  <option defaultValue disabled value="">
                    Select one
                  </option>

                  {currencies.map((currency) => (
                    <option value={currency.code}>{currency.code}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 items-center">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Payment
              </dt>
              {!newPaymentMethod && authReducer.user?.payment_methods ? (
                <>
                  {!changePaymentMethod ? (
                    <dd className="text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 flex justify-between items-center">
                      <div className="flex justify-between w-full mr-3">
                        <span className="text-gray-500 dark:text-gray-100 font-bold">
                          Visa
                        </span>
                        <span className="text-gray-500 dark:text-gray-100">
                          **** **** ****{" "}
                          {
                            authReducer.user?.payment_methods.find(
                              (card) =>
                                card.id === formik.values.payment_method_id
                            )?.card?.last4
                          }
                        </span>
                      </div>
                      <button
                        onClick={handleOpenChangePaymentMethod}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
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
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Change
                      </button>
                    </dd>
                  ) : (
                    <dd className="text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                      <div className="flex justify-start mb-2">
                        <button
                          onClick={handleCloseChangePaymentMethod}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                      </div>
                      <ul className="relative bg-white dark:bg-gray-700 rounded-md -space-y-px w-full">
                        {authReducer.user?.payment_methods.map(
                          (card_object, i) => (
                            <li
                              key={card_object.id}
                              onClick={handleChangeCard.bind(
                                this,
                                card_object.id
                              )}
                            >
                              <div
                                className={`relative border ${
                                  i === 0 && "rounded-tl-md rounded-tr-md"
                                } flex justify-between`}
                              >
                                <label className="flex items-center justify-between text-sm cursor-pointer w-full  p-4 hover:opacity-80">
                                  <p
                                    id="plan-option-pricing-1"
                                    className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center"
                                  >
                                    <span className="font-medium">
                                      **** **** **** {card_object?.card?.last4}
                                    </span>
                                  </p>
                                  <div
                                    id="plan-option-limit-1"
                                    className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:flex justify-end items-center"
                                  >
                                    <p
                                      id="plan-option-limit-2"
                                      className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right "
                                    >
                                      {card_object?.card?.brand}
                                    </p>
                                  </div>
                                </label>
                              </div>
                            </li>
                          )
                        )}

                        <li>
                          <button
                            onClick={handleOpenNewPaymentMethod}
                            className={`relative border rounded-bl-md rounded-br-md flex w-full justify-center`}
                          >
                            <span className="p-2 flex justify-center items-center">
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
                                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                              </svg>
                              Add new
                            </span>
                          </button>
                        </li>
                      </ul>
                    </dd>
                  )}
                </>
              ) : (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 col-span-2">
                  <div className="flex justify-between items-center">
                    <CardElement
                      onChange={handleCardElement}
                      options={{
                        hidePostalCode: true,
                        style: {
                          base: {
                            color: authReducer.theme ? "#fff" : "#424770",
                            "::placeholder": {
                              color: "#aab7c4",
                            },
                          },
                          invalid: {
                            color: "#9e2146",
                          },
                        },
                      }}
                      className="block w-full border bg-white dark:bg-gray-600 border-gray-300  rounded-3xl shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                    {authReducer.user?.payment_methods && (
                      <button
                        onClick={handleCloseNewPaymentMethod}
                        className="ml-2 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  {stripeError && (
                    <p className="mt-2 text-sm text-red-600">
                      {stripeError.message}
                    </p>
                  )}
                </dd>
              )}
            </div>
            <div className="py-4 sm:pt-5 pb-6 sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                Invite him to
              </dt>

              <dd className="mt-3 text-sm text-gray-900 dark:text-white">
                <fieldset>
                  <legend className="sr-only">Amount options</legend>
                  <div className="space-y-4">
                    {donationOptionsReducer?.options
                      .filter(
                        (option) => option.currency === authReducer.currency
                      )
                      .map((option) => (
                        <label
                          key={option.id}
                          onClick={handleChangeDonationOption.bind(
                            this,
                            option.id
                          )}
                          className="relative block rounded-3xl border border-gray-300 bg-white dark:bg-gray-700 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between"
                        >
                          <input
                            type="radio"
                            name="server_size"
                            value="Hobby"
                            className="sr-only"
                            aria-labelledby="server-size-0-label"
                            aria-describedby="server-size-0-description-0 server-size-0-description-1"
                          />
                          <div className="flex items-center">
                            <div className="text-sm">
                              <p
                                id="server-size-0-label"
                                className="font-medium  flex items-center"
                              >
                                {inviteTo[option.type]?.icon}

                                {inviteTo[option.type]?.label}
                              </p>
                            </div>
                          </div>

                          <div
                            id="server-size-0-description-1"
                            className="mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right"
                          >
                            <div className="font-medium">
                              {option.price_label}
                            </div>
                          </div>
                          {/* Border selected */}
                          {option.id === formik.values.donation_option_id && (
                            <div
                              className="border-orange-500 absolute -inset-px rounded-3xl border-2 pointer-events-none"
                              aria-hidden="true"
                            ></div>
                          )}
                        </label>
                      ))}
                  </div>
                </fieldset>

                <div className="relative my-4">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-white dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-100">
                      Other amount
                    </span>
                  </div>
                </div>
                <div>
                  <div className="relative flex justify-center">
                    <input
                      type="text"
                      name="other_amount"
                      id="other_amount"
                      className={`appearance-none text-center block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.other_amount &&
                        formik.errors.other_amount
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      placeholder={`${
                        !authReducer.is_loading && authReducer.currency
                          ? getSymbolFromCurrency(authReducer.currency)
                          : ""
                      } Other`}
                      aria-describedby="other_amount"
                      value={formik.values.other_amount}
                      onKeyUp={handleRemoveDonationOption}
                      onChange={handleChangeOtherAmount}
                      onBlur={formik.handleBlur}
                    ></input>
                    {formik.touched.other_amount && formik.errors.other_amount && (
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
                  {formik.touched.other_amount && formik.errors.other_amount && (
                    <p
                      className="mt-2 text-sm text-red-600 text-center"
                      id="other_amount-error"
                    >
                      {formik.errors.other_amount}
                    </p>
                  )}
                </div>
              </dd>
            </div>

            <div className="mb-4 sm:mb-5 pt-5">
              {!authReducer.is_authenticated && (
                <div className="mb-4">
                  <div className="relative flex justify-center">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className={`appearance-none block w-full border rounded-md shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                        formik.touched.email && formik.errors.email
                          ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                          : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      placeholder={`Email`}
                      aria-describedby="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    ></input>
                    {formik.touched.email && formik.errors.email && (
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
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-2 text-sm text-red-600" id="email-error">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              )}
              <div>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows="3"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`appearance-none block w-full border rounded-md shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                      formik.touched.message && formik.errors.message
                        ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                        : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                    }`}
                    placeholder="Message (optional)"
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
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
                {formik.touched.message && formik.errors.message && (
                  <p className="mt-2 text-sm text-red-600 " id="message-error">
                    {formik.errors.message}
                  </p>
                )}
              </div>
            </div>
          </dl>
        </div>
        <div className="pb-6">
          <button
            type="submit"
            form="donation-form"
            className="w-full uppercase bg-gradient-to-r items-center from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
          >
            {userReducer.is_donating_user && <Spinner className="mr-2" />}
            DONATE NOW
          </button>

          {authReducer.is_authenticated ? (
            <>
              {formik.values.donation_option_id ? (
                <div className="flex justify-center mt-5 text-gray-500 dark:text-gray-100">
                  <span className="text-xs flex items-center">
                    You will earn{" "}
                    <span className="text-orange-500 flex items-center mx-1">
                      <svg
                        className="w-4 h-4 inline"
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
                      {
                        donationOptionsReducer.options.find(
                          (option) =>
                            option.id === formik.values.donation_option_id
                        ).paid_karma
                      }{" "}
                      Karma
                    </span>{" "}
                    for this good action
                  </span>
                </div>
              ) : (
                <>
                  {formik.values.other_amount_karma && (
                    <div className="flex justify-center mt-5 text-gray-500 dark:text-gray-100">
                      <span className="text-xs flex items-center">
                        You will earn{" "}
                        <span className="text-orange-500 flex items-center mx-1">
                          <svg
                            className="w-4 h-4 inline"
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
                          {formik.values.other_amount_karma} Karma
                        </span>{" "}
                        for this good action
                      </span>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <div className="mt-5 flex justify-center">
              <span className="text-sm text-gray-400 dark:text-gray-300">
                Anonymous donation enabled, no sign in required
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
