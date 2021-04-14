import Layout from "components/Layout/Layout";
import Pagination from "components/Layout/Pagination";
import Member from "components/Pages/Finalize/Member";
import Link from "next/link";
import React from "react";

const Finalize = () => {
  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-800 shadow-sm p-3 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto  flex flex-col lg:max-w-7xl lg:grid lg:grid-cols-12 lg:gap-8  sm:px-6 lg:px-8">
          <div className=" sm:flex justify-between w-full items-center col-span-12">
            <Link href="/contribute/123">
              <button className="cursor-pointer w-auto mt-2 sm:mt-0 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm border border-gray-300 text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </Link>
            <button className="cursor-pointer w-full sm:w-auto mt-2 sm:mt-0 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600">
              Finalize Task
            </button>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="shadow overflow-hidden sm:rounded-md col-span-12">
            <ul className="divide-y divide-gray-200">
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
              <Member />
            </ul>
          </div>
          <div className="col-span-12">
            <Pagination next={true} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Finalize;
