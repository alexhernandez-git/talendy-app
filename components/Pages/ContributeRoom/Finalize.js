import Editor from "components/Editor/Editor";
import Layout from "components/Layout/Layout";
import Pagination from "components/Layout/Pagination";
import Member from "components/Pages/Finalize/Member";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import SolveIssueEditor from "components/Editor/SolveIssueEditor";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  finalizePost,
  updateKarmaWinner,
  updateSolution,
} from "redux/actions/collaborateRoom";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createAlert } from "redux/actions/alerts";
import { useRouter } from "next/router";

const Finalize = ({ handleGoToRoomPage, isFinalizePage }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const collaborateRoomReducer = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const authReducer = useSelector((state) => state.authReducer);
  const { collaborate_room } = collaborateRoomReducer;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      solution: collaborate_room?.draft_solution,
    },
    validationSchema: Yup.object({
      solution: Yup.string().max(2500),
    }),
    onSubmit: async (values) => {
      await dispatch(updateSolution(values));
    },
  });
  const formikKarmaWinner = useFormik({
    enableReinitialize: true,
    initialValues: {
      karma_winner: collaborate_room?.karma_winner,
    },
    validationSchema: Yup.object({
      karma_winner: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      await dispatch(updateKarmaWinner(values));
    },
  });

  const handleChangeKarmaWinner = (id) => {
    if (formikKarmaWinner.values.karma_winner !== id) {
      formikKarmaWinner.setFieldValue("karma_winner", id);
      formikKarmaWinner.handleSubmit();
    }
  };
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (formik?.values?.solution || !firstLoad) {
      if (!firstLoad) {
        const timeoutId = setTimeout(() => {
          formik.handleSubmit();
        }, 500);
        return () => clearTimeout(timeoutId);
      }
      setFirstLoad(false);
    }
  }, [formik?.values?.solution]);
  const handleGoToHome = () => {
    router.push("/feed");
  };
  const handleFinalize = () => {
    if (
      collaborateRoomReducer.collaborate_room?.members?.length > 1 &&
      !collaborateRoomReducer.collaborate_room?.karma_winner
    ) {
      dispatch(createAlert("ERROR", "You need to establish a karma winner"));
      return;
    }
    dispatch(finalizePost(handleGoToHome));
  };
  return (
    <>
      <div
        className="bg-gray-50 dark:bg-gray-800 shadow-sm p-3 lg:sticky z-10"
        style={{ top: "70px" }}
      >
        <div className="max-w-3xl mx-auto  flex flex-col lg:max-w-7xl lg:grid lg:grid-cols-12 lg:gap-8  sm:px-6 lg:px-8">
          <div className=" sm:flex justify-between w-full items-center col-span-12">
            <button
              onClick={handleGoToRoomPage}
              className="cursor-pointer w-auto mt-2 sm:mt-0 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm border border-gray-300 text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={handleFinalize}
              className="cursor-pointer w-full sm:w-auto mt-2 sm:mt-0 inline-flex justify-center items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
            >
              Confirm finalize
            </button>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 flex flex-col lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
          <div className="flex items-center space-x-5 col-span-12 mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {collaborate_room?.title}
              </h3>
              <p className="text-sm font-medium text-gray-500">
                Created at{" "}
                <time dateTime="2020-08-25">
                  {moment(collaborate_room?.created).format(
                    "MMM D [at] h:mm A z"
                  )}
                </time>
              </p>
            </div>
          </div>
          <div className="shadow overflow-hidden sm:rounded-md col-span-12 mb-4 p-4 bg-white dark:bg-gray-700">
            <SolveIssueEditor formik={formik} />
            <div className="mt-3">
              <span className="text-gray-500 dark:text-gray-300 text-sm">
                Help the community by sharing the solution you have found
              </span>
            </div>
          </div>

          <div className="shadow overflow-hidden sm:rounded-md col-span-12">
            <ul className="divide-y divide-gray-200">
              {collaborate_room?.members
                .filter((member) => member.user.id !== authReducer.user?.id)
                .map((member, index) => (
                  <Member
                    handleChangeKarmaWinner={handleChangeKarmaWinner}
                    karma_winner={formikKarmaWinner.values.karma_winner}
                    member={member}
                    first={index === 0 ? true : false}
                    key={member.id}
                    isFinalizePage={isFinalizePage}
                  />
                ))}
            </ul>
          </div>
          {/* <div className="col-span-12">
            <Pagination next={true} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Finalize;
