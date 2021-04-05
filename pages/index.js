import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";
import PostsFeed from "components/Layout/PostsFeed";
import RightSidebar from "components/Pages/Index/RightSidebar";
import { HOME_PAGE } from "pages";
import { useState } from "react";

export default function Home() {
  const page = HOME_PAGE;
  const [community, setCommunity] = useState(null);
  const handleSetCommunity = (selectedCommunity) => {
    if (selectedCommunity === community) {
      setCommunity(null);
      return;
    }
    setCommunity(selectedCommunity);
  };
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar
            community={community}
            handleSetCommunity={handleSetCommunity}
          />
          <PostsFeed page={page} />
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
