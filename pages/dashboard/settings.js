import Layout from "components/Dashboard/Layout";
import { SETTINGS_DASHBOARD_PAGE } from "pages";
import React from "react";

const settings = () => {
  const page = SETTINGS_DASHBOARD_PAGE;

  return <Layout page={page}></Layout>;
};

export default settings;
