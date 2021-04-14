import { useRouter } from "next/router";
import React from "react";

const Member = ({ admin }) => {
  const router = useRouter();
  const handleGoToProfile = (e) => {
    e.stopPropagation();
    router.push("/user/123");
  };
  return (
    <li className="py-3 flex justify-between items-center">
      <div className="flex items-center w-full">
        <img
          src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80"
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <p className="ml-4 text-sm font-medium text-gray-900 dark:text-white flex justify-between w-full">
          <span
            onClick={handleGoToProfile}
            className="hover:underline cursor-pointer"
          >
            Aimee Douglas
          </span>
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
