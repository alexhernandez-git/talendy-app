import Layout from "components/Layout/Layout";

import RightSidebar from "components/Pages/Index/TopKarmaUsersSidebar";
import { SEARCH_USERS_PAGE } from "pages";
import { useState } from "react";
import User from "components/Layout/User";
import SearchMenu from "components/Pages/Search/SearchMenu";
import { fetchUsers } from "redux/actions/users";
import { useRouter } from "next/router";
import UsersFeed from "components/Layout/UsersFeed";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useSelector } from "react-redux";

const SearchPosts = () => {
  const page = SEARCH_USERS_PAGE;
  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const usersReducer = useSelector((state) => state.usersReducer);
  const router = useRouter();

  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        await dispatch(fetchTopKarmaUsers());
        await dispatch(
          fetchUsers(
            router?.query?.search?.length > 0 ? router.query.search[0] : ""
          )
        );
      }
    };

    fetchInitialData();
  }, [initialDataReducer.data_fetched, router.query?.search]);
  return (
    <Layout page={page}>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <SearchMenu page={page} />
            <UsersFeed />
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPosts;
