import {
  CONTRIBUTED_POSTS_PAGE,
  ACTIVE_CONTRIBUTED_POSTS_PAGE,
  SOLVED_CONTRIBUTED_POSTS_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  FEED_PAGE,
  MOST_KARMA_POSTS_PAGE,
  MY_ACTIVE_POSTS_PAGE,
  MY_POSTS_PAGE,
  MY_SOLVED_POSTS_PAGE,
  SEARCH_POSTS_PAGE,
  USER_CONTRIBUTED_POSTS_PAGE,
  USER_POSTS_PAGE,
  ACTIVE_USER_POSTS_PAGE,
  SOLVED_USER_POSTS_PAGE,
  USER_CREATED_POSTS_PAGE,
} from "pages";
import React from "react";

const useGetFetchPostsRequest = (page, user) => {
  switch (page) {
    case FEED_PAGE:
    case SEARCH_POSTS_PAGE:
      return "posts";
    case MOST_KARMA_POSTS_PAGE:
      return "posts/list_most_karma_posts";
    case FOLLOWED_USERS_POSTS_PAGE:
      return "posts/list_followed_users_posts";
    case MY_POSTS_PAGE:
      return "posts/list_my_posts";
    case MY_ACTIVE_POSTS_PAGE:
      return "posts/list_my_active_posts";
    case MY_SOLVED_POSTS_PAGE:
      return "posts/list_my_solved_posts";
    case CONTRIBUTED_POSTS_PAGE:
      return "posts/list_contributed_posts";
    case ACTIVE_CONTRIBUTED_POSTS_PAGE:
      return "posts/list_contributed_active_posts";
    case SOLVED_CONTRIBUTED_POSTS_PAGE:
      return "posts/list_contributed_solved_posts";

    case USER_POSTS_PAGE:
      return `posts/${user}/list_user_posts`;
    case USER_CONTRIBUTED_POSTS_PAGE:
      return `posts/${user}/list_user_contributed`;
    case USER_CREATED_POSTS_PAGE:
      return `posts/${user}/list_user_created`;

    default:
      return "posts";
  }
};

export default useGetFetchPostsRequest;
