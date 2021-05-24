import React from "react";
import { useDispatch } from "react-redux";
import { fetchChat } from "redux/actions/chat";
import moment from "moment";
import { useSelector } from "react-redux";

const ChatItem = ({ chat }) => {
  const dispatch = useDispatch();
  const handleGetChat = () => {
    dispatch(fetchChat(chat.id));
  };
  const chatReducer = useSelector((state) => state.chatReducer);
  const authReducer = useSelector((state) => state.authReducer);

  moment.locale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: "seconds",
      ss: "%ss",
      m: "a minute",
      mm: "%dm",
      h: "an hour",
      hh: "%dh",
      d: "a day",
      dd: "%dd",
      M: "a month",
      MM: "%dM",
      y: "a year",
      yy: "%dY",
    },
  });
  return (
    <li onClick={handleGetChat}>
      <div className="px-6 py-5 relative">
        <div className="group flex justify-between items-center">
          <span className="-m-1 p-1 block w-full cursor-pointer">
            <div
              className="absolute inset-0 group-hover:bg-gray-50 dark:group-hover:bg-gray-800"
              aria-hidden="true"
            ></div>
            <div className="flex-1 flex items-center min-w-0 relative w-full">
              {chat?.picture ? (
                <img
                  className="h-10 w-10 rounded-full "
                  src={
                    new RegExp(
                      `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                    ).test(chat?.picture)
                      ? chat?.picture
                      : process.env.HOST + chat?.picture
                  }
                  alt=""
                ></img>
              ) : (
                <span
                  className="bg-gray-100 rounded-full overflow-hidden h-10 w-10"
                  style={{ minWidth: "2.5rem" }}
                >
                  <svg
                    className="h-10 w-10 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
              )}
              <div className="ml-4 truncate w-full">
                <div className=" flex justify-between">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {chat?.room_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-200">
                    {moment(chat?.last_message_created)
                      .subtract(1, "seconds")
                      .fromNow()}
                  </p>
                </div>
                <p
                  className={`text-xs text-gray-500 dark:text-gray-200 truncate ${
                    !chat.last_message_seen &&
                    chat.last_message_sent_by !== authReducer.user?.id &&
                    chatReducer.chat?.id !== chat.id &&
                    "font-black"
                  }`}
                >
                  {chat?.last_message}
                </p>
              </div>
            </div>
          </span>
        </div>
      </div>
    </li>
  );
};

export default ChatItem;
