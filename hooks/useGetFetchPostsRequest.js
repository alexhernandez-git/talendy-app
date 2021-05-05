import {
  FOLLOWED_USERS_POSTS_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
  MY_ACTIVE_POSTS_PAGE,
  MY_POSTS_PAGE,
  MY_SOLVED_POSTS_PAGE,
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
    case MY_POSTS_PAGE:
      return {
        url: "posts/list_my_posts",
        authenticationRequired: true,
      };
    case MY_ACTIVE_POSTS_PAGE:
      return {
        url: "posts/list_my_active_posts",
        authenticationRequired: true,
      };
    case MY_SOLVED_POSTS_PAGE:
      return {
        url: "posts/list_my_solved_posts",
        authenticationRequired: true,
      };
    default:
      return "posts";
  }
};

export default useGetFetchPostsRequest;
