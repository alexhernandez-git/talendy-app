import React, { useEffect } from "react";
import HelpRequest from "../MyPosts/HelpRequest";

const RequestsFeed = () => {
  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <div className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg">
        <div class="flow-root">
          <ul class="sm:divide-y sm:divide-gray-200">
            <HelpRequest />
            <HelpRequest />
            <HelpRequest />
            <HelpRequest />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestsFeed;
