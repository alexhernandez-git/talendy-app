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
            <img
              className="h-10 w-10 rounded-full flex items-center justify-center"
              src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div>
              <div className="text-sm">
                <Link href="/user/123">
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
            <div className="mt-2 text-sm text-gray-700 dark:text-gray-50">
              <p>{review?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Review;
