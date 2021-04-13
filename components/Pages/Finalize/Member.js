import useOutsideClick from "hooks/useOutsideClick";
import Link from "next/link";
import React, { useRef, useState } from "react";
import StarRatings from "react-star-ratings";

const Member = () => {
  const [rating, setRating] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleToggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };
  const handleCloseForm = () => {
    if (isFormOpen) {
      setIsFormOpen(false);
    }
  };

  const formRef = useRef();
  useOutsideClick(formRef, () => handleCloseForm());
  return (
    <li>
      <div class="block ">
        <div
          class="flex items-center px-4 py-4 sm:px-6 cursor-pointer bg-gray-50 dark:bg-gray-700"
          onMouseDown={handleToggleForm}
        >
          <div class="min-w-0 flex-1 flex items-center">
            <div class="flex-shrink-0">
              <img
                class="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixqx=9XbzAMvCeF&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div class="min-w-0 flex-1 px-4 md:grid md:grid-cols-5 md:gap-4">
              <div class="flex items-center">
                <Link href="/user/123">
                  <p class="text-sm font-medium text-gray-500 dark:text-gray-100 truncate rounded-2xl px-3 py-1 hover:underline">
                    Ricardo Cooper
                  </p>
                </Link>
              </div>

              <div class="hidden md:block col-start-4">
                <div>
                  <p class="text-sm text-gray-900 dark:text-white">
                    Applied on{" "}
                    <time datetime="2020-01-07">January 7, 2020</time>
                  </p>
                  <p class="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-100">
                    Completed phone screening
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="sm:flex items-center">
              <div className="flex mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500 dark:text-gray-100"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div className="flex items-center justify-center">
                <span className="text-sm text-gray-500 dark:text-gray-100">
                  Rate
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class={`${
                    isFormOpen ? "hidden" : "block"
                  } h-5 w-5 text-gray-400`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class={`${
                    isFormOpen ? "block" : "hidden"
                  } h-5 w-5 text-gray-400`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isFormOpen ? "block" : "hidden"}`} ref={formRef}>
          <form action="#" method="POST">
            <div class="sm:overflow-hidden">
              <div class="px-4 py-5 bg-white dark:bg-gray-800 space-y-6 sm:p-6">
                <div>
                  <label
                    for="about"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    And if you invite him to a coffee?
                  </label>
                  <div class="mt-1">
                    <Link href="/donation/123">
                      <button
                        type="button"
                        class="bg-gradient-to-r from-green-400 to-green-600 hover:to-green-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-5 w-5 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Donate
                      </button>
                    </Link>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-3 sm:col-span-2">
                    <label
                      for="company_website"
                      class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Rate
                    </label>
                    <div class="mt-1 flex">
                      <StarRatings
                        rating={rating}
                        changeRating={(rating) => setRating(rating)}
                        starRatedColor="#e5c07b"
                        numberOfStars={5}
                        starHoverColor="#e5c07b"
                        starDimension="25px"
                        starSpacing="0px"
                        name="rating"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    for="about"
                    class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Comment
                  </label>
                  <div class="mt-1">
                    <textarea
                      id="about"
                      name="about"
                      rows="3"
                      className="focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-md sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <p class="mt-2 text-sm text-gray-500 dark:text-gray-100">
                    Leave a respectful and constructive comment
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </li>
  );
};

export default Member;