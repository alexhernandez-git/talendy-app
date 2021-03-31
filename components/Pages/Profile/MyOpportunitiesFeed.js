import React from "react";
import Opportunity from "components/Pages/Index/OpportunitiesFeed/Oportunity";
const MyOpportunitiesFeed = () => {
  return (
    <main className="lg:col-span-8 xl:col-span-6 xl:col-start-3 order-2 lg:order-1">
      <div className="">
        <h1 className="sr-only">Recent questions</h1>
        <div className="mb-3">
          <h4 className="text-gray-600 dark:text-white">
            Opportunities posted
          </h4>
        </div>
        <ul className="space-y-4">
          <li className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
            <Opportunity myOpportunity />
          </li>
          <li className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg">
            <Opportunity myOpportunity />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default MyOpportunitiesFeed;
