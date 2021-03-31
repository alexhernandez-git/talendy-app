import React from "react";
import { useRef, useState } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { Transition } from "@tailwindui/react";

const Oportunity = ({ page }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const handleOpenOptions = () => {
    setOptionsOpen(true);
  };
  const handleCloseOptions = () => {
    setOptionsOpen(false);
  };
  const handleToggleOptions = () => {
    setOptionsOpen(!optionsOpen);
  };
  const optionsRef = useRef();
  useOutsideClick(optionsRef, () => handleCloseOptions());
  return (
    <article
      aria-labelledby="question-title-81614"
      className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg"
    >
      <div className="flex items-center justify-between">
        <div className="flex space-x-3 items-center">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
              <a href="#" className="hover:underline">
                Dries Vincent
              </a>
            </p>
            <span className="inline-flex items-center text-sm">
              <svg
                className="h-5 w-5 text-orange-500 mr-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium text-orange-500">10000 Karma</span>
              <span className="sr-only">karmas amount</span>
            </span>
          </div>
        </div>
        <button className="inline-flex items-center space-x-2 text-gray-400 hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-100">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span className="font-medium text-gray-900 dark:text-white">
            Share
          </span>
        </button>
      </div>
    </article>
  );
};

export default Oportunity;
