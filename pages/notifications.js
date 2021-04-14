import Layout from "components/Layout/Layout";
import LeftSidebar from "components/Pages/Index/LeftSidebar";
import Feed from "components/Layout/Feed";
import RightSidebar from "components/Pages/Index/RightSidebar";

const Notifications = () => {
  return (
    <Layout>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8 xl:col-span-6 xl:col-start-3 bg-white dark:bg-gray-700 px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <ul className="divide-y divide-gray-200">
              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>
              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>

              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      Deployed Workcation (2d89f0c8 in master) to production
                    </p>
                  </div>
                </div>
              </li>

              <li className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        Whitney Francis
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        1h
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
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
