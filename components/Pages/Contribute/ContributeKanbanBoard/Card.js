import React from "react";
import { Draggable } from "react-beautiful-dnd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useRef } from "react";
import { setEndOfContenteditable } from "helpers";
import { useEffect } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import { useDispatch } from "react-redux";
import { deleteCard, updateCard } from "redux/actions/kanban";
import { useSelector } from "react-redux";
const Card = ({ listID, title, id, index, socketRef, roomID }) => {
  const textareaRef = useRef();
  const dispatch = useDispatch();
  const { collaborate_room } = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const { access_token } = useSelector((state) => state.authReducer);

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
      dispatch(updateCard({ listID: listID, values: values, cardID: id }));
      socketRef.current.emit("update card", {
        listID: listID,
        values: values,
        cardID: id,
        roomID: roomID,
        token: access_token,
      });
    },
  });
  const handleFocus = (event) => event.target.select();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleModalClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleModalClose());
  const handleDeleteCard = () => {
    dispatch(deleteCard({ listID: listID, cardID: id }));
    socketRef.current.emit("delete card", {
      listID: listID,
      cardID: id,
      roomID: roomID,
      token: access_token,
    });
    handleModalClose();
  };
  return (
    <>
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
                      onMouseDown={handleModalToggle}
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
      <div
        className={`${
          isModalOpen ? "block" : "hidden"
        } fixed z-30 inset-0 overflow-y-auto`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            ref={modalRef}
            className="inline-block align-bottom bg-white dark:bg-gray-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                    id="modal-headline"
                  >
                    Remove card
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      The card data will be removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleDeleteCard}
                type="button"
                className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Remove
              </button>
              <button
                onClick={handleModalClose}
                type="button"
                className="mt-3 inline-flex justify-center rounded-3xl border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 sm:mt-0 sm:col-start-1 sm:text-sm bg-white dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
