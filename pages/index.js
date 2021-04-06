import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";
import Feed from "components/Layout/Feed";
import RightSidebar from "components/Pages/Index/RightSidebar";
import { HOME_PAGE } from "pages";
import { useState } from "react";

export default function Home() {
  const page = HOME_PAGE;

  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar page={page} />
          <Feed page={page} />
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
