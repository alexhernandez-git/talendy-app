import Layout from "components/Dashboard/Layout";
import { COMMUNITIES_DASHBOARD_PAGE } from "pages";
import React from "react";

const communities = () => {
  const page = COMMUNITIES_DASHBOARD_PAGE;
  return <Layout page={page}></Layout>;
};

export default communities;
