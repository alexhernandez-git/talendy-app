import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

const Member = ({ member }) => {
  const admin = member?.role === "AD";
  const user = member?.user;
  const authReducer = useSelector((state) => state.authReducer);
  return (
    <li className="py-3 flex justify-between items-center">
      <div className="flex items-center w-full">
        {user && user.picture ? (
          <img
            className="h-8 w-8 rounded-full"
            src={
              new RegExp(
                `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
              ).test(user.picture)
                ? user.picture
                : process.env.HOST + user.picture
            }
            alt=""
          ></img>
        ) : (
          <span
            className="bg-gray-100 rounded-full overflow-hidden h-8 w-8"
            style={{ minWidth: "2rem" }}
          >
            <svg
              className="text-gray-300 bg-gray-100 rounded-full h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white flex justify-between w-full">
          <a
            href={`/${
              authReducer.user?.id === user.id ? "profile" : "user"
            }/user/${user?.id}`}
            target="_blank"
          >
            <span className="hover:underline cursor-pointer">
              {user?.username}
            </span>
          </a>
          {admin && (
            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500 to-pink-500 text-white">
              Admin
            </span>
          )}
        </p>
      </div>
    </li>
  );
};

export default Member;
