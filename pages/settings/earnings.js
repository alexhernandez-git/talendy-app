import SettingsLayout from "components/Layout/SettingsLayout";
import Spinner from "components/Layout/Spinner";
import EarningsHistory from "components/Pages/Settings/EarningsHistory";
import PaypalConnectModal from "components/Pages/Settings/PaypalConnectModal";
import WithdrawFundsModal from "components/Pages/Settings/WithdrawFundsModal";
import useOutsideClick from "hooks/useOutsideClick";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Container from "react-modal-promise";
import useUserConfirmationModal from "hooks/useUserConfirmation";
import { fetchEarnings } from "redux/actions/earnings";
import useAuthRequired from "hooks/useAuthRequired";
const earnings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [cantRender, authReducer, initial_data_fetched] = useAuthRequired();
  const withdrawFundsRef = useRef();
  const [openWithdrawFunds, setOpenWithdrawFunds] = useState(false);
  const handleFetchEarnigsData = async () => {
    if (initial_data_fetched && authReducer.user) {
      await dispatch(fetchEarnings());
    }
  };
  useEffect(() => {
    handleFetchEarnigsData();
  }, [initial_data_fetched]);
  const handleToggleWithdrawFunds = () => {
    if (!openWithdrawFunds) {
      useUserConfirmationModal()
        .then(() => {
          console.log("success");
          setOpenWithdrawFunds(true);
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      setOpenWithdrawFunds(false);
    }
  };
  const handleCloseWithdrawFunds = () => {
    if (openWithdrawFunds) {
      setOpenWithdrawFunds(false);
    }
  };
  useOutsideClick(withdrawFundsRef, () => handleCloseWithdrawFunds());

  // Paypal connect
  const paypalConnectModalRef = useRef();
  const [openPaypalConnectModal, setOpenPaypalConnectModal] = useState(false);
  const handleTogglePaypalConnectForm = () => {
    if (!openPaypalConnectModal) {
      useUserConfirmationModal()
        .then(() => {
          console.log("success");
          setOpenPaypalConnectModal(true);
        })
        .catch(() => {
          console.log("error");
        });
    } else {
      setOpenPaypalConnectModal(false);
    }
  };
  const handleClosePaypalConnectModal = () => {
    if (openPaypalConnectModal) {
      setOpenPaypalConnectModal(false);
    }
  };
  useOutsideClick(paypalConnectModalRef, () => handleClosePaypalConnectModal());
  return (
    <>
      <Head>
        <title>Earnings</title>
      </Head>
      {!cantRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Asside */}
          <SettingsLayout>
            <Container />
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <div className="bg-gray-50 dark:bg-gray-800 pt-12 sm:pt-16 shadow sm:rounded-3xl sm:overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                      Earnings
                    </h2>
                    {/* <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus repellat laudantium.
                </p> */}
                  </div>
                </div>
                <div className="mt-10 pb-12 bg-white dark:bg-gray-600 sm:pb-16">
                  <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-gray-50 dark:bg-gray-800"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-4xl mx-auto">
                        <dl className="rounded-lg bg-white dark:bg-gray-700 shadow-lg sm:grid sm:grid-cols-4">
                          <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500 dark:text-gray-100">
                              Net income
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                              ${authReducer?.user?.net_income}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500 dark:text-gray-100">
                              Withdrawn
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                              ${authReducer?.user?.withdrawn}
                            </dd>
                          </div>

                          <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500 dark:text-gray-100">
                              Available funds
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                              $
                              {authReducer?.user?.available_for_withdrawal
                                ? authReducer?.user?.available_for_withdrawal
                                : "0.00"}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500 dark:text-gray-100">
                              Pending clearance
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600 dark:text-orange-500">
                              $
                              {authReducer?.user?.pending_clearance
                                ? authReducer?.user?.pending_clearance
                                : "0.00"}
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="#" method="POST">
                <div className="shadow sm:rounded-3xl sm:overflow-hidden">
                  <div className="bg-white dark:bg-gray-700 py-6 px-4 space-y-6 sm:p-6">
                    {/* <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Plan
                  </h3>
                </div> */}

                    <div>
                      <div className="max-w-md mx-auto lg:max-w-5xl">
                        <div className="rounded-lg bg-gray-100 dark:bg-gray-800 px-6 py-8 sm:p-10 lg:flex lg:items-center">
                          <div className="flex-1">
                            <div>
                              <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                                Withdrawn your money
                              </h3>
                            </div>

                            {!authReducer?.user?.paypal_email && (
                              <div className="mt-4 text-sm text-gray-600 dark:text-gray-200">
                                Connect to PayPal to withdraw your money
                              </div>
                            )}
                          </div>
                          <div className="mt-6 lg:mt-0 lg:ml-10 lg:flex-shrink-0">
                            {/* <Link href="/settings/billing-information">
                                <a
                                  href="#"
                                  className="block w-full text-center rounded-lg border border-transparent bg-orange-600 px-6 py-4 text-xl leading-6 font-medium text-white hover:bg-orange-700"
                                  aria-describedby="tier-growth"
                                >
                                  Start your trial
                                </a>
                              </Link> */}

                            {authReducer.stripe_connecting ? (
                              <>
                                <span className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-3xl text-white bg-orange-600  hover:bg-orange-700">
                                  <Spinner />
                                </span>
                              </>
                            ) : (
                              <>
                                {authReducer?.user?.paypal_email ? (
                                  <>
                                    <span
                                      onClick={handleToggleWithdrawFunds}
                                      className="cursor-pointer  flex items-center justify-center border-gray-300 shadow-sm bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50  px-5 py-3 border border-transparent rounded-3xl"
                                    >
                                      <img
                                        src="/static/images/paypal-logo.png"
                                        className="w-6 h-6 mr-2"
                                      />
                                      Withdrawn
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      onClick={handleTogglePaypalConnectForm}
                                      className="cursor-pointer  flex items-center justify-center border-gray-300 shadow-sm bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50  px-5 py-3 border border-transparent rounded-3xl"
                                    >
                                      <img
                                        src="/static/images/paypal-logo.png"
                                        className="w-6 h-6 mr-2"
                                      />
                                      Connect with PayPal
                                    </span>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="bg-orange-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Save
                </button>
              </div> */}
                </div>
              </form>
              <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
                <EarningsHistory />
              </div>
            </div>
          </SettingsLayout>
          <WithdrawFundsModal
            openWithdrawFunds={openWithdrawFunds}
            withdrawFundsRef={withdrawFundsRef}
            handleCloseWithdrawFunds={handleCloseWithdrawFunds}
          />
          <PaypalConnectModal
            paypalConnectModalRef={paypalConnectModalRef}
            openPaypalConnectModal={openPaypalConnectModal}
            handleClosePaypalConnectModal={handleClosePaypalConnectModal}
          />
        </>
      )}
    </>
  );
};

export default earnings;
