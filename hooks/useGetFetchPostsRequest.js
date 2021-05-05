import {
  CONTRIBUTED_PAGE,
  ACTIVE_CONTRIBUTED_PAGE,
  SOLVED_CONTRIBUTED_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  HOME_PAGE,
  MOST_KARMA_POSTS_PAGE,
  MY_ACTIVE_POSTS_PAGE,
  MY_POSTS_PAGE,
  MY_SOLVED_POSTS_PAGE,
  SEARCH_POSTS_PAGE,
  USER_CONTRIBUTED_PAGE,
  USER_POSTS_PAGE,
  ACTIVE_USER_POSTS_PAGE,
  SOLVED_USER_POSTS_PAGE,
} from "pages";
import React from "react";

const useGetFetchPostsRequest = (page, user) => {
  switch (page) {
    case HOME_PAGE:
    case SEARCH_POSTS_PAGE:
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
    case CONTRIBUTED_PAGE:
      return {
        url: "posts/list_contributed_posts",
        authenticationRequired: true,
      };
    case ACTIVE_CONTRIBUTED_PAGE:
      return {
        url: "posts/list_contributed_active_posts",
        authenticationRequired: true,
      };
    case SOLVED_CONTRIBUTED_PAGE:
      return {
        url: "posts/list_contributed_solved_posts",
        authenticationRequired: true,
      };
    case USER_CONTRIBUTED_PAGE:
      return {
        url: `posts/${user}/list_user_contributed`,
        authenticationRequired: true,
      };
    case USER_POSTS_PAGE:
      return {
        url: `posts/${user}/list_user_posts`,
        authenticationRequired: false,
      };
    case ACTIVE_USER_POSTS_PAGE:
      return {
        url: `posts/${user}/list_active_user_posts`,
        authenticationRequired: false,
      };
    case SOLVED_USER_POSTS_PAGE:
      return {
        url: `posts/${user}/list_solved_user_posts`,
        authenticationRequired: false,
      };
    default:
      return "posts";
  }
};

export default useGetFetchPostsRequest;
