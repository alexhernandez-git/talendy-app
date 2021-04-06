import { useRouter } from "next/router";
import React from "react";

const Message = ({ myMessage, isAdmin }) => {
  const router = useRouter();
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/profile/123");
  };
  return (
    <li>
      <div className={`${myMessage ? "float-right " : "float-left "}  w-11/12`}>
        <div className="flex items-end">
          {!myMessage && (
            <div
              class="flex-shrink-0 mr-3 cursor-pointer"
              onClick={handleGoToProfile}
            >
              <img
                class="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=8&amp;w=256&amp;h=256&amp;q=80"
                alt=""
              />
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
            } text-sm p-3 shadow rounded-lg mt-4`}
          >
            <p>
              Nec malesuada sed sit ut aliquet. Cras ac pharetra, sapien purus
              vitae vestibulum auctor faucibus ullamcorper. Leo quam tincidunt
              porttitor neque, velit sed. Tortor mauris ornare ut tellus sed
              aliquet amet venenatis condimentum. Convallis accumsan et nunc
              eleifend.
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Message;
