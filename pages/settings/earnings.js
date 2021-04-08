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

const earnings = () => {
  const router = useRouter();
  const code = router.query.code ? router.query.code : null;
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  const withdrawFundsRef = useRef();
  const [openWithdrawFunds, setOpenWithdrawFunds] = useState(false);
  const handleToggleWithdrawFunds = () => {
    setOpenWithdrawFunds(!openWithdrawFunds);
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
    setOpenPaypalConnectModal(!openPaypalConnectModal);
  };
  const handleClosePaypalConnectModal = () => {
    if (openPaypalConnectModal) {
      setOpenPaypalConnectModal(false);
    }
  };
  useOutsideClick(paypalConnectModalRef, () => handleClosePaypalConnectModal());
  const cantRender = true;
  return (
    <>
      <Head>
        <title>Earnings</title>
      </Head>
      {!cantRender ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Asside */}
          <SettingsLayout>
            <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
              <div className="bg-gray-50 pt-12 sm:pt-16 shadow sm:rounded-md sm:overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                      Earnings
                    </h2>
                    {/* <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Repellendus repellat laudantium.
                </p> */}
                  </div>
                </div>
                <div className="mt-10 pb-12 bg-white sm:pb-16">
                  <div className="relative">
                    <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <div className="max-w-4xl mx-auto">
                        <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-5">
                          <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500">
                              Net income
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600">
                              ${userReducer?.user?.net_income}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500">
                              Withdrawn
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600">
                              ${userReducer?.user?.withdrawn}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500">
                              Used for purchases
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600">
                              ${userReducer?.user?.used_for_purchases}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500">
                              Available funds
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600">
                              $
                              {userReducer?.user?.available_for_withdrawal
                                ? userReducer?.user?.available_for_withdrawal
                                : "0.00"}
                            </dd>
                          </div>
                          <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 text-sm leading-6 font-medium text-gray-500">
                              Pending clearance
                            </dt>
                            <dd className="order-1 text-3xl font-extrabold text-orange-600">
                              $
                              {userReducer?.user?.pending_clearance
                                ? userReducer?.user?.pending_clearance
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
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                    {/* <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Plan
                  </h3>
                </div> */}

                    <div>
                      <div className="max-w-md mx-auto lg:max-w-5xl">
                        <div className="rounded-lg bg-gray-100 px-6 py-8 sm:p-10 lg:flex lg:items-center">
                          <div className="flex-1">
                            <div>
                              <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-white text-gray-800">
                                Withdrawn your money
                              </h3>
                            </div>

                            {!userReducer?.user?.paypal_email && (
                              <div className="mt-4 text-sm text-gray-600">
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

                            {userReducer.stripe_connecting ? (
                              <>
                                <span className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600  hover:bg-orange-700">
                                  <Spinner />
                                </span>
                              </>
                            ) : (
                              <>
                                {userReducer?.user?.paypal_email ? (
                                  <>
                                    <span
                                      onMouseDown={handleToggleWithdrawFunds}
                                      className="cursor-pointer  flex items-center justify-center border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50  px-5 py-3 border border-transparent rounded-md"
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
                                      onMouseDown={
                                        handleTogglePaypalConnectForm
                                      }
                                      className="cursor-pointer  flex items-center justify-center border-gray-300 shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-50  px-5 py-3 border border-transparent rounded-md"
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
                  className="bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
