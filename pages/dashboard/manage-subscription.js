import Layout from "components/Dashboard/Layout";
import { BILLING_DASHBOARD_PAGE } from "pages";
import React from "react";
import TabMenu from "components/Dashboard/TabMenu";
import ChangePaymentMethodForm from "components/Dashboard/Billing/ChangePaymentMethodForm";
import PaymentMethodInfo from "components/Dashboard/Billing/PaymentMethodInfo";
import BillingPlan from "components/Dashboard/Billing/BillingPlan";
import BillingHistory from "components/Dashboard/Billing/BillingHistory";
import { useState } from "react";
import AddBillingInformationForm from "components/Dashboard/Billing/AddBillingInformationForm";
import Head from "next/head";
import Spinner from "components/Layout/Spinner";
import useAuthRequired from "hooks/useAuthRequired";
import { useSelector } from "react-redux";
import useOutsideClick from "hooks/useOutsideClick";
import { useRef } from "react";
import { changePlan } from "redux/actions/portal";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
const billing = () => {
  const page = BILLING_DASHBOARD_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  const router = useRouter();
  const plansReducer = useSelector((state) => state.plansReducer);
  const portalReducer = useSelector((state) => state.portalReducer);
  const { portal } = portalReducer;
  const [planSelected, setPlanSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (plan_id) => {
    setPlanSelected(plan_id);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setPlanSelected(null);
    if (showModal) {
      setShowModal(false);
    }
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleHideModal());
  const dispatch = useDispatch();
  const handleChangePlan = () => {
    dispatch(changePlan({ plan_id: planSelected }, handleHideModal, router));
  };
  const ChangeSubscriptionModal = () => {
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
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Change plan
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to change your plan? The changes will
                    be reflected in the next billing cicle
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handleChangePlan}
                className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {portalReducer.is_changing_plan && (
                  <div className="mr-2">
                    <Spinner />
                  </div>
                )}
                Select plan
              </button>
              <button
                type="button"
                onClick={handleHideModal}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Head>
        <title>Billing</title>
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
                  <div class="bg-white">
                    <div class="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                      <div class="sm:flex sm:flex-col sm:align-center">
                        <h1 class="text-5xl font-extrabold text-gray-900 sm:text-center">
                          Pricing Plans
                        </h1>
                        <p class="mt-5 text-xl text-gray-500 sm:text-center">
                          Start building for free, then add a site plan to go
                          live. Account plans unlock additional features.
                        </p>
                      </div>
                      <div class="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
                        {plansReducer.plans?.map((plan) => (
                          <div class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                            <div class="p-6">
                              <h2 class="text-lg leading-6 font-medium text-gray-900">
                                {plan.type === "SI" && "Silver"}
                                {plan.type === "GO" && "Gold"}
                                {plan.type === "PL" && "Platinum"}
                              </h2>
                              <p class="mt-4 text-sm text-gray-500">
                                All the basics for starting a new business
                              </p>
                              <p class="mt-8">
                                <span class="text-4xl font-extrabold text-gray-900">
                                  {plan?.price_label}
                                </span>
                                <span class="text-base font-medium text-gray-500">
                                  /mo
                                </span>
                              </p>
                              {portal?.plan?.plan_type === plan.type ? (
                                <span class="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900">
                                  Selected
                                </span>
                              ) : (
                                <span
                                  onClick={handleShowModal.bind(this, plan.id)}
                                  class="mt-8 cursor-pointer block w-full bg-orange-500 border border-orange-600 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-orange-600"
                                >
                                  Select
                                </span>
                              )}
                            </div>
                            <div class="pt-6 pb-8 px-6">
                              <h3 class="text-xs font-medium text-gray-900 tracking-wide uppercase">
                                What's included
                              </h3>
                              <ul class="mt-6 space-y-4">
                                <li class="flex space-x-3">
                                  <svg
                                    class="flex-shrink-0 h-5 w-5 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                  <span class="text-sm text-gray-500">
                                    {plan.users_amount} members max.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </Layout>
          <ChangeSubscriptionModal />
        </>
      )}
    </>
  );
};

export default billing;
