import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PaymentMethodInfo = ({
  handleOpenChangePaymentMethod,
  planPaymentMethod,
}) => {
  const authReducer = useSelector((state) => state.authReducer);

  return (
    <section aria-labelledby="payment_details_heading">
      <form action="#" method="POST">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-2">
                <span className="text-sm text-gray-500">Payment method</span>
              </div>

              <div className="col-span-4 sm:col-span-2">
                {console.log(planPaymentMethod)}

                <span className="font-bold">
                  **** **** ****{" "}
                  {planPaymentMethod && planPaymentMethod?.card.last4}
                </span>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              onClick={handleOpenChangePaymentMethod}
              type="button"
              className="inline-flex items-center px-4 py-2  border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Change payment method
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default PaymentMethodInfo;
