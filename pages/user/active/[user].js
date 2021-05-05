import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { ACTIVE_USER_POSTS_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "redux/actions/user";
import UserMenu from "components/Pages/User/UserMenu";
import Post from "components/Layout/Post";
import { fetchPosts } from "redux/actions/posts";
import PostsFeed from "components/Layout/PostsFeed";

export default function Profile() {
  const page = ACTIVE_USER_POSTS_PAGE;
  const dispatch = useDispatch();
  const router = useRouter();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    const userId = router.query?.user;
    const fetchInitialData = async () => {
      if (initialDataReducer.data_fetched) {
        await dispatch(fetchUser(userId));

        await dispatch(fetchPosts(page, { user: userId }));
      }
    };
    if (initialDataReducer.data_fetched) {
      fetchInitialData();
    }
  }, [initialDataReducer.data_fetched]);
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} user={userReducer.user} />
          <LeftSidebar page={page} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <UserMenu page={page} />
            <PostsFeed />
          </main>
          <UserCard page={page} user={userReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
