import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import LeftSidebar from "components/Pages/HelpedIn/LeftSidebar";
import UserCard from "components/Pages/Profile/UserCard";
import { CLOSED_CONTRIBUTED } from "pages";
import useAuthRequired from "hooks/useAuthRequired";
import Spinner from "components/Layout/Spinner";
// import LeftSidebar from "components/Pages/Index/LeftSidebar";
// import Feed from "components/Pages/Index/Feed";
// import RightSidebar from "components/Pages/Index/RightSidebar";

export default function Posts() {
  const page = CLOSED_CONTRIBUTED;

  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  return !canRender ? (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <Spinner />
    </div>
  ) : (
    <Layout>
      <div className="py-10 ">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <UserCard mobile page={page} profile user={authReducer.user} />

          <Feed page={page} profile />
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
