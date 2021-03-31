import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";
import OpportunitiesFeed from "components/Pages/Index/OpportunitiesFeed";
import RightSidebar from "components/Pages/Index/RightSidebar";

export default function Home() {
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <LeftSidebar />
          <OpportunitiesFeed />
          <RightSidebar />
        </div>
      </div>
    </Layout>
  );
}
