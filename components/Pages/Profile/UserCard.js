import Link from "next/link";
import { DONATION_PAGE, PROFILE_DONATIONS_PAGE } from "pages";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { createAlert } from "redux/actions/alerts";
import { getOrCreateChat } from "redux/actions/chats";
import {
  unfollowUser,
  followUser,
  connectUser,
  acceptUserInvitation,
} from "redux/actions/user";

const UserCard = ({ mobile, page, profile, user }) => {
  const dispatch = useDispatch();

  const authReducer = useSelector((state) => state.authReducer);

  const handleFollowUser = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(followUser());
  };
  const handleUnfollowUser = () => {
    dispatch(unfollowUser());
  };
  const handleConnectUser = () => {
    if (!authReducer.is_authenticated) {
      dispatch(createAlert("ERROR", "You are not authenticated"));
      return;
    }
    dispatch(connectUser());
  };

  const handleAcceptInvitation = () => {
    dispatch(acceptUserInvitation());
  };
  const handleGetOrCreateChat = () => {
    dispatch(getOrCreateChat(user?.id));
  };
  const [showReputation, setShowReputation] = useState(false);
  useEffect(() => {
    if (user?.reputation) {
      setShowReputation(true);
    }
  }, [user?.reputation]);

  return (
    <aside
      className={`lg:col-span-4  mb-4 lg:mb-0 ${
        mobile ? "block lg:hidden" : "hidden lg:block"
      }`}
    >
      <div className={""}>
        <section aria-labelledby="who-to-follow-heading" className="mb-4">
          <div className="bg-white rounded-lg shadow relative overflow-hidden">
            <div className="absolute inset-0 h-2/4 bg-gray-500 dark:bg-gray-700"></div>
            <div className="space-y-6 p-6 relative">
              <div className="relative  flex justify-center">
                <div className=" h-40 w-40 rounded-full overflow-hidden xl:w-56 xl:h-56">
                  {/* <img
                    className="mx-auto z-20"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    alt=""
                  /> */}
                  {user && user.picture ? (
                    <img
                      className="h-40 w-40 overflow-hidden xl:w-56 xl:h-56 rounded-full m-auto"
                      src={
                        new RegExp(
                          `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                        ).test(user.picture)
                          ? user.picture
                          : process.env.HOST + user.picture
                      }
                      alt=""
                    ></img>
                  ) : (
                    <span className="bg-gray-100 rounded-full overflow-hidden h-40 w-40  xl:w-56 xl:h-56">
                      <svg
                        className="h-full w-full text-gray-300 bg-gray-100"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                  )}
                  {/* {profile && (
                    <>
                      <div
                        className="absolute m-auto h-40 w-40 rounded-full overflow-hidden xl:w-56 xl:h-56 inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-20 cursor-default"
                        aria-hidden="true"
                      ></div>
                      <div className="absolute m-auto h-40 w-40 rounded-full xl:w-56 xl:h-56 z-30  inset-0 cursor-pointer flex justify-center items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10 text-white"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </>
                  )} */}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium text-center">
                  <Link href={profile ? "/profile/posts" : `/user/${user?.id}`}>
                    <h3 className="mb-3 cursor-pointer">{user?.username}</h3>
                  </Link>
                  <div className=" flex justify-center items-center">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm flex justify-center items-center py-1 px-4 rounded-xl">
                      <svg
                        className="w-6 h-6 mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {user?.karma_amount} Karma
                    </span>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <Link
                      href={
                        profile
                          ? "/profile/reviews"
                          : "/user/reviews/" + user?.id
                      }
                    >
                      <button className="cursor-pointer">
                        {showReputation && (
                          <StarRatings
                            rating={user?.reputation ? user.reputation : 0}
                            starRatedColor="#e5c07b"
                            numberOfStars={5}
                            starHoverColor="#e5c07b"
                            starDimension="15px"
                            starSpacing="0px"
                            name="rating"
                          />
                        )}
                        <span className="text-xs text-gray-500 ml-1">
                          {user?.reviews_count} Reviews
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="sticky top-24">
        {!profile && page !== DONATION_PAGE && (
          <>
            <section aria-labelledby="trending-heading" className="mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    <div className="mb-5 flex justify-center">
                      <span className="text-gray-500 dark:text-gray-300 text-sm">
                        Show your appreciation by leaving a donation
                      </span>
                    </div>
                    <Link href={`/user/donation/${user?.id}`}>
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Donate
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
            <section aria-labelledby="trending-heading" className="mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    {user?.is_followed ? (
                      <button
                        onClick={handleUnfollowUser}
                        type="button"
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleFollowUser}
                        className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        Follow
                      </button>
                    )}
                    {user?.connection_invitation_sent && (
                      <span className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white dark:bg-gray-600 bg-gray-50">
                        Invitation sent
                      </span>
                    )}
                    {user?.accept_invitation && (
                      <button
                        onClick={handleAcceptInvitation}
                        type="button"
                        className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                        </svg>
                        Accept invitation
                      </button>
                    )}
                    {user?.is_connection && (
                      <button
                        onClick={handleGetOrCreateChat}
                        type="button"
                        className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Message
                      </button>
                    )}
                    {!user?.connection_invitation_sent &&
                      !user?.accept_invitation &&
                      !user?.is_connection && (
                        <button
                          onClick={handleConnectUser}
                          type="button"
                          className="mt-2 flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          </svg>
                          Connect
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        <div className={profile ? "sticky top-24" : ""}>
          {profile && page !== PROFILE_DONATIONS_PAGE && (
            <section aria-labelledby="trending-heading" className="mb-4">
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
                <div className="p-6">
                  <div>
                    <Link href={`/profile/donations/`}>
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-3xl shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Donations
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
          <section aria-labelledby="trending-heading" className="mb-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow">
              <div className="p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user?.first_name} {user?.last_name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Posts Contributed
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user?.contributed_posts_count}
                    </dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      About
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {user?.about ? user.about : "No about info"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
};

export default UserCard;
