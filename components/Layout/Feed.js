import React from "react";
import Post from "components/Layout/Post";
import UserMenu from "components/Pages/Profile/ProfileMenu";
import SearchMenu from "components/Pages/Search/SearchMenu";
import {
  MY_POSTS_PAGE,
  SEARCH_POSTS_PAGE,
  SEARCH_USERS_PAGE,
  CONNECTIONS_PAGE,
  MY_NETWORK_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  HOME_PAGE,
  CONTRIBUTED_PAGE,
  MOST_KARMA_POSTS_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  ACTIVE_CONTRIBUTED,
  CLOSED_CONTRIBUTED,
  PROFILE_PAGE,
  ACTIVE_POSTS_PROFILE_PAGE,
  CLOSED_POSTS_PROFILE_PAGE,
  USER_CONTRIBUTED,
} from "pages";
import HelpRequestsFeed from "components/Pages/MyPosts/ContributeRequestsFeed";
import ProfileMenu from "components/Pages/User/UserMenu";
const Feed = ({ page }) => {
  return (
    <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      {/* Search menu */}
      {(page === SEARCH_POSTS_PAGE || page === SEARCH_USERS_PAGE) && (
        <SearchMenu page={page} />
      )}

      {/* User menu */}
      {(page === MY_POSTS_PAGE ||
        page === CONTRIBUTED_PAGE ||
        page === ACTIVE_CONTRIBUTED ||
        page === CONNECTIONS_PAGE ||
        page === PEOPLE_I_FOLLOW_PAGE ||
        page === MY_NETWORK_PAGE ||
        page === CLOSED_CONTRIBUTED) && <UserMenu page={page} />}
      {/* Profile menu */}
      {(page === PROFILE_PAGE ||
        page === ACTIVE_POSTS_PROFILE_PAGE ||
        page === CLOSED_POSTS_PROFILE_PAGE ||
        page === USER_CONTRIBUTED) && <ProfileMenu page={page} />}

      {page === MY_POSTS_PAGE && <HelpRequestsFeed />}

      {(page === HOME_PAGE ||
        page === MY_POSTS_PAGE ||
        page === SEARCH_POSTS_PAGE ||
        page === CONTRIBUTED_PAGE ||
        page === MOST_KARMA_POSTS_PAGE ||
        page === FOLLOWED_USERS_POSTS_PAGE ||
        page === ACTIVE_CONTRIBUTED ||
        page === CLOSED_CONTRIBUTED ||
        page === PROFILE_PAGE ||
        page === ACTIVE_POSTS_PROFILE_PAGE ||
        page === CLOSED_POSTS_PROFILE_PAGE ||
        page === USER_CONTRIBUTED) && (
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
    </main>
  );
};

export default Feed;
