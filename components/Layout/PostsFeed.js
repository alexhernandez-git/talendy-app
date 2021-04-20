import React from "react";
import Post from "./Post";

const PostsFeed = ({ page }) => {
  return (
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
  );
};

export default PostsFeed;
