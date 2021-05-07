import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { REQUESTS_PAGE } from "pages";
import RequestsFeed from "components/Pages/Requests/RequestsFeed";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import useAuthRequired from "hooks/useAuthRequired";
import { fetchContributeRequests } from "redux/actions/contributeRequests";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Spinner from "components/Layout/Spinner";

export default function Requests() {
  const page = REQUESTS_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataFetched) {
        await dispatch(fetchContributeRequests());
      }
    };

    fetchInitialData();
  }, [initialDataFetched]);
  return !canRender ? (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <Spinner />
    </div>
  ) : (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile user={authReducer.user} />
          <RequestsFeed />
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
