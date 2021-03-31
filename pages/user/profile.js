import Layout from "components/Layout/Layout";
import MyOpportunitiesFeed from "components/Pages/Profile/MyOpportunitiesFeed";
import ProfileSidebar from "components/Pages/Profile/ProfileSidebar";
// import LeftSidebar from "components/Pages/Index/LeftSidebar";
// import OpportunitiesFeed from "components/Pages/Index/OpportunitiesFeed";
// import RightSidebar from "components/Pages/Index/RightSidebar";

export default function Profile() {
  return (
    <Layout>
      <div className="py-10">
        <div className="pb-10">
          <div class="sm:hidden">
            <label for="tabs" class="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              class="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
            >
              <option>My Account</option>

              <option>Company</option>

              <option selected>Team Members</option>

              <option>Billing</option>
            </select>
          </div>
          <div class="hidden sm:block">
            <div class="border-b border-gray-200">
              <nav
                class="-mb-px flex space-x-8 max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 justify-center"
                aria-label="Tabs"
              >
                <a
                  href="#"
                  class="border-orange-400 text-orange-600 dark:text-orange-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                  aria-current="page"
                >
                  Profile
                </a>
                <a
                  href="#"
                  class="border-transparent text-gray-500 dark:text-white hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  My Account
                </a>

                <a
                  href="#"
                  class="border-transparent text-gray-500 dark:text-white hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Company
                </a>

                <a
                  href="#"
                  class="border-transparent text-gray-500 dark:text-white hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                >
                  Billing
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <MyOpportunitiesFeed />
          <ProfileSidebar />
        </div>
      </div>
    </Layout>
  );
}
