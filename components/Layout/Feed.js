import React from "react";
import Post from "components/Layout/Post";
import UserMenu from "components/Pages/User/UserMenu";
import SearchMenu from "components/Pages/Search/SearchMenu";
import HomeMenu from "components/Pages/Index/HomeMenu";
import {
  MY_POSTS_PAGE,
  SEARCH_POSTS_PAGE,
  SEARCH_USERS_PAGE,
  CONNECTIONS_PAGE,
  MY_NETWORK_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  HOME_PAGE,
  HELPED_IN_PAGE,
  MOST_KARMA_POSTS_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  ACTIVE_HELPED_IN_PAGE,
  CLOSED_HELPED_IN_PAGE,
  PROFILE_PAGE,
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_POSTS_PROFILE_PAGE,
  PROFILE_PORTFOLIO_PAGE,
} from "pages";
import HelpRequest from "components/Pages/MyPosts/HelpRequest";
import HelpRequestsFeed from "components/Pages/MyPosts/HelpRequestsFeed";
import Invitation from "components/Pages/MyNetwork/Invitation";
import User from "./User";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
const Feed = ({ page }) => {
  return (
    <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      {/* Search menu */}
      {(page === SEARCH_POSTS_PAGE || page === SEARCH_USERS_PAGE) && (
        <SearchMenu page={page} />
      )}

      {/* User menu */}
      {(page === MY_POSTS_PAGE ||
        page === HELPED_IN_PAGE ||
        page === ACTIVE_HELPED_IN_PAGE ||
        page === CONNECTIONS_PAGE ||
        page === PEOPLE_I_FOLLOW_PAGE ||
        page === MY_NETWORK_PAGE ||
        page === CLOSED_HELPED_IN_PAGE) && <UserMenu page={page} />}
      {/* Profile menu */}
      {(page === PROFILE_PAGE ||
        page === ACTIVE_POSTS_PROFILE_PAGE ||
        page === CLOSED_POSTS_PROFILE_PAGE ||
        page === PROFILE_PORTFOLIO_PAGE) && <ProfileMenu page={page} />}

      {page === MY_POSTS_PAGE && <HelpRequestsFeed />}

      {(page === HOME_PAGE ||
        page === MY_POSTS_PAGE ||
        page === SEARCH_POSTS_PAGE ||
        page === HELPED_IN_PAGE ||
        page === MOST_KARMA_POSTS_PAGE ||
        page === FOLLOWED_USERS_POSTS_PAGE ||
        page === ACTIVE_HELPED_IN_PAGE ||
        page === CLOSED_HELPED_IN_PAGE ||
        page === PROFILE_PAGE ||
        page === ACTIVE_POSTS_PROFILE_PAGE ||
        page === CLOSED_POSTS_PROFILE_PAGE ||
        page === PROFILE_PORTFOLIO_PAGE) && (
        <div>
          <h1 className="sr-only">Recent questions</h1>
          <ul className="space-y-4">
            <li>
              <Post page={page} />
            </li>
            <li>
              <Post page={page} image />
            </li>
            <li>
              <Post page={page} />
            </li>
            <li>
              <Post page={page} image />
            </li>
          </ul>
        </div>
      )}
      {page === MY_NETWORK_PAGE && (
        <div className="mt-4 bg-white dark:bg-gray-700 rounded-lg shadow">
          <div className="p-6">
            <h2
              id="who-to-follow-heading"
              className="text-base font-medium text-gray-900 dark:text-white"
            >
              Invitations
            </h2>
            <div className="mt-6 flow-root">
              <ul className="-my-4 divide-y divide-gray-200">
                <li>
                  <Invitation />
                </li>
                <li>
                  <Invitation />
                </li>
                <li>
                  <Invitation />
                </li>
                <li>
                  <Invitation />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {(page === PEOPLE_I_FOLLOW_PAGE ||
        page === CONNECTIONS_PAGE ||
        page === SEARCH_USERS_PAGE) && (
        <div className="mt-4">
          <ul className="space-y-4">
            <li>
              <User page={page} />
            </li>
            <li>
              <User page={page} />
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default Feed;
