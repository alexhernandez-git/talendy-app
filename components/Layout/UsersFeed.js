import React from "react";
import Post from "components/Layout/Post";
import Link from "next/link";
import User from "components/Layout/User";
import Invitation from "components/Pages/MyNetwork/Invitation";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
import HomeMenu from "components/Pages/Index/HomeMenu";
import TopKarmaCoinsUser from "components/Pages/Index/TopKarmaUser";
import { CONNECTIONS_PAGE, MY_NETWORK_PAGE, PEOPLE_I_FOLLOW_PAGE } from "pages";
const Feed = ({ page, profile }) => {
  return (
    <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      {profile ? <ProfileMenu page={page} /> : <HomeMenu page={page} />}
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
      {(page === PEOPLE_I_FOLLOW_PAGE || page === CONNECTIONS_PAGE) && (
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
