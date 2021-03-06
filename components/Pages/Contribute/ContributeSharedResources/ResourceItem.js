import useOutsideClick from "hooks/useOutsideClick";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  FaFileAlt,
  FaFileCsv,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaFolder,
  FaFolderOpen,
} from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { MdDelete, MdEdit, MdFileDownload } from "react-icons/md";
import * as Yup from "yup";
import { useFormik } from "formik";
import { deleteFiles, editFile } from "redux/actions/files";
import { deleteFolders, editFolder } from "redux/actions/folders";
import { useDispatch, useSelector } from "react-redux";
import MoveFolderDropdown from "./MoveFolderDropdown";
const ResourceItem = ({
  is_file = false,
  item,
  is_editing,
  hanldeEnterFolder,
}) => {
  const dispatch = useDispatch();
  const setFileIcon = () => {
    switch (item.name.split(".").pop()) {
      case "docx":
      case "DOCX":
        return <FaFileWord style={{ color: "#4285f4" }} />;
      case "xlsx":
      case "XLSX":
        return <FaFileExcel style={{ color: "#0f9d58" }} />;
      case "PNG":
      case "png":
      case "JPG":
      case "jpg":
      case "JPEG":
      case "jpeg":
        return <FaFileImage style={{ color: "#777" }} />;
      case "csv":
      case "CSV":
        return <FaFileCsv style={{ color: "#0f9d58" }} />;
      case "PPTX":
      case "pptx":
      case "PPT":
      case "ppt":
        return <FaFilePowerpoint style={{ color: "#fd7541" }} />;
      case "PDF":
      case "pdf":
        return <FaFilePdf style={{ color: "#ea4335" }} />;

      default:
        return <FaFileAlt />;
    }
  };
  const [itemOptions, setItemOptions] = useState(false);
  const handleOpenItemOptions = () => {
    setItemOptions(true);
  };
  const handleCloseItemOptions = () => {
    if (itemOptions) {
      setItemOptions(false);
    }
  };
  const handleToggleItemOptions = () => {
    setItemOptions(!itemOptions);
  };
  const itemOptionsRef = useRef();
  useOutsideClick(itemOptionsRef, () => handleCloseItemOptions());
  console.log(is_file);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = () => {
    handleCloseItemOptions();

    setIsModalOpen(!isModalOpen);
  };
  const handleModalClose = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleModalClose());
  const [moveItem, setMoveItem] = useState(false);
  const handleOpenMoveItem = () => {
    handleCloseItemOptions();
    setMoveItem(true);
  };
  const handleCloseMoveItem = () => {
    if (moveItem) {
      setMoveItem(false);
    }
  };
  const handleToggleMoveItem = () => {
    setMoveItem(!moveItem);
  };
  const moveItemRef = useRef();
  useOutsideClick(moveItemRef, () => handleCloseMoveItem());
  const [isEditTitle, setIsEditTitle] = useState(is_editing);
  const handleOpenEditTitle = () => {
    handleCloseItemOptions();
    console.log("entra");
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
      name: item?.name,
    },
    validationSchema: Yup.object({
      name: Yup.string().max(100, "Title must not be more than 100 characters"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      if (is_file) {
        if (item.name != values.name) {
          dispatch(
            editFile({
              id: item.id,
              name: values.name,
            })
          );
        }
      } else {
        if (item.name != values.name) {
          dispatch(
            editFolder({
              id: item.id,
              name: values.name,
            })
          );
        }
      }
      handleCloseEditTitle();
    },
  });
  const handleDeleteItem = () => {
    if (is_file) {
      dispatch(deleteFiles(item.id));
    } else {
      dispatch(deleteFolders(item.id));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center m-3 group">
        {/* <div className="flex mb-1">
        <IconContext.Provider
          value={{
            size: 20,
            className: "cursor-pointer mr-1",
          }}
        >
          <FaFolderOpen />
        </IconContext.Provider>
        <IconContext.Provider
          value={{
            size: 20,
            className: "cursor-pointer text-dark mr-1 action-icon",
          }}
        >
          <MdEdit />
        </IconContext.Provider>

        <IconContext.Provider
          value={{
            size: 20,
            className: "cursor-pointer",
          }}
        >
          <MdDelete />
        </IconContext.Provider>
      </div> */}

        <div className="flex w-full justify-end items-center">
          <div className="relative inline-block text-left">
            <svg
              onMouseDown={handleToggleItemOptions}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-0 group-hover:opacity-100 transition  cursor-pointer "
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>

            <div
              className={`${
                itemOptions ? "block" : "hidden"
              } origin-top-right absolute left-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="py-1" ref={itemOptionsRef} role="none">
                {is_file && (
                  <a
                    target="_blank"
                    href={
                      new RegExp(
                        `${process.env.HOST}|https://talendy.s3.amazonaws.com`
                      ).test(item.file)
                        ? item.file
                        : process.env.HOST + item.file
                    }
                    className="cursor-pointer flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                    role="menuitem"
                    tabindex="-1"
                    id="menu-item-0"
                  >
                    <IconContext.Provider
                      value={{
                        size: 15,
                        className: "cursor-pointer mr-1",
                      }}
                    >
                      <MdFileDownload />
                    </IconContext.Provider>
                    Download
                  </a>
                )}
                <span
                  className="cursor-pointer flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  onClick={handleOpenMoveItem}
                >
                  <IconContext.Provider
                    value={{
                      size: 15,
                      className: "cursor-pointer mr-1",
                    }}
                  >
                    <FaFolderOpen />
                  </IconContext.Provider>
                  Move
                </span>
                <span
                  className="cursor-pointer flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  role="menuitem"
                  tabindex="-1"
                  onClick={handleOpenEditTitle}
                  id="menu-item-0"
                >
                  <IconContext.Provider
                    value={{
                      size: 15,
                      className: "cursor-pointer text-dark mr-1 action-icon",
                    }}
                  >
                    <MdEdit />
                  </IconContext.Provider>
                  Edit
                </span>
                <span
                  className="cursor-pointer flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-0"
                  onClick={handleModalToggle}
                >
                  <IconContext.Provider
                    value={{
                      size: 15,
                      className: "cursor-pointer mr-1",
                    }}
                  >
                    <MdDelete />
                  </IconContext.Provider>
                  Delete
                </span>
              </div>
            </div>
            {/* Move item */}
            <div
              className={`${
                moveItem ? "block" : "hidden"
              } origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="p-1" ref={moveItemRef} role="none">
                <MoveFolderDropdown
                  item={item}
                  is_file={is_file}
                  handleCloseItemOptions={handleCloseItemOptions}
                />
              </div>
            </div>
          </div>
        </div>
        <IconContext.Provider
          value={{
            size: 100,
            className: "cursor-pointer",
          }}
        >
          {is_file ? (
            setFileIcon()
          ) : (
            <FaFolder onClick={() => hanldeEnterFolder(item)} />
          )}
        </IconContext.Provider>
        {isEditTitle ? (
          <form
            onSubmit={formik.handleSubmit}
            className="text-xs mt-1 flex items-center justify-center"
          >
            <input
              type="text"
              name="name"
              autoFocus
              className="block w-24 h-5 bg-white dark:bg-gray-600 border border-gray-300 rounded-3xl py-2  text-sm placeholder-gray-500 dark:placeholder-gray-100 focus:outline-none dark:text-white focus:text-gray-900 dark:focus:text-white focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={handleBlur}
            />
          </form>
        ) : (
          <span
            onDoubleClick={handleOpenEditTitle}
            className="text-xs mt-1  truncate"
            style={{ maxWidth: "6rem" }}
          >
            {item.name}
          </span>
        )}
      </div>
      <div
        className={`${
          isModalOpen ? "block" : "hidden"
        } fixed z-40 inset-0 overflow-y-auto`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                    Remove {is_file ? "file" : "folder"}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      The {is_file ? "file" : "folder"} will be removed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={handleDeleteItem}
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

export default ResourceItem;
