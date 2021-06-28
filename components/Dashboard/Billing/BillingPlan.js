import Spinner from "components/Layout/Spinner";
import useOutsideClick from "hooks/useOutsideClick";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelSubscription, reactivateSubscription } from "redux/actions/auth";

const BillingPlan = ({ handleOpenAddBilling }) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const portalReducer = useSelector((state) => state.portalReducer);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    if (showModal) {
      setShowModal(false);
    }
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleHideModal());
  const handleCancelSubscription = () => {
    dispatch(cancelSubscription(handleHideModal));
  };
  const CancelSubscriptionModal = () => {
    return (
      <div
        className={`${
          showModal ? "block" : "hidden"
        } fixed z-10 inset-0 overflow-y-auto`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            ref={modalRef}
          >
            {authReducer.cancelling_subscription && (
              <div className="absolute right-5">
                <Spinner />
              </div>
            )}
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
                    stroke-linejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Cancel plan
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to cancel your plan? If you have an
                    order, the actions are limited to delivery or cancellation
                    only.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleCancelSubscription}
              >
                Cancel plan
              </button>
              <button
                type="button"
                onClick={handleHideModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleReactivateSubscription = () => {
    dispatch(reactivateSubscription());
  };

  return (
    <section aria-labelledby="plan_heading">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
            {!portalReducer.portal?.plan_default_payment_method && (
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
                      4 days free trial left.{" "}
                      <span
                        onClick={handleOpenAddBilling}
                        className="cursor-pointer font-medium underline text-yellow-700 hover:text-yellow-600"
                      >
                        Add Billing Information.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div>
                <span className="text-lg leading-6 font-medium text-gray-900">
                  Silver Plan
                </span>{" "}
                <span className="text-lg leading-6 font-medium text-gray-400">
                  |
                </span>{" "}
                <span className="text-lg leading-6 font-medium text-gray-900">
                  100€
                </span>
              </div>
              <div className="mt-2">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Free trial
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between bg-gray-50">
            <div className="px-4 py-3  text-right sm:px-6">
              {authReducer.user?.current_plan_subscription?.to_be_cancelled ||
              authReducer.user?.current_plan_subscription === null ? (
                <button
                  type="button"
                  className="items-center bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700"
                  onClick={handleReactivateSubscription}
                >
                  {authReducer.reactivating_subscription && (
                    <span className="mr-3">
                      <Spinner />
                    </span>
                  )}
                  Reactivate subscription
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleShowModal}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel subscription
                </button>
              )}
            </div>
            <div className="px-4 py-3  text-right sm:px-6">
              <Link href="/dashboard/manage-subscription">
                <button
                  type="button"
                  className="items-center bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700"
                >
                  Manage your subscription
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
      <CancelSubscriptionModal />
    </section>
  );
};

export default BillingPlan;
