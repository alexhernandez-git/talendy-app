import { useRouter } from "next/router";
import React from "react";

const Message = ({ message, myMessage }) => {
  const router = useRouter();
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  console.log(message);
  const isAdmin = false;
  return (
    <li className="">
      <div className={`${myMessage ? "float-right " : "float-left "}  w-11/12`}>
        <div
          className={`flex items-center ${
            myMessage ? "justify-end " : "justify-start"
          }`}
        >
          {!myMessage && (
            <div
              className="flex-shrink-0 mr-3 cursor-pointer"
              onClick={handleGoToProfile}
            >
              {message?.sent_by?.picture ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    new RegExp(
                      `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                    ).test(message?.sent_by?.picture)
                      ? message?.sent_by?.picture
                      : process.env.HOST + message?.sent_by?.picture
                  }
                  alt=""
                ></img>
              ) : (
                <span className="bg-gray-100 rounded-full overflow-hidden h-10 w-10">
                  <svg
                    className="text-gray-300 bg-gray-100 rounded-full h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
              <div className="w-10"></div>
            </div>
          )}
          <div
            className={`${
              isAdmin
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-gray-100"
                : myMessage
                ? "bg-gray-200 dark:bg-gray-600 dark:text-gray-100"
                : " bg-white dark:bg-gray-700 dark:text-gray-100"
            } text-sm p-3 shadow rounded-lg mt-4 w-full`}
          >
            <p
              className="break-all"
              dangerouslySetInnerHTML={{
                __html: message?.text,
              }}
            ></p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Message;
