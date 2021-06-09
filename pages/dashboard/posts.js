import Layout from "components/Dashboard/Layout";
import { POSTS_DASHBOARD_PAGE } from "pages";
import React from "react";

const posts = () => {
  const page = POSTS_DASHBOARD_PAGE;
  return <Layout page={page}></Layout>;
};

export default posts;
