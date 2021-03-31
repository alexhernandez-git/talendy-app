import Layout from "components/Layout/Layout";
import PostsFeed from "components/Layout/PostsFeed";
import ProfileCard from "components/Pages/Profile/ProfileCard";
import UsersFeed from "components/Layout/UsersFeed";
import { FOLLOWED_USERS_PAGE } from "pages";
export default function Posts() {
  const page = FOLLOWED_USERS_PAGE;
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <ProfileCard mobile />
          <UsersFeed page={page} profile />
          <ProfileCard />
        </div>
      </div>
    </Layout>
  );
}
