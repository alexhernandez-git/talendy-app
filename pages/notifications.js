import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";
import Feed from "components/Layout/Feed";
import RightSidebar from "components/Pages/Index/RightSidebar";

const Notifications = () => {
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 xl:col-span-6 xl:col-start-3 bg-gray-100 dark:bg-gray-700 px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <ul class="divide-y divide-gray-200">
              <li class="py-4">
                <div class="flex space-x-3">
                  <img
                    class="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-300">1h</p>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>
              <li class="py-4">
                <div class="flex space-x-3">
                  <img
                    class="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-300">1h</p>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-4">
                <div class="flex space-x-3">
                  <img
                    class="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-300">1h</p>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>

              <li class="py-4">
                <div class="flex space-x-3">
                  <img
                    class="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div class="flex-1 space-y-1">
                    <div class="flex items-center justify-between">
                      <h3 class="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p class="text-sm text-gray-500 dark:text-gray-300">1h</p>
                    </div>
                    <p class="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
