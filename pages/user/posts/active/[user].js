import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { ACTIVE_POSTS_PROFILE_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchUser } from "redux/actions/user";
import UserMenu from "components/Pages/User/UserMenu";
import Post from "components/Layout/Post";

export default function Profile() {
  const page = ACTIVE_POSTS_PROFILE_PAGE;
  const dispatch = useDispatch();
  const router = useRouter();
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (initialDataReducer.data_fetched) {
      const userId = router.query?.user;
      dispatch(fetchUser(userId));
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
            <div>
              <h1 className="sr-only">Recent questions</h1>
              <ul className="space-y-4">
                <Post page={page} />
                <Post page={page} image />
                <Post page={page} />
                <Post page={page} image />
              </ul>
            </div>
          </main>
          <UserCard page={page} user={userReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
