import Layout from "components/Layout/Layout";
import PostsFeed from "components/Layout/PostsFeed";
import LeftSidebar from "components/Pages/HelpedIn/LeftSidebar";
import ProfileCard from "components/Pages/Profile/UserCard";
import { CONTRIBUTED_PAGE } from "pages";
import useAuthRequired from "hooks/useAuthRequired";
import Spinner from "components/Layout/Spinner";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";

export default function Posts() {
  const page = CONTRIBUTED_PAGE;

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
          <ProfileCard mobile page={page} profile user={authReducer.user} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <ProfileMenu page={page} />
            <PostsFeed page={page} />
          </main>
          <ProfileCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
