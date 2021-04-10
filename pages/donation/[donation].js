import Layout from "components/Layout/Layout";
import Feed from "components/Layout/Feed";
import UserCard from "components/Pages/Profile/UserCard";
import { DONATION_PAGE } from "pages";
import LeftSidebar from "components/Pages/User/LeftSidebar";
import DonationForm from "components/Pages/Donation/DonationForm";
import { useRouter } from "next/router";

export default function Donation() {
  const page = DONATION_PAGE;
  const router = useRouter();
  const handleGoBack = () => {
    router.push("/user/123");
  };
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <UserCard mobile page={page} profile />
          <div className="text-gray-500 dark:text-gray-300 text-sm col-span-2 hidden xl:block">
            <span
              className="flex items-center cursor-pointer"
              onClick={handleGoBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>{" "}
              Profile
            </span>
          </div>
          <DonationForm />
          {/* <Feed page={page} /> */}
          <UserCard page={page} />
        </div>
      </div>
    </Layout>
  );
}
