import Layout from "components/Layout/Layout";
import UserCard from "components/Pages/Profile/UserCard";

import { CONNECTIONS_PAGE } from "pages";
import LeftSidebar from "components/Pages/MyNetwork/LeftSidebar";
import useAuthRequired from "hooks/useAuthRequired";
import Spinner from "components/Layout/Spinner";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
import User from "components/Layout/User";
import { useEffect } from "react";
import { fetchConnections } from "redux/actions/connections";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export default function Posts() {
  const page = CONNECTIONS_PAGE;
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  useEffect(() => {
    if (initialDataFetched) {
      dispatch(fetchConnections());
    }
  }, [initialDataFetched]);
  const connectionsReducer = useSelector((state) => state.connectionsReducer);
  return !canRender ? (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <Spinner />
    </div>
  ) : (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <UserCard mobile page={page} profile user={authReducer.user} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <ProfileMenu page={page} />
            <LeftSidebar page={page} mobile />

            <div className="mt-4">
              {connectionsReducer.connections.results.length === 0 ? (
                <span className="text-sm text-gray-500 dark:text-gray-200 bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg flex flex-1">
                  You have no connections
                </span>
              ) : (
                <ul className="space-y-4">
                  {connectionsReducer.connections.results.map((connection) => (
                    <User page={page} />
                  ))}
                </ul>
              )}
            </div>
          </main>
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
