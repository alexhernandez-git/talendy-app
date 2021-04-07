import Layout from "components/Layout/Layout";
import ProfileCard from "components/Pages/User/UserCard";
import Feed from "components/Layout/Feed";
import { PEOPLE_I_FOLLOW_PAGE } from "pages";
import LeftSidebar from "components/Pages/MyNetwork/LeftSidebar";
export default function Posts() {
  const page = PEOPLE_I_FOLLOW_PAGE;
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <ProfileCard mobile page={page} />
          <Feed page={page} profile />

          <ProfileCard page={page} />
        </div>
      </div>
    </Layout>
  );
}
