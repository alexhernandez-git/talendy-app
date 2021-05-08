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
import Link from "next/link";

const SearchPosts = () => {
  const page = SEARCH_USERS_PAGE;
  const dispatch = useDispatch();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const router = useRouter();

  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        if (firstLoad) {
          await dispatch(fetchTopKarmaUsers());
        }
        await dispatch(
          fetchUsers(
            router?.query?.search?.length > 0 ? router.query.search[0] : ""
          )
        );
        setFirstLoad(false);
      }
    };

    fetchInitialData();
  }, [
    initialDataReducer.data_fetched,
    router.query?.search,
    authReducer.is_authenticated,
  ]);

  return (
    <Layout page={page}>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <nav class="flex mb-4" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-4">
                <li>
                  <div>
                    <Link href="/feed">
                      <span class="cursor-pointer text-gray-400 hover:text-gray-500">
                        <svg
                          class="flex-shrink-0 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span class="sr-only">Home</span>
                      </span>
                    </Link>
                  </div>
                </li>

                <li>
                  <div class="flex items-center">
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      class="ml-4 text-sm font-medium text-orange-500"
                      aria-current="page"
                    >
                      {router.query?.search}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            <SearchMenu page={page} />
            <UsersFeed page={page} />
          </main>
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
};

export default SearchPosts;
