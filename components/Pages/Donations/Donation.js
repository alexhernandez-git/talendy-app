import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";
const Donation = ({ donation }) => {
  console.log(donation);
  return (
    <li>
      <div className="relative py-4">
        <div className="relative flex items-start space-x-3">
          <div className="relative">
            {donation?.donation_user?.picture ? (
              <img
                className="h-10 w-10 rounded-full flex items-center justify-center"
                src={
                  new RegExp(
                    `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                  ).test(donation?.donation_user?.picture)
                    ? donation?.donation_user?.picture
                    : process.env.HOST + donation?.donation_user?.picture
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
          </div>
          <div className="min-w-0 flex-1">
            <div>
              <div className="text-sm">
                <Link href={`/user/${donation?.donation_user?.id}`}>
                  <span className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    {donation?.donation_user?.username}
                  </span>
                </Link>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-100 flex items-end">
                <span>
                  {moment(donation?.created).subtract(1, "seconds").fromNow()}
                </span>
              </p>
            </div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-50 break-all whitespace-pre-line">
              <p>{donation?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Donation;
