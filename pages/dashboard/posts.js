import Layout from "components/Dashboard/Layout";
import { POSTS_DASHBOARD_PAGE } from "pages";
import React from "react";
import Link from "next/link";
import Head from "next/head";
import Spinner from "components/Layout/Spinner";
import useAuthRequired from "hooks/useAuthRequired";
import {
  fetchDahboardPosts,
  fetchDashboardPostsPagination,
} from "redux/actions/dashboardPosts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "components/Layout/Pagination";
import { useState } from "react";
const posts = () => {
  const page = POSTS_DASHBOARD_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  const dashboardPostsReducer = useSelector(
    (state) => state.dashboardPostsReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataFetched) {
        await dispatch(fetchDahboardPosts());
      }
    };

    fetchInitialData();
  }, [initialDataFetched]);
  const handleChangePage = (url) => {
    dispatch(fetchDashboardPostsPagination(url));
  };
  const [search, setSearch] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setFirstLoad(false);
    if (!firstLoad) {
      const timeoutId = setTimeout(() => {
        dispatch(fetchDahboardPosts(search));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);
  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      {!canRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
          <Layout page={page} search={search} setSearch={setSearch}>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
              <div className="mt-8">
                <div className="max-w-6xl mx-auto">
                  {/* Start users table */}
                  <div className="flex flex-col ">
                    <div className="overflow-x-auto">
                      <div className="py-2 align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Name
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Admin
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Members
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  <span className="sr-only">See post</span>
                                </th>
                                {/* 
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th> */}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {/* User item */}
                              {dashboardPostsReducer.posts.results?.length >
                                0 &&
                                dashboardPostsReducer.posts.results.map(
                                  (post) => (
                                    <tr>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm">
                                          {post?.title}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm cursor-pointer text-gray-500 hover:text-gray-600">
                                          {post?.user?.first_name}{" "}
                                          {post?.user?.last_name}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm">
                                          {post?.members_count}
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        {post?.status === "AC" && (
                                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            Active
                                          </span>
                                        )}
                                        {post?.status === "SO" && (
                                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                            Solved
                                          </span>
                                        )}
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <a href="/post/3443" target="_blank">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 text-gray-500"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                          >
                                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                                          </svg>
                                        </a>
                                      </td>
                                    </tr>
                                  )
                                )}
                              {/* End user item */}
                            </tbody>
                          </table>
                        </div>
                        {dashboardPostsReducer.posts &&
                          (dashboardPostsReducer.posts.previous ||
                            dashboardPostsReducer.posts.next) && (
                            <Pagination
                              previous={dashboardPostsReducer.posts.previous}
                              next={dashboardPostsReducer.posts.next}
                              changePage={handleChangePage}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  {/* End users table */}
                </div>
              </div>
            </main>
          </Layout>
        </>
      )}
    </>
  );
};

export default posts;
