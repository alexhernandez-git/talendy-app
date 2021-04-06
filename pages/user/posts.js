import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import ProfileCard from "components/Pages/Profile/ProfileCard";
import { MY_POSTS_PAGE } from "pages";

export default function Posts() {
  const page = MY_POSTS_PAGE;
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <ProfileCard mobile page={page} />
          <Feed page={page} profile />
          <ProfileCard page={page} />
        </div>
      </div>
    </Layout>
  );
}
