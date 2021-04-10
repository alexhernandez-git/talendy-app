import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import LeftSidebar from "components/Pages/HelpedIn/LeftSidebar";
import UserCard from "components/Pages/Profile/UserCard";
import { ACTIVE_HELPED_IN_PAGE } from "pages";
// import LeftSidebar from "components/Pages/Index/LeftSidebar";
// import Feed from "components/Pages/Index/Feed";
// import RightSidebar from "components/Pages/Index/RightSidebar";

export default function Posts() {
  const page = ACTIVE_HELPED_IN_PAGE;

  return (
    <Layout>
      <div className="py-10 ">
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
