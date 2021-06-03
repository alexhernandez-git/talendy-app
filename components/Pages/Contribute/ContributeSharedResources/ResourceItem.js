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
import { MdDelete, MdEdit } from "react-icons/md";

const ResourceItem = ({ is_file = false }) => {
  const setFileIcon = () => {
    switch ("file.txt") {
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
  return (
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
          <span
            onMouseDown={handleToggleItemOptions}
            className="h-4 w-4 cursor-pointer opacity-0 group-hover:opacity-100 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </span>

          <div
            className={`${
              itemOptions ? "block" : "hidden"
            } origin-top-right absolute right-0 mt-2 w-25 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" ref={itemOptionsRef} role="none">
              <span
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
                  <FaFolderOpen />
                </IconContext.Provider>
                Move
              </span>
              <span
                className="cursor-pointer flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                role="menuitem"
                tabindex="-1"
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
        </div>
      </div>
      <IconContext.Provider
        value={{
          size: 75,
          className: "cursor-pointer",
        }}
      >
        {is_file ? setFileIcon() : <FaFolder />}
      </IconContext.Provider>
      <span className="text-xs mt-1">
        {is_file ? "filename" : "foldername"}
      </span>
    </div>
  );
};

export default ResourceItem;
