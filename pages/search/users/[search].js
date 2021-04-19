import Layout from "components/Layout/Layout";

import Feed from "components/Layout/Feed";
import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { SEARCH_USERS_PAGE } from "pages";
import { useState } from "react";

const SearchPosts = () => {
  const page = SEARCH_USERS_PAGE;

  return (
    <Layout page={page}>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <Feed page={page} />
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPosts;
