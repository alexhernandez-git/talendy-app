import Layout from "components/Layout/Layout";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { SEARCH_USERS_PAGE } from "pages";
import { useState } from "react";
import User from "components/Layout/User";
import SearchMenu from "components/Pages/Search/SearchMenu";

const SearchPosts = () => {
  const page = SEARCH_USERS_PAGE;

  return (
    <Layout page={page}>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <SearchMenu page={page} />
            <div className="mt-4">
              <ul className="space-y-4">
                <User page={page} />
                <User page={page} />
              </ul>
            </div>
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPosts;
