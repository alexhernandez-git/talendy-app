import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import UserCard from "components/Pages/Profile/UserCard";
import { REQUESTS_PAGE } from "pages";
import RequestsFeed from "components/Pages/Requests/RequestsFeed";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Requests() {
  const page = REQUESTS_PAGE;
  const authReducer = useSelector((state) => state.authReducer);
  return (
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
