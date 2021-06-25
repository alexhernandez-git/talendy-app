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
const billing = () => {
  const page = BILLING_DASHBOARD_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);

  const [addBillingInformation, setAddBillingInformation] = useState(false);
  const handleOpenAddBilling = () => {
    setAddBillingInformation(true);
  };
  const handleCloseAddBilling = () => {
    setAddBillingInformation(false);
  };
  const [changingPaymentMethod, setChangingPaymentMethod] = useState(false);
  const handleOpenChangePaymentMethod = () => {
    setChangingPaymentMethod(true);
  };
  const handleCloseChangePaymentMethod = () => {
    setChangingPaymentMethod(false);
  };
  const [planPaymentMethod, setPlanPaymentMethod] = useState(null);
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
                  {addBillingInformation ? (
                    <AddBillingInformationForm
                      handleCloseAddBilling={handleCloseAddBilling}
                    />
                  ) : (
                    <>
                      {false && (
                        <>
                          <div className="">
                            <div class="lg:grid lg:grid-cols-3 lg:gap-6">
                              <div class="lg:col-span-1">
                                <div class="px-4 sm:px-0">
                                  <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                    Payment details
                                  </h3>
                                  <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                    Update your billing information. Please note
                                    that updating your location could affect
                                    your tax rates.
                                  </p>
                                </div>
                              </div>
                              <div class="mt-5 lg:mt-0 md:col-span-2">
                                {changingPaymentMethod ? (
                                  <ChangePaymentMethodForm
                                    handleCloseChangePaymentMethod={
                                      handleCloseChangePaymentMethod
                                    }
                                    planPaymentMethod={planPaymentMethod}
                                  />
                                ) : (
                                  <PaymentMethodInfo
                                    handleOpenChangePaymentMethod={
                                      handleOpenChangePaymentMethod
                                    }
                                    planPaymentMethod={planPaymentMethod}
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div class="hidden sm:block" aria-hidden="true">
                            <div class="py-5">
                              <div class="border-t border-gray-200"></div>
                            </div>
                          </div>
                        </>
                      )}

                      <div class={`mt-10 ${true ? "sm:mt-6" : "sm:mt-0"}`}>
                        <div class="lg:grid lg:grid-cols-3 lg:gap-6">
                          <div class="lg:col-span-1">
                            <div class="px-4 sm:px-0">
                              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Portal subscriptions
                              </h3>
                              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                Manage your portal subscriptions.
                              </p>
                            </div>
                          </div>
                          <div class="mt-5 lg:mt-0 md:col-span-2">
                            <BillingPlan
                              handleOpenAddBilling={handleOpenAddBilling}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="hidden sm:block" aria-hidden="true">
                        <div class="py-5">
                          <div class="border-t border-gray-200"></div>
                        </div>
                      </div>

                      <div class="mt-10 sm:mt-0">
                        <div class="lg:grid lg:grid-cols-3 lg:gap-6">
                          <div class="lg:col-span-1">
                            <div class="px-4 sm:px-0">
                              <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                                Billing history
                              </h3>
                              <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                See your billing invoices.
                              </p>
                            </div>
                          </div>
                          <div class="mt-5 lg:mt-0 md:col-span-2">
                            <BillingHistory />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
          </Layout>
        </>
      )}
    </>
  );
};

export default billing;
