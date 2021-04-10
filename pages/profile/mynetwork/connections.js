import Layout from "components/Layout/Layout";
import UserCard from "components/Pages/Profile/UserCard";
import Feed from "components/Layout/Feed";
import { CONNECTIONS_PAGE } from "pages";
import LeftSidebar from "components/Pages/MyNetwork/LeftSidebar";
export default function Posts() {
  const page = CONNECTIONS_PAGE;
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <UserCard mobile page={page} profile />
          <Feed page={page} profile />
          <UserCard page={page} profile />
        </div>
      </div>
    </Layout>
  );
}
