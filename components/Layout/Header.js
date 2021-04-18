import useOutsideClick from "hooks/useOutsideClick";
import React, { useRef, useState } from "react";
import { Transition } from "@tailwindui/react";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { HOME_PAGE, SEARCH_USERS_PAGE } from "pages";
import Login from "./Login";
import { useSelector } from "react-redux";
import { logout } from "redux/actions/user";
import { useDispatch } from "react-redux";
const Header = ({
  handleToggleMessages,
  handleOpenModal,
  page,
  handleToggleRegister,
}) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleOpenMenu = () => {
    setMenuOpen(true);
  };
  const handleCloseMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };
  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const menuRef = useRef();
  useOutsideClick(menuRef, () => handleCloseMenu());

  const router = useRouter();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      search: router?.query?.search ? router.query.search : "",
    },
    validationSchema: Yup.object({
      search: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      if (page == SEARCH_USERS_PAGE) {
        router.push(`/search/users/${values.search}`);
        return;
      }
      router.push(`/search/${values.search}`);
    },
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };
  const handleCloseMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const mobileMenuRef = useRef();
  useOutsideClick(mobileMenuRef, () => handleCloseMobileMenu());

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const handleOpenNotifications = () => {
    setNotificationsOpen(true);
  };
  const handleCloseNotifications = () => {
    if (notificationsOpen) {
      setNotificationsOpen(false);
    }
  };
  const handleToggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };
  const notificationsRef = useRef();
  useOutsideClick(notificationsRef, () => handleCloseNotifications());

  const [loginOpen, setLoginOpen] = useState(false);
  const handleOpenLogin = () => {
    setLoginOpen(true);
  };
  const handleCloseLogin = () => {
    if (loginOpen) {
      setLoginOpen(false);
    }
  };
  const handleToggleLogin = () => {
    setLoginOpen(!loginOpen);
  };
  const loginRef = useRef();
  useOutsideClick(loginRef, () => handleCloseLogin());

  const [loginMobileOpen, setLoginMobileOpen] = useState(false);
  const handleOpenLoginMobile = () => {
    setLoginMobileOpen(true);
  };
  const handleCloseLoginMobile = () => {
    if (loginMobileOpen) {
      setLoginMobileOpen(false);
    }
  };
  const handleToggleLoginMobile = () => {
    setLoginMobileOpen(!loginMobileOpen);
  };
  const loginMobileRef = useRef();
  useOutsideClick(loginMobileRef, () => handleCloseLoginMobile());

  const userReducer = useSelector((state) => state.userReducer);
  const { user } = userReducer;
  const handleSignOut = () => {
    router.push("/");
    dispatch(logout());
  };
  return (
    <header className="bg-white dark:bg-gray-700 shadow-sm lg:static lg:overflow-y-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
          <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <img
                  className="block h-8 w-auto cursor-pointer"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=orange&shade=500"
                  alt="Workflow"
                />
              </Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
            <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
              <div className="w-full">
                <form onSubmit={formik.handleSubmit}>
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 dark:text-gray-100"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="search"
                      value={formik.values.search}
                      onChange={formik.handleChange}
                      name="search"
                      className="block w-full bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl py-2 pl-10 pr-3 text-sm placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      placeholder="Search"
                      type="text"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
            <button
              type="button"
              onMouseDown={handleToggleMobileMenu}
              className="-mx-2 rounded-3xl p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>

              <svg
                className={`${
                  mobileMenuOpen ? "hidden" : "block"
                } block h-6 w-6`}
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className={`${
                  mobileMenuOpen ? "block" : "hidden"
                } block h-6 w-6`}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {userReducer.is_authenticated ? (
            <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <span
                onClick={handleToggleMessages}
                className="ml-5 cursor-pointer flex-shrink-0 bg-white dark:bg-gray-600 rounded-full p-1 text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
              >
                <span className="sr-only">View Messages</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </span>
              <div className="relative inline-block text-left ">
                <button
                  onMouseDown={handleToggleNotifications}
                  className="ml-5  flex-shrink-0 bg-white dark:bg-gray-600 rounded-full p-1 text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
                >
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="h-6 w-6"
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <Transition
                  show={notificationsOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-out duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {(ref) => (
                    <div ref={notificationsRef}>
                      <div
                        ref={ref}
                        className={`
                   origin-top-right absolute right-0 mt-2 w-80 rounded-3xl shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-40 overflow-hidden`}
                      >
                        <div className="bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 ">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <svg
                                className="h-6 w-6 text-gray-400 dark:text-gray-100"
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
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                Notifications
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="flow-root px-4 max-h-72 overflow-auto">
                            <ul className="divide-y divide-gray-200">
                              <li
                                className={`py-4 hover:opacity-70 cursor-pointer `}
                              >
                                <div className="flex items-center space-x-4">
                                  <div className="flex-shrink-0">
                                    <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                                      <svg
                                        className="h-full w-full text-gray-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                      </svg>
                                    </span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-gray-900 dark:text-white truncate">
                                      efwawef
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-gray-100 truncate">
                                      fewafaweefew
                                    </p>
                                    <p className="float-right text-xs text-gray-400 dark:text-gray-200 truncate">
                                      3s
                                    </p>
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="p-4">
                            <Link href="/profile/notifications">
                              <span className="cursor-pointer w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl  text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50">
                                See all
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </Transition>
              </div>

              <div className="flex-shrink-0 relative ml-5">
                <div>
                  <button
                    onMouseDown={handleToggleMenu}
                    type="button"
                    className="bg-white rounded-full flex"
                    id="user-menu"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>

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
                      <span className="bg-gray-100 rounded-full overflow-hidden h-8 w-8">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
                <Transition
                  show={menuOpen}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-out duration-100"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  {(ref) => (
                    <div ref={menuRef}>
                      <div
                        ref={ref}
                        className=" origin-top-right absolute z-40 right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu"
                      >
                        <span className="text-center py-2 px-4 text-sm text-orange-500 font-bold flex items-center ">
                          <svg
                            className="w-6 h-6 mr-1"
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
                          300 Karma
                        </span>
                        <Link href="/profile/issues" role="menuitem">
                          <span className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Profile
                          </span>
                        </Link>

                        <Link href="/settings" role="menuitem">
                          <span className="block py-2 px-4 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            Settings
                          </span>
                        </Link>

                        <button
                          onClick={handleSignOut}
                          className="w-full text-left block py-2 px-4 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                        <div className="block py-2 px-4 mt-1">
                          <ToggleTheme />
                        </div>
                      </div>
                    </div>
                  )}
                </Transition>
              </div>
              <span
                onClick={handleOpenModal}
                className="cursor-pointer ml-6 inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
              >
                Post
              </span>
            </div>
          ) : (
            <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              <div className="flex-shrink-0 relative flex items-center">
                <ToggleTheme />
              </div>
              <div className="flex-shrink-0 relative ml-5">
                <div>
                  <span
                    onMouseDown={handleToggleLogin}
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    Sign in
                  </span>
                </div>
                <Login
                  loginOpen={loginOpen}
                  loginRef={loginRef}
                  handleClose={handleCloseLogin}
                />
              </div>

              <div className="flex-shrink-0 relative ml-3">
                <div>
                  <span
                    onMouseDown={handleToggleRegister}
                    className="cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                  >
                    Register
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <nav
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } lg:hidden absolute w-full bg-white dark:bg-gray-700 z-30`}
        aria-label="Global"
        ref={mobileMenuRef}
      >
        {userReducer.is_authenticated ? (
          <div className="border-t border-gray-200 pt-4 pb-3">
            <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
              <div className="flex-shrink-0">
                {user && user.picture ? (
                  <img
                    className="h-10 w-10 rounded-full"
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
                  <span className="bg-gray-100 rounded-full overflow-hidden h-10 w-10">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-gray-100">
                  Chelsea Hagon
                </div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-200">
                  chelseahagon@example.com
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleMessages}
                className="ml-auto flex-shrink-0 bg-white dark:bg-gray-600 rounded-full p-1 text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
              >
                <span className="sr-only">View Messages</span>

                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
              <Link href="/notifications">
                <button
                  type="button"
                  className="ml-5 flex-shrink-0 bg-white dark:bg-gray-600 rounded-full p-1 text-gray-400 dark:text-white hover:text-gray-500 dark:hover:text-gray-200"
                >
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="h-6 w-6"
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
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </Link>
            </div>

            <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
              <Link href="/profile/issues" role="menuitem">
                <span className="cursor-pointer block rounded-3xl py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover-text-gray-300">
                  Your Profile
                </span>
              </Link>
              <Link href="/settings" role="menuitem">
                <span className="cursor-pointer block rounded-3xl py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover-text-gray-300">
                  Settings
                </span>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left cursor-pointer block rounded-3xl py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover-text-gray-300"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3">
            <div className="flex-shrink-0 relative mb-3">
              <div>
                <span
                  onMouseDown={handleToggleLoginMobile}
                  className="cursor-pointer w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                >
                  Sign in
                </span>
              </div>
              <Login
                loginOpen={loginMobileOpen}
                loginRef={loginMobileRef}
                handleClose={handleCloseLoginMobile}
                mobile
              />
            </div>
            <div className="flex-shrink-0 relative mb-3">
              <div>
                <span
                  onMouseDown={handleToggleRegister}
                  className="cursor-pointer w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                >
                  Register
                </span>
              </div>
            </div>{" "}
            <div className="flex-shrink-0 relative flex justify-center w-full">
              <ToggleTheme />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
