import React from "react";
import Post from "components/Layout/Post";
import Link from "next/link";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
import HomeMenu from "components/Pages/Index/HomeMenu";
const PostsFeed = ({ page, profile }) => {
  return (
    <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      {profile ? <ProfileMenu page={page} /> : <HomeMenu page={page} />}

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
