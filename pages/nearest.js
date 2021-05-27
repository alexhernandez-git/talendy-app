import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Feed/LeftSidebar";

import RightSidebar from "components/Pages/Feed/TopKarmaUsersSidebar";
import { NEAREST_POSTS_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";
import Post from "components/Layout/Post";
import { fetchPosts } from "redux/actions/posts";
import PostsFeed from "components/Layout/PostsFeed";
import { updateGeolocation } from "redux/actions/auth";
import { createAlert } from "redux/actions/alerts";
export default function Nearest() {
  const page = NEAREST_POSTS_PAGE;
  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const topKarmaUsersReducer = useSelector(
    (state) => state.topKarmaUsersReducer
  );
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        await dispatch(fetchTopKarmaUsers());
        if (authReducer.user?.geolocation) {
          await dispatch(
            fetchPosts(page, {
              community: authReducer.community_filter,
              status: authReducer.status_filter,
            })
          );
        }
      }
    };

    fetchInitialData();
  }, [
    initialDataReducer.data_fetched,
    authReducer.user?.geolocation,
    authReducer.community_filter,
    authReducer.status_filter,
  ]);

  const handleGetGeolocation = () => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(latitude, longitude);
      dispatch(updateGeolocation({ latitude: latitude, longitude: longitude }));
    }

    function error() {
      dispatch(createAlert("INFO", "Allow the geolocation in your browser"));
    }

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("Locating…");
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            {initialDataReducer.data_fetched && (
              <>
                {authReducer.user?.geolocation ? (
                  <PostsFeed />
                ) : (
                  <div className="flex justify-center items-center">
                    <button
                      onClick={handleGetGeolocation}
                      type="button"
                      className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Get geolocation
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
