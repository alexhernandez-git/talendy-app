import React from "react";
import { Transition } from "@tailwindui/react";

import { useRouter } from "next/router";
import Editor from "components/Editor/Editor";

const RegisterModal = ({ registerOpen, registerRef, isEdit }) => {
  const router = useRouter();
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  return (
    <Transition
      show={registerOpen}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      {(refModal) => (
        <div
          ref={refModal}
          className="fixed z-40 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <Transition
              show={registerOpen}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {(ref) => (
                <>
                  <div
                    ref={ref}
                    className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity"
                    aria-hidden="true"
                  ></div>

                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                </>
              )}
            </Transition>
            {/* <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    --> */}

            <section
              ref={registerRef}
              className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-full sm:max-w-md w-full py-8 px-4  sm:px-10"
            >
              <form class="space-y-6" action="#" method="POST">
                <div class="sm:mx-auto sm:w-full sm:max-w-md ">
                  <img
                    class="mx-auto h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-orange-500.svg"
                    alt="Workflow"
                  />
                  <h2 class="mt-3 text-center text-2xl font-extrabold text-gray-900">
                    Join the community
                  </h2>
                </div>
                <div>
                  <div class="mt-1">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="First Name"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <div class="mt-1">
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <div class="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      placeholder="Email"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div class="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autocomplete="current-password"
                      placeholder="Password"
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-3xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                  >
                    Register
                  </button>
                  <div class="pt-5">
                    <p class="text-xs leading-5 text-gray-500">
                      By signing up, you agree to our{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        class="font-medium text-gray-900 hover:underline"
                      >
                        Terms
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy"
                        target="_blank"
                        class="font-medium text-gray-900 hover:underline"
                      >
                        Privacy Policy
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default RegisterModal;
