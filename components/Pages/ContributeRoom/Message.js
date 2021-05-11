import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message, myMessage }) => {
  const roomMessagesReducer = useSelector((state) => state.roomMessagesReducer);
  const messageIndex = roomMessagesReducer.messages.results.indexOf(message);
  const previous_message =
    roomMessagesReducer.messages.results[messageIndex - 1];
  const next_message = roomMessagesReducer.messages.results[messageIndex + 1];
  let previous_same_user_created = false;
  if (previous_message) {
    previous_same_user_created =
      previous_message?.sent_by?.id === message?.sent_by?.id;
  }
  let next_same_user_created = false;
  if (next_message) {
    next_same_user_created = next_message?.sent_by?.id === message?.sent_by?.id;
  }
  return (
    <li className="">
      <div className={`${myMessage ? "float-right " : "float-left "}  w-11/12`}>
        <div
          className={`flex items-center ${
            myMessage ? "justify-end " : "justify-start"
          }`}
        >
          {!myMessage && (
            <>
              {!next_same_user_created ? (
                <a
                  className="flex-shrink-0 mr-3 cursor-pointer"
                  href={`/user/${message?.sent_by?.id}`}
                  target="_blank"
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
                </a>
              ) : (
                <div className="w-14 block"></div>
              )}
            </>
          )}
          <div className="w-full mt-4 ">
            {!myMessage && !next_same_user_created && (
              <div className="mb-2">
                <a
                  href={`/user/${message?.sent_by?.id}`}
                  target="_blank"
                  className="text-gray-500 dark:text-gray-200 text-xs"
                >
                  {message?.sent_by?.username}
                </a>
              </div>
            )}
            <div
              className={`${
                myMessage
                  ? "bg-gray-200 dark:bg-gray-600 dark:text-gray-100"
                  : " bg-white dark:bg-gray-700 dark:text-gray-100"
              } text-sm p-3 shadow rounded-lg w-full`}
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
      </div>
    </li>
  );
};

export default Message;
