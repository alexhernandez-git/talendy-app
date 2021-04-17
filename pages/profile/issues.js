import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import ProfileCard from "components/Pages/Profile/UserCard";
import { MY_ISSUES_PAGE } from "pages";
import useAuthRequired from "hooks/useAuthRequired";
import Spinner from "components/Layout/Spinner";

export default function Issues() {
  const page = MY_ISSUES_PAGE;
  const [canRender, userReducer, initialDataFetched] = useAuthRequired(page);
  return !canRender ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>
  ) : (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <ProfileCard mobile page={page} profile user={userReducer.user} />
          <Feed page={page} profile />
          <ProfileCard page={page} profile user={userReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
