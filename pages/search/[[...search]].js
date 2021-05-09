import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Search/LeftSidebar";

import RightSidebar from "components/Pages/Feed/TopKarmaUsersSidebar";
import { SEARCH_POSTS_PAGE } from "pages";
import { useState } from "react";
import SearchMenu from "components/Pages/Search/SearchMenu";
import PostsFeed from "components/Layout/PostsFeed";
import Post from "components/Layout/Post";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchPosts } from "redux/actions/posts";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const SearchPosts = () => {
  const page = SEARCH_POSTS_PAGE;

  const dispatch = useDispatch();
  const router = useRouter();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        await dispatch(
          fetchPosts(page, {
            community: authReducer.community,
            search:
              router?.query?.search?.length > 0 ? router.query.search[0] : "",
          })
        );
      }
    };

    fetchInitialData();
  }, [
    initialDataReducer.data_fetched,
    authReducer.community,
    router.query?.search,
  ]);

  return (
    <Layout page={page}>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <SearchMenu page={page} />

            <PostsFeed />
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPosts;
