import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Feed/LeftSidebar";

import RightSidebar from "components/Pages/Feed/TopKarmaUsersSidebar";
import { FEED_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";
import Post from "components/Layout/Post";
import Spinner from "components/Layout/Spinner";
import VisibilitySensor from "react-visibility-sensor";
import { fetchMorePosts, fetchPosts } from "redux/actions/posts";
import PostsFeed from "components/Layout/PostsFeed";
export default function Home() {
  const page = FEED_PAGE;

  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const topKarmaUsersReducer = useSelector(
    (state) => state.topKarmaUsersReducer
  );
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        if (topKarmaUsersReducer.users.results.length === 0) {
          await dispatch(fetchTopKarmaUsers());
        }
        await dispatch(
          fetchPosts(page, {
            community: authReducer.community_filter,
            status: authReducer.status_filter,
          })
        );
      }
    };

    fetchInitialData();
  }, [
    initialDataReducer.data_fetched,
    authReducer.community_filter,
    authReducer.status_filter,
  ]);

  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <PostsFeed />
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
