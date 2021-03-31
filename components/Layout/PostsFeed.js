import React from "react";
import Post from "components/Layout/Post";
import Link from "next/link";
import ProfileMenu from "components/Pages/Profile/ProfileMenu";
import IndexMenu from "components/Pages/Index/IndexMenu";
const PostsFeed = ({ page, profile }) => {
  return (
    <main className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      {profile ? <ProfileMenu page={page} /> : <IndexMenu page={page} />}

      <div className="mt-4">
        <h1 className="sr-only">Recent questions</h1>
        <ul className="space-y-4">
          <li>
            <Post page={page} />
          </li>
          <li>
            <Post page={page} />
          </li>
          <li>
            <Post page={page} />
          </li>
          <li>
            <Post page={page} />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default PostsFeed;
