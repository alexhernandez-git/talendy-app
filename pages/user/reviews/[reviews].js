import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { REVIEWS_PAGE } from "pages";
import ReviewsFeed from "components/Pages/Reviews/ReviewsFeed";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "redux/actions/user";

export default function Reviews() {
  const page = REVIEWS_PAGE;

  const dispatch = useDispatch();
  const router = useRouter();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (initialDataReducer.initial_data_fetched) {
      const userId = router.query?.user;
      dispatch(fetchUser(userId));
    }
  }, [initialDataReducer.initial_data_fetched, authReducer.is_authenticated]);
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} user={userReducer.user} />

          <ReviewsFeed />
          {/* <Feed page={page} /> */}
          <UserCard page={page} user={userReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
