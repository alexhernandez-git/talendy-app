import React from "react";

const Message = ({ myMessage, message }) => {
  return (
    <li>
      <div
        className={`${
          myMessage
            ? "float-right  bg-gray-200 dark:bg-gray-600"
            : "float-left bg-white dark:bg-gray-700"
        }  p-3 shadow rounded-lg mt-4 w-11/12`}
      >
        <div className="text-sm text-gray-600 dark:text-gray-100 break-all ">
          <p>{message?.text}</p>
        </div>
      </div>
    </li>
  );
};

export default Message;
