import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import UserCard from "components/Pages/Profile/UserCard";
import { REQUESTS_PAGE } from "pages";
import RequestsFeed from "components/Pages/Requests/RequestsFeed";
import { useRouter } from "next/router";

export default function Requests() {
  const page = REQUESTS_PAGE;

  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile />

          <RequestsFeed />
          {/* <Feed page={page} /> */}
          <UserCard page={page} profile />
        </div>
      </div>
    </Layout>
  );
}
