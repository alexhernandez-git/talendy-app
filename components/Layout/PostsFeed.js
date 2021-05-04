import { HOME_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";
import Post from "components/Layout/Post";
import Spinner from "components/Layout/Spinner";
import VisibilitySensor from "react-visibility-sensor";
import { fetchMorePosts, fetchPosts } from "redux/actions/posts";
const PostsFeed = ({ page }) => {
  const postsReducer = useSelector((state) => state.postsReducer);
  return (
    <div>
      <h1 className="sr-only">Posts feed</h1>
      {postsReducer.is_loading && (
        <div className="flex justify-center space-y-4 w-full mb-4">
          <Spinner />
        </div>
      )}
      {postsReducer.posts.results.length > 0 ? (
        <ul className="space-y-4">
          {postsReducer.posts.results.map((post) => (
            <Post page={page} post={post} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center">
          <span className="text-gray-500 dark:text-gray-100 text-sm">
            Not posts found
          </span>
        </div>
      )}

      {!postsReducer.is_fetching_more_posts &&
        postsReducer.posts.results.length > 0 &&
        postsReducer.posts.next && (
          <VisibilitySensor onChange={onChangeVisibility}>
            <div
              className="p-3 flex justify-center"
              onClick={handleFetchMorePosts}
            >
              <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                Load more posts
              </span>
            </div>
          </VisibilitySensor>
        )}
      {postsReducer.is_fetching_more_posts && (
        <div className="flex justify-center space-y-4 w-full mb-4 p-3">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default PostsFeed;
