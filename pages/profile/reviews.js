import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import UserCard from "components/Pages/Profile/UserCard";
import { PROFILE_REVIEWS_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import ReviewsFeed from "components/Pages/Reviews/ReviewsFeed";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function Reviews() {
  const page = PROFILE_REVIEWS_PAGE;
  const router = useRouter();
  const authReducer = useSelector((state) => state.authReducer);
  const handleGoBack = () => {
    router.push("/user/123");
  };
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile user={authReducer.user} />

          <ReviewsFeed />
          {/* <Feed page={page} /> */}
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
