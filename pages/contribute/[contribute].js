import React, { useEffect } from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import PostModal from "components/Layout/PostModal";
import Layout from "components/Layout/Layout";
import { HELP_PAGE } from "pages";
import Message from "components/Pages/Help/Message";
import { IconContext } from "react-icons";
import { MdHeadset, MdMic, MdScreenShare } from "react-icons/md";
import { useRouter } from "next/router";
import Editor from "components/Editor/Editor";
import Link from "next/link";
import Member from "components/Pages/Help/Member";

const user = {
  name: "Chelsea Hagon",
  email: "chelseahagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const tabs = [
  { name: "Chat", href: "#", current: true },
  { name: "Shared document", href: "#", current: false },
  { name: "Asteroids", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Help = () => {
  const page = HELP_PAGE;
  const image = true;

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleCloseModal());
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  return (
    <>
      <Layout>
        <div className="py-10">
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <section aria-labelledby="profile-overview-title">
                <div className="rounded-lg bg-white dark:bg-gray-700 shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                    Profile Overview
                  </h2>
                  <div className="bg-white dark:bg-gray-700 p-6 rounded-t-lg">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          {/* <p className="text-sm font-medium text-gray-600">
                            Welcome back,
                          </p> */}
                          <p className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">
                            What would you have done differently if you ran
                            Jurassic Park?
                          </p>
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                            Created at{" "}
                            <time datetime="2020-08-25">August 25, 2020</time>
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 flex justify-center sm:mt-0 flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                        <button
                          onClick={handleOpenModal}
                          type="button"
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
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
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Info
                        </button>
                        <Link href="/finalize/123">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm  text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                          >
                            Finalize
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-t rounded-b-lg border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex justify-between items-center  p-3">
                    <div className="  flex justify-center sm:justify-start sm:mt-0 flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
                      <button
                        onClick={handleOpenModal}
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Chat
                      </button>
                      <button
                        onClick={handleOpenModal}
                        type="button"
                        className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Shared document
                      </button>
                    </div>
                    <div class="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                          id="menu-button"
                          aria-expanded="true"
                          aria-haspopup="true"
                        >
                          More
                          <svg
                            class="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}

                      <ul
                        class="origin-top-right absolute right-0 mt-2 w-72 z-30 rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-800 divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none"
                        tabindex="-1"
                        role="listbox"
                        aria-labelledby="listbox-label"
                        aria-activedescendant="listbox-option-0"
                      >
                        <li
                          class="text-gray-900 dark:text-white cursor-pointer select-none relative p-4 text-sm hover:opacity-70"
                          id="listbox-option-0"
                          role="option"
                        >
                          <div class="flex flex-col">
                            <div class="flex justify-between">
                              <p class="font-normal">Asteroids</p>
                            </div>
                            <p class="text-gray-500 mt-2">
                              Psst.. waiting for someone? Let's shoot some
                              asteroids in the meantime. This game is only
                              loaded for you.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/* <div>
                      <div className="sm:hidden">
                        <label htmlFor="tabs" className="sr-only">
                          Select a tab
                        </label>
                        <select
                          id="tabs"
                          name="tabs"
                          className="block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 dark:border-gray-600 rounded-md"
                          defaultValue={tabs.find((tab) => tab.current).name}
                        >
                          {tabs.map((tab) => (
                            <option key={tab.name}>{tab.name}</option>
                          ))}
                        </select>
                      </div>
                      <div className="hidden sm:block">
                        <nav
                          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                          aria-label="Tabs"
                        >
                          {tabs.map((tab, tabIdx) => (
                            <span
                              key={tab.name}
                              href={tab.href}
                              className={classNames(
                                tab.current
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-500 dark:text-gray-100",
                                tabIdx === 0 ? "rounded-bl-lg" : "",
                                tabIdx === tabs.length - 1
                                  ? "rounded-br-lg"
                                  : "",
                                "cursor-pointer group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-800 py-4 px-4 text-sm font-medium text-center hover:opacity-70 focus:z-10"
                              )}
                              aria-current={tab.current ? "page" : undefined}
                            >
                              <span>{tab.name}</span>
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  tab.current
                                    ? "bg-orange-500"
                                    : "bg-transparent",
                                  "absolute inset-x-0 bottom-0 h-0.5"
                                )}
                              />
                            </span>
                          ))}
                        </nav>

                      </div>
                    </div>*/}
                  </div>
                </div>
              </section>
              <section aria-labelledby="notes-title" className=" sticky top-4">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg sm:overflow-hidden">
                  <div className=" ">
                    <div className="px-4 py-5 sm:px-6">
                      <h2
                        id="notes-title"
                        className="text-lg font-medium  text-white"
                      >
                        Chat
                      </h2>
                    </div>
                    <div className="">
                      <ul className="p-4  overflow-y-auto bg-gray-100 dark:bg-gray-800 flex flex-col-reverse content-container">
                        <Message />
                        <Message myMessage />
                        <Message myMessage />
                        <Message isAdmin />
                        <Message myMessage />
                        <Message myMessage />
                        <Message />
                        <Message myMessage />
                      </ul>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 px-4 py-6 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1 relative">
                        <form onSubmit={(e) => e.preventDefault()}>
                          <div>
                            <label for="comment" className="sr-only">
                              About
                            </label>
                            <Editor chat />
                          </div>
                          <div className="mt-3 sm:flex items-center justify-between">
                            <div className="flex items-center justify-end sm:justify-start">
                              {/* <button
                                type="button"
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                              >
                                <IconContext.Provider
                                  value={{ size: 18, className: "mr-2" }}
                                >
                                  <MdScreenShare />
                                </IconContext.Provider>
                                Screen
                              </button>
                              <button className="inline-flex items-center px-4 py-2 font-medium rounded-3xl text-orange-500 dark:text-gray-100 ">
                                <IconContext.Provider value={{ size: 23 }}>
                                  <MdMic />
                                </IconContext.Provider>
                              </button>
                              <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 ">
                                <IconContext.Provider value={{ size: 23 }}>
                                  <MdHeadset />
                                </IconContext.Provider>
                              </button> */}
                            </div>
                            <div className="mt-4 sm:mt-0 flex items-center justify-end">
                              <button
                                type="button"
                                className="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-orange-500 dark:text-gray-100 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  className="h-5 w-5"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                  ></path>
                                </svg>
                              </button>
                              <button
                                type="submit"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-3xl shadow-sm  text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6  dark:bg-gray-700">
                <h2
                  id="timeline-title"
                  className="text-lg font-medium text-gray-900 dark:text-white"
                >
                  Members
                </h2>

                <div className="mt-3 flow-root">
                  <ul className=" divide-y divide-gray-200 dark:divide-gray-400">
                    <Member admin />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                    <Member />
                  </ul>
                </div>
                {/* <div className="mt-6 flex flex-col justify-stretch">
             
              </div> */}
              </div>
            </section>
          </div>
        </div>
      </Layout>
      <PostModal
        page={page}
        image={image}
        modalOpen={modalOpen}
        handleToggleModal={handleToggleModal}
        handleCloseModal={handleCloseModal}
        modalRef={modalRef}
      />
    </>
  );
};

export default Help;
