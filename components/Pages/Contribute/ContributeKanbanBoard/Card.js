import React from "react";
import { Draggable } from "react-beautiful-dnd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRef } from "react";
import { setEndOfContenteditable } from "helpers";
import { useEffect } from "react";
const Card = ({ title, id, index }) => {
  const textareaRef = useRef();

  const [isEditTitle, setIsEditTitle] = useState(false);
  const handleOpenEditTitle = () => {
    setIsEditTitle(true);
  };
  const handleCloseEditTitle = () => {
    setIsEditTitle(false);
  };
  const handleBlur = (e) => {
    formik.handleSubmit();
    handleCloseEditTitle();
    formik.handleBlur(e);
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(
        255,
        "Title must not be more than 255 characters"
      ),
    }),
    onSubmit: async (values) => {
      handleCloseEditTitle();
      console.log(values);
    },
  });
  const handleFocus = (event) => event.target.select();
  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="mb-3 bg-white dark:bg-gray-800 rounded-md shadow p-4 relative group"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          {!isEditTitle && (
            <div className="absolute right-3 top-3">
              <div className=" flex items-center opacity-0 group-hover:opacity-100 text-gray-600 dark:text-gray-200 transition bg-gray-100 dark:bg-gray-700 p-1 rounded">
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleOpenEditTitle}
                    className="cursor-pointer h-5 w-5 mr-2 "
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer h-5 w-5 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              </div>
            </div>
          )}
          <div>
            <div>
              {isEditTitle ? (
                <form onSubmit={formik.handleSubmit} className="py-4 w-full ">
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600 dark:text-gray-100 dark:focus-within:text-gray-200 ">
                    <TextareaAutosize
                      value={formik.values.title}
                      name="title"
                      autoFocus
                      onFocus={handleFocus}
                      onChange={formik.handleChange}
                      onBlur={handleBlur}
                      className="focus:ring-orange-500 focus:border-orange-500 flex-grow block w-full min-w-0 rounded-lg sm:text-sm border-gray-300 dark:bg-gray-600 dark:text-white dark:placeholder-gray-100"
                      style={{
                        resize: "none",
                      }}
                    />
                    <div className="mt-2 flex justify-end">
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600 text-white px-2 rounded-md cursor-pointer "
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="ml-2 cursor-pointer"
                        onClick={handleCloseEditTitle}
                      >
                        close
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <span
                  gutterBottom
                  className="text-gray-600 dark:text-gray-200 whitespace-pre-line block break-all text-sm"
                >
                  {title}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
