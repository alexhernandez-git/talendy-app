import Link from "next/link";
import React from "react";
import StarRatings from "react-star-ratings";
import moment from "moment";
const Review = ({ review }) => {
  console.log(review);
  return (
    <li>
      <div className="relative py-4">
        <div className="relative flex items-start space-x-3">
          <div className="relative">
            {review?.review_user?.picture ? (
              <img
                className="h-10 w-10 rounded-full flex items-center justify-center"
                src={
                  new RegExp(
                    `${process.env.HOST}|https://freelanium.s3.amazonaws.com`
                  ).test(review?.review_user?.picture)
                    ? review?.review_user?.picture
                    : process.env.HOST + review?.review_user?.picture
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
                <Link href={`/user/${review?.review_user?.id}`}>
                  <span className="font-medium text-gray-900 dark:text-white cursor-pointer">
                    {review?.review_user?.username}
                  </span>
                </Link>
              </div>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-100 flex items-end">
                {review?.rating && (
                  <div className="mr-2" style={{ marginBottom: "1.5px" }}>
                    <StarRatings
                      rating={review.rating}
                      starRatedColor="#e5c07b"
                      numberOfStars={5}
                      starHoverColor="#e5c07b"
                      starDimension="15px"
                      starSpacing="0px"
                      name="rating"
                    />
                  </div>
                )}
                <span>
                  {moment(review?.created).subtract(1, "seconds").fromNow()}
                </span>
              </p>
            </div>
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-50 break-all whitespace-pre-line">
              <p>{review?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Review;
