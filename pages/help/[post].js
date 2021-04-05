import React, { useEffect } from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import PostModal from "components/Layout/PostModal";
import Layout from "components/Layout/Layout";
import { HELP_PAGE } from "pages";
import Message from "components/Pages/Help/Message";

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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  What would you have done differently if you ran Jurassic Park?
                </h3>
                <p className="text-sm font-medium text-gray-500">
                  Created at <time datetime="2020-08-25">August 25, 2020</time>
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <button
                onClick={handleOpenModal}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-orange-500 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
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
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
              >
                Finalize
              </button>
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              <section aria-labelledby="notes-title" className=" sticky top-4">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 dark:bg-gray-700 shadow sm:rounded-lg sm:overflow-hidden">
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
                        <Message />
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
                      <div className="min-w-0 flex-1">
                        <form action="#">
                          <div>
                            <label for="comment" className="sr-only">
                              About
                            </label>
                            <textarea
                              id="comment"
                              name="comment"
                              rows="3"
                              className="resize-none shadow-sm block w-full focus:ring-orange-500 focus:border-orange-500 sm:text-sm border-gray-300 dark:bg-gray-600 dark:placeholder-gray-100 dark:text-white rounded-md"
                              placeholder="Add a note"
                            ></textarea>
                          </div>
                          <div className="mt-3 flex items-center justify-end">
                            <button
                              type="button"
                              class="mr-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-orange-500 dark:text-gray-100 bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                class="h-6 w-6"
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
                              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm  text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                            >
                              Send
                            </button>
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
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Andrea McMillan
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>{" "}
                    <li className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img
                          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
                          alt=""
                          className="w-8 h-8 rounded-full"
                        />
                        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white">
                          Aimee Douglas
                        </p>
                      </div>
                    </li>
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
        modalRef={modalRef}
      />
    </>
  );
};

export default Help;
