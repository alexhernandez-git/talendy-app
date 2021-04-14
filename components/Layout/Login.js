import React from "react";
import { Transition } from "@tailwindui/react";

const Login = ({ loginOpen, loginRef, mobile }) => {
  return (
    <Transition
      show={loginOpen}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-out duration-100"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      {(ref) => (
        <div ref={loginRef}>
          <div
            ref={ref}
            className={`origin-top-right absolute z-40 right-0 mt-2 ${
              mobile ? "w-full" : "w-64"
            } ring-opacity-5 py-1 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    {/* <label
                                  for="email"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Email address
                                </label> */}
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autocomplete="email"
                        placeholder="email"
                        className="appearance-none block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-200  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-3xl shadow-sm py-2 px-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    {/* <label
                                  for="password"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Password
                                </label> */}
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autocomplete="current-password"
                        placeholder="Password"
                        className="appearance-none block w-full border bg-white dark:bg-gray-600 border-gray-300  text-sm placeholder-gray-500 dark:placeholder-gray-200  dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 rounded-3xl shadow-sm py-2 px-4 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-orange-600 hover:text-orange-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Login;
