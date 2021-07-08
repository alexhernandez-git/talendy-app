import Layout from "components/Layout/Layout";

import UserCard from "components/Pages/Profile/UserCard";
import { PROFILE_DONATIONS_PAGE, PROFILE_REVIEWS_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import ReviewsFeed from "components/Pages/Reviews/ReviewsFeed";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { fetchMoreReviews, fetchReviews } from "redux/actions/donations";
import Link from "next/link";
import Review from "components/Pages/Reviews/Review";
import useAuthRequired from "hooks/useAuthRequired";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Donation from "components/Pages/Donations/Donation";
import Spinner from "components/Layout/Spinner";
import { fetchDonations, fetchMoreDonations } from "redux/actions/donations";
import VisibilitySensor from "react-visibility-sensor";

export default function Donaitons() {
  const page = PROFILE_DONATIONS_PAGE;
  const router = useRouter();
  const dispatch = useDispatch();
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  useEffect(() => {
    const handleFetchData = async () => {
      await dispatch(fetchDonations());
    };
    if (initialDataFetched) {
      handleFetchData();
    }
  }, [initialDataFetched]);
  const donationsReducer = useSelector((state) => state.donationsReducer);
  const initialDataReducer = useSelector((state) => state.initialDataReducer);
  const portalReducer = useSelector((state) => state.portalReducer);
  const { portal } = portalReducer;
  const handleFetchMoreDonations = () => {
    dispatch(fetchMoreDonations());
  };
  const onChangeVisibility = (visible) => {
    if (visible) {
      handleFetchMoreDonations();
    }
  };
  useEffect(() => {
    if (initialDataReducer.data_fetched) {
      if (!portal?.donations_enabled) {
        router.push("/feed");
        return;
      }
    }
  }, [initialDataReducer.data_fetched]);
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile user={authReducer.user} />
          {/* <Feed page={page} /> */}
          <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
            <nav className="flex mb-4 mx-4 sm:mx-auto" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <Link href="/feed">
                      <span className="cursor-pointer text-gray-400 hover:text-gray-500">
                        <svg
                          className="flex-shrink-0 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        <span className="sr-only">Home</span>
                      </span>
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <Link href="/profile/posts">
                      <span className="cursor-pointer ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Profile
                      </span>
                    </Link>
                  </div>
                </li>

                <li>
                  <div className="flex items-center">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span
                      className="ml-4 text-sm font-medium text-orange-500"
                      aria-current="page"
                    >
                      Donations
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg">
              <div className="flow-root">
                {donationsReducer.is_loading && (
                  <div className="flex justify-center space-y-4 w-full mb-4">
                    <Spinner />
                  </div>
                )}
                {donationsReducer.donations.results.length > 0 ? (
                  <ul className="sm:divide-y sm:divide-gray-200">
                    {donationsReducer.donations.results.map((donation) => (
                      <Donation donation={donation} key={donation?.id} />
                    ))}
                  </ul>
                ) : (
                  <div className="flex justify-center">
                    <span className="text-gray-500 dark:text-gray-100 text-sm">
                      No donations found
                    </span>
                  </div>
                )}

                {!donationsReducer.is_fetching_more_donations &&
                  donationsReducer.donations.results.length > 0 &&
                  donationsReducer.donations.next && (
                    <VisibilitySensor onChange={onChangeVisibility}>
                      <div
                        className="p-3 flex justify-center"
                        onClick={handleFetchMoreDonations}
                      >
                        <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                          Load more donations
                        </span>
                      </div>
                    </VisibilitySensor>
                  )}
                {donationsReducer.is_fetching_more_donations && (
                  <div className="flex justify-center space-y-4 w-full mb-4 p-3">
                    <Spinner />
                  </div>
                )}
              </div>
            </div>
          </div>
          <UserCard page={page} profile user={authReducer.user} />
        </div>
      </div>
    </Layout>
  );
}
