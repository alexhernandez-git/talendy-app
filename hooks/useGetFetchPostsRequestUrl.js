import { HOME_PAGE, MOST_KARMA_POSTS_PAGE } from "pages";
import React from "react";

const useGetFetchPostsRequestUrl = (page) => {
  switch (page) {
    case HOME_PAGE:
      return "posts";
    case MOST_KARMA_POSTS_PAGE:
      return "posts/list_most_karma_posts";
    default:
      return "posts";
  }
};

export default useGetFetchPostsRequestUrl;
