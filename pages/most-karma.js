import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";
import Feed from "components/Layout/Feed";
import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { MOST_KARMA_POSTS_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";

export default function MostKarma() {
  const page = MOST_KARMA_POSTS_PAGE;
  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);

  useEffect(() => {
    if (initialDataReducer.initial_data_fetched) {
      dispatch(fetchTopKarmaUsers());
    }
  }, [initialDataReducer.initial_data_fetched]);
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <Feed page={page} />
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
