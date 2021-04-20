import Layout from "components/Layout/Layout";

import ProfileCard from "components/Pages/Profile/UserCard";
import { USER_CONTRIBUTED } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import { fetchUser } from "redux/actions/user";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserMenu from "components/Pages/User/UserMenu";
import Post from "components/Layout/Post";

export default function Profile() {
  const page = USER_CONTRIBUTED;

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
          <ProfileCard mobile page={page} user={userReducer.user} />
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
          <ProfileCard page={page} user={userReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
