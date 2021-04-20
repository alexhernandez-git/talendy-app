import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Search/LeftSidebar";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { SEARCH_POSTS_PAGE } from "pages";
import { useState } from "react";
import SearchMenu from "components/Pages/Search/SearchMenu";
import PostsFeed from "components/Layout/PostsFeed";
import Post from "components/Layout/Post";

const SearchPosts = () => {
  const page = SEARCH_POSTS_PAGE;

  return (
    <Layout page={page}>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <SearchMenu page={page} />

            <div>
              <h1 className="sr-only">Recent questions</h1>
              <ul className="space-y-4">
                <Post page={page} />
                <Post page={page} image />
                <Post page={page} />
                <Post page={page} image />
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
