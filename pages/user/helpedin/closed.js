import Layout from "components/Layout/Layout";
import PostsFeed from "components/Layout/PostsFeed";
import LeftSidebar from "components/Pages/HelpedIn/LeftSidebar";
import ProfileCard from "components/Pages/Profile/ProfileCard";
import { CLOSED_HELPED_IN_PAGE } from "pages";
// import LeftSidebar from "components/Pages/Index/LeftSidebar";
// import PostsFeed from "components/Pages/Index/PostsFeed";
// import RightSidebar from "components/Pages/Index/RightSidebar";

export default function Posts() {
  const page = CLOSED_HELPED_IN_PAGE;

  return (
    <Layout>
      <div className="py-10 ">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <ProfileCard mobile />

          <PostsFeed page={page} profile />
          <ProfileCard />
        </div>
      </div>
    </Layout>
  );
}
