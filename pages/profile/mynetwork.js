import Layout from "components/Layout/Layout";
import ProfileCard from "components/Pages/Profile/UserCard";
import { MY_NETWORK_PAGE } from "pages";
import LeftSidebar from "components/Pages/MyNetwork/LeftSidebar";
import useAuthRequired from "hooks/useAuthRequired";
import Spinner from "components/Layout/Spinner";
import { useDispatch } from "react-redux";
import { fetchInvitations } from "redux/actions/invitations";
import { useEffect } from "react";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
import Invitation from "components/Pages/MyNetwork/Invitation";
import { useSelector } from "react-redux";
export default function Posts() {
  const page = MY_NETWORK_PAGE;
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  useEffect(() => {
    if (initialDataFetched) {
      dispatch(fetchInvitations());
    }
  }, [initialDataFetched]);
  const invitationsReducer = useSelector((state) => state.invitationsReducer);

  return !canRender ? (
    <div className="flex justify-center items-center h-screen dark:bg-gray-800">
      <Spinner />
    </div>
  ) : (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <ProfileCard mobile page={page} profile user={authReducer.user} />
          <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <ProfileMenu page={page} />
            <div className="mt-4 bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="p-6">
                <h2
                  id="who-to-follow-heading"
                  className="text-base font-medium text-gray-900 dark:text-white"
                >
                  Invitations
                </h2>
                <div className="mt-6 flow-root">
                  {invitationsReducer.invitations.results.length === 0 ? (
                    <span className="text-sm text-gray-500 dark:text-gray-200">
                      You have no inviations
                    </span>
                  ) : (
                    <ul className="-my-4 divide-y divide-gray-200">
                      {invitationsReducer.invitations.results.map(
                        (invitation) => (
                          <Invitation />
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </main>

          <ProfileCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
