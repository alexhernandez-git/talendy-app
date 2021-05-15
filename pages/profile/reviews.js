import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { PROFILE_REVIEWS_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import ReviewsFeed from "components/Pages/Reviews/ReviewsFeed";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchMoreReviews, fetchReviews } from "redux/actions/reviews";
import Link from "next/link";
import Review from "components/Pages/Reviews/Review";
import useAuthRequired from "hooks/useAuthRequired";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Reviews() {
  const page = PROFILE_REVIEWS_PAGE;
  const router = useRouter();
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  useEffect(() => {
    if (initialDataFetched) {
      dispatch(fetchReviews());
    }
  }, [initialDataFetched]);

  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile user={authReducer.user} />
          {/* <Feed page={page} /> */}
          <ReviewsFeed profile />
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
