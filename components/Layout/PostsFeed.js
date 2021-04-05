import React from "react";
import Post from "components/Layout/Post";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
import HomeMenu from "components/Pages/Index/HomeMenu";
import { MY_POSTS_PAGE } from "pages";
import HelpRequest from "components/Pages/MyPosts/HelpRequest";
import HelpRequestsFeed from "components/Pages/MyPosts/HelpRequestsFeed";
const PostsFeed = ({ page, profile }) => {
  return (
    <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      {profile ? <ProfileMenu page={page} /> : <HomeMenu page={page} />}
      {page === MY_POSTS_PAGE && <HelpRequestsFeed />}
      <div className="mt-4">
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
    </main>
  );
};

export default PostsFeed;
