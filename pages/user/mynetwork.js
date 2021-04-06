import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import ProfileCard from "components/Pages/Profile/ProfileCard";
import { MY_NETWORK_PAGE } from "pages";
import LeftSidebar from "components/Pages/MyNetwork/LeftSidebar";
export default function Posts() {
  const page = MY_NETWORK_PAGE;
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <ProfileCard mobile />
          <Feed page={page} profile />

          <ProfileCard />
        </div>
      </div>
    </Layout>
  );
}
