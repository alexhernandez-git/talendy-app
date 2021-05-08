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
import PostsFeed from "components/Layout/PostsFeed";
export default function Home() {
  const page = HOME_PAGE;

  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        await dispatch(fetchTopKarmaUsers());
        await dispatch(fetchPosts(page, { community: authReducer.community }));
      }
    };

    fetchInitialData();
  }, [initialDataReducer.data_fetched, authReducer.community]);

  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8"></div>
      </div>
    </Layout>
  );
}
