import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMemberRole } from "redux/actions/members";
import Container from "react-modal-promise";
import useUserConfirmationModal from "hooks/useUserConfirmation";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
import { updateCommunity } from "redux/actions/dashboardCommunities";

const CommunityItem = ({
  community,
  handleSelectCommunity,
  communitiesSelected,
}) => {
  const authReducer = useSelector((state) => state.authReducer);
  const portalReducer = useSelector((state) => state.portalReducer);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const handleOpenEdit = () => {
    setIsEdit(true);
  };

  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    if (isEdit) {
      if (inputRef.current) {
        inputRef.current.select();
      }
    }
  }, [isEdit]);
  const formik = useFormik({
    initialValues: {
      name: community.name,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: async (values) => {
      dispatch(updateCommunity(community.id, values, handleCloseEdit));
    },
  });
  const inputRef = useRef(null);
  const handleBlur = (e) => {
    formik.handleSubmit(e);
  };
  const handleFocus = (event) => event.target.select();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <span class="relative inline-flex items-center bg-white">
          <label for="select-all" class="sr-only">
            Select
          </label>
          <input
            id="select-all"
            onChange={handleSelectCommunity.bind(this, community.id)}
            checked={communitiesSelected.some((id) => id === community.id)}
            type="checkbox"
            name="select-all"
            class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {isEdit ? (
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-1 relative">
              <input
                type="text"
                name="name"
                id="name"
                onChange={formik.handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={formik.values.name}
                ref={inputRef}
                placeholder="Community name"
                autocomplete="given-name"
                className={`appearance-none block w-full border rounded-3xl shadow-sm py-2 px-4 focus:outline-none  sm:text-sm dark:focus:text-white bg-white border-gray-300  text-sm  focus:placeholder-gray-400 focus:text-gray-900 dark:bg-gray-600 ${
                  formik.touched.name && formik.errors.name
                    ? "pr-10 border-red-300 text-red-600   placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 "
                    : " text-sm placeholder-gray-500  dark:placeholder-gray-300 dark:text-white  focus:placeholder-gray-400  focus:ring-orange-500 focus:border-orange-500"
                }`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </form>
        ) : (
          <span className="text-sm text-gray-500">{community.name}</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {isEdit ? (
          <svg
            onClick={handleCloseEdit}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            onClick={handleOpenEdit}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-orange-500 cursor-pointer"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </td>
    </tr>
  );
};

export default CommunityItem;
