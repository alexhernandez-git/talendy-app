import React, { useEffect } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { IconContext } from "react-icons/lib";
import { FaCoffee, FaPizzaSlice } from "react-icons/fa";
import { GiCroissant } from "react-icons/gi";
import { SiNetflix } from "react-icons/si";
import { useSelector } from "react-redux";
import Review from "./Review";

const ReviewsFeed = () => {
  const userReducer = useSelector((state) => state.userReducer);

  return (
    <div className={`lg:col-span-8 xl:col-span-6 xl:col-start-3`}>
      <div className="bg-white dark:bg-gray-700 px-4 py-6 shadow sm:p-6 sm:rounded-lg">
        <div class="flow-root">
          <ul class="sm:divide-y sm:divide-gray-200">
            <Review />
            <Review />
            <Review />
            <Review />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewsFeed;
