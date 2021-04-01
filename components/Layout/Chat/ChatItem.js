import React from "react";

const ChatItem = () => {
  return (
    <div className="px-6 py-5 relative">
      <div className="group flex justify-between items-center">
        <span className="-m-1 p-1 block w-full cursor-pointer">
          <div
            className="absolute inset-0 group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
            aria-hidden="true"
          ></div>
          <div className="flex-1 flex items-center min-w-0 relative w-full">
            <span className="flex-shrink-0 inline-block relative">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </span>
            <div className="ml-4 truncate">
              <div className=" flex justify-between">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  Leslie Alexander
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-200">Now</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-200 truncate">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
                sit illum placeat enim quae dolorum ipsa, debitis exercitationem
                tenetur praesentium minima, sapiente provident magnam assumenda
                maxime consectetur, delectus nemo! Quisquam.
              </p>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default ChatItem;
