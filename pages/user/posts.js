import Layout from "components/Layout/Layout";
import MyOpportunitiesFeed from "components/Pages/Profile/MyOpportunitiesFeed";
import ProfileSidebar from "components/Pages/Profile/ProfileSidebar";
// import LeftSidebar from "components/Pages/Index/LeftSidebar";
// import OpportunitiesFeed from "components/Pages/Index/OpportunitiesFeed";
// import RightSidebar from "components/Pages/Index/RightSidebar";

export default function Posts() {
  return (
    <Layout>
      <div className="py-10 ">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <MyOpportunitiesFeed />
          <ProfileSidebar />
        </div>
      </div>
    </Layout>
  );
}
