import Layout from "components/Layout/Layout";
import OpportunitiesFeed from "components/Layout/OpportunitiesFeed";
import ProfileCard from "components/Pages/Profile/ProfileCard";

export default function Posts() {
  const page = "POSTS";
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <ProfileCard mobile />
          <OpportunitiesFeed page={page} profile />
          <ProfileCard />
        </div>
      </div>
    </Layout>
  );
}
