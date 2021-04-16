import React from "react";
import Message from "components/Pages/Help/Message";
import Editor from "components/Editor/Editor";
const ContributeChat = () => {
  return (
    <section aria-labelledby="notes-title" className=" sticky top-4">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg sm:overflow-hidden">
        <div className=" ">
          <div className="px-4 py-5 sm:px-6">
            <h2 id="notes-title" className="text-lg font-medium  text-white">
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
                  <label htmlFor="comment" className="sr-only">
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
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
  );
};

export default ContributeChat;
