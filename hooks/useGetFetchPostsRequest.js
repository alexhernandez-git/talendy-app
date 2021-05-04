import {
  FOLLOWED_USERS_POSTS_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
} from "pages";
import React from "react";

const useGetFetchPostsRequest = (page) => {
  switch (page) {
    case HOME_PAGE:
      return { url: "posts", authenticationRequired: false };
    case MOST_KARMA_POSTS_PAGE:
      return {
        url: "posts/list_most_karma_posts",
        authenticationRequired: false,
      };
    case FOLLOWED_USERS_POSTS_PAGE:
      return {
        url: "posts/list_followed_users_posts",
        authenticationRequired: true,
      };
    default:
      return "posts";
  }
};

export default useGetFetchPostsRequest;
