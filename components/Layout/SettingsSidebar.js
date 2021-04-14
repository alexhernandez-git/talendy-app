import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SettingsSidebar = () => {
  const router = useRouter();
  const userReducer = useSelector((state) => state.userReducer);
  return (
    <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
      <nav className="space-y-1">
        <Link href="/settings">
          <a
            className={
              router.pathname === "/settings"
                ? "bg-gray-50 text-orange-700 hover:text-orange-700 dark:text-gray-900 dark:hover:text-gray-900 hover:bg-white group rounded-3xl px-3 py-2 flex items-center text-sm font-medium"
                : "text-gray-900 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-50 group rounded-3xl px-3 py-2 flex items-center text-sm font-medium"
            }
            aria-current="page"
          >
            <svg
              className={
                router.pathname === "/settings"
                  ? "text-orange-500 group-hover:text-orange-500 dark:text-gray-900 dark:group-hover:text-gray-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="truncate">Account</span>
          </a>
        </Link>
        <Link href="/settings/security">
          <a
            className={
              router.pathname === "/settings/security"
                ? "bg-gray-50 text-orange-700 hover:text-orange-700 dark:text-gray-900 dark:hover:text-gray-900 hover:bg-white group rounded-3xl px-3 py-2 flex items-center text-sm font-medium"
                : "text-gray-900 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-50 group rounded-3xl px-3 py-2 flex items-center text-sm font-medium"
            }
          >
            <svg
              className={
                router.pathname === "/settings/security"
                  ? "text-orange-500 group-hover:text-orange-500 dark:text-gray-900 dark:group-hover:text-gray-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
            <span className="truncate">Security</span>
          </a>
        </Link>

        <Link href="/settings/earnings">
          <a
            className={
              router.pathname === "/settings/earnings"
                ? "bg-gray-50 text-orange-700 hover:text-orange-700 dark:text-gray-900 dark:hover:text-gray-900 hover:bg-white group rounded-3xl px-3 py-2 flex items-center text-sm font-medium"
                : "text-gray-900 hover:text-gray-900 dark:text-gray-100 dark:hover:text-gray-900 hover:bg-gray-50 group rounded-3xl px-3 py-2 flex items-center text-sm font-medium"
            }
          >
            <svg
              className={
                router.pathname === "/settings/earnings"
                  ? "text-orange-500 group-hover:text-orange-500 dark:text-gray-900 dark:group-hover:text-gray-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                  : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-900 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
              }
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="truncate">Earnings</span>
          </a>
        </Link>
      </nav>
    </aside>
  );
};

export default SettingsSidebar;
