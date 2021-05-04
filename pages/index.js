import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { HOME_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";
import Post from "components/Layout/Post";
import Spinner from "components/Layout/Spinner";
import VisibilitySensor from "react-visibility-sensor";
import { fetchMorePosts, fetchPosts } from "redux/actions/posts";
export default function Home() {
  const page = HOME_PAGE;

  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const postsReducer = useSelector((state) => state.postsReducer);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        await dispatch(fetchTopKarmaUsers());
        await dispatch(fetchPosts());
      }
    };

    fetchInitialData();
  }, [initialDataReducer.data_fetched]);
  const handleFetchMorePosts = () => {
    dispatch(fetchMorePosts());
  };
  function onChangeVisibility(isVisible) {
    console.log("isVisible", isVisible);
    if (isVisible) handleFetchMorePosts();
  }
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <div>
              <h1 className="sr-only">Recent questions</h1>
              {postsReducer.is_loading && (
                <div className="flex justify-center space-y-4 w-full mb-4">
                  <Spinner />
                </div>
              )}
              {postsReducer.posts.results.length > 0 ? (
                <ul className="space-y-4">
                  {postsReducer.posts.results.map((post) => (
                    <Post page={page} post={post} />
                  ))}
                </ul>
              ) : (
                <div className="flex justify-center">
                  <span className="text-gray-500 dark:text-gray-100 text-sm">
                    Not posts found
                  </span>
                </div>
              )}

              {!postsReducer.is_fetching_more_posts &&
                postsReducer.posts.results.length > 0 &&
                postsReducer.posts.next && (
                  <VisibilitySensor onChange={onChangeVisibility}>
                    <div
                      className="p-3 flex justify-center"
                      onClick={handleFetchMorePosts}
                    >
                      <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                        Load more posts
                      </span>
                    </div>
                  </VisibilitySensor>
                )}
              {postsReducer.is_fetching_more_posts && (
                <div className="flex justify-center space-y-4 w-full mb-4 p-3">
                  <Spinner />
                </div>
              )}
            </div>
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
