import Layout from "components/Dashboard/Layout";
import { STATISTICS_DASHBOARD_PAGE } from "pages";
import React from "react";

const statistics = () => {
  const page = STATISTICS_DASHBOARD_PAGE;
  return <Layout page={page}></Layout>;
};

export default statistics;
