import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { HOME_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";
import Post from "components/Layout/Post";

export default function Home() {
  const page = HOME_PAGE;

  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (initialDataReducer.initial_data_fetched) {
      dispatch(fetchTopKarmaUsers());
    }
  }, [initialDataReducer.initial_data_fetched, authReducer.is_authenticated]);
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
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
}
