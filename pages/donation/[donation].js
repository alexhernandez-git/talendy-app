import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import UserCard from "components/Pages/Profile/UserCard";
import { DONATION_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import DonationForm from "components/Pages/Donation/DonationForm";

export default function Donation() {
  const page = DONATION_PAGE;
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile />
          <DonationForm />
          {/* <Feed page={page} /> */}
          <UserCard page={page} />
        </div>
      </div>
    </Layout>
  );
}
