import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerInvoces,
  fetchSellerInvocesPagination,
} from "redux/actions/customerInvoices";
import moment from "moment";
import Pagination from "components/Layout/Pagination";
import Spinner from "components/Layout/Spinner";
const BillingHistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSellerInvoces());
  }, []);
  const customerInvoicesReducer = useSelector(
    (state) => state.customerInvoicesReducer
  );
  const handleChangePage = (url) => {
    dispatch(fetchSellerInvocesPagination(url));
  };
  return (
    <section aria-labelledby="billing_history_heading">
      <div className="bg-white pt-6 shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 sm:px-6">
          <h2
            id="billing_history_heading"
            className="text-lg leading-6 font-medium text-gray-900"
          >
            Billing history
          </h2>
        </div>

        <div className="mt-6 flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      {/* <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th> */}
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Currency
                      </th>

                      <th
                        scope="col"
                        className="relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <span className="sr-only">View receipt</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerInvoicesReducer.invoices.results &&
                      customerInvoicesReducer.invoices.results.map(
                        (invoice) => (
                          <tr>
                            {console.log(invoice)}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {moment(invoice.created).format("DD-MM-YYYY")}
                            </td>
                            {/* <td className="max-w-sm px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate">
                            {invoice.lines.data[0].description}
                          </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {invoice.amount_paid}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {invoice.currency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a
                                href={invoice.invoice_pdf}
                                target="_blank"
                                className="text-orange-600 hover:text-orange-900"
                              >
                                Invoice PDF
                              </a>
                            </td>
                          </tr>
                        )
                      )}
                  </tbody>
                </table>
                {!customerInvoicesReducer.invoices.results &&
                  customerInvoicesReducer.is_loading && (
                    <div classNameName="flex justify-center py-3">
                      <Spinner />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {customerInvoicesReducer.invoices &&
        (customerInvoicesReducer.invoices.previous ||
          customerInvoicesReducer.invoices.next) && (
          <Pagination
            previous={customerInvoicesReducer.invoices.previous}
            next={customerInvoicesReducer.invoices.next}
            changePage={handleChangePage}
          />
        )}
    </section>
  );
};

export default BillingHistory;
