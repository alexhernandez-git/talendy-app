import { useDispatch, useSelector } from "react-redux";
import ActionButton from "./ContributeKanbanBoard/ActionButton";
import List from "./ContributeKanbanBoard/List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  addCard,
  addList,
  deleteCard,
  deleteList,
  sort,
  sortCard,
  sortCardInDiferentLists,
  sortList,
  updateCard,
  updateList,
} from "redux/actions/kanban";
import { useEffect, useState } from "react";
import { createAlert } from "redux/actions/alerts";
import {
  FaFileAlt,
  FaFileCsv,
  FaFileExcel,
  FaFileImage,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileWord,
  FaFolder,
} from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import ResourceItem from "./ContributeSharedResources/ResourceItem";

const ContributeSharedResources = ({ socketRef, roomID }) => {
  const { collaborate_room } = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const { access_token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socketRef?.current) {
    }
  }, [socketRef?.current]);
  const handleFeatureNotReady = () => {
    dispatch(createAlert("INFO", "Feature not ready"));
  };

  return (
    <section className="block">
      <div
        className="w-full
      bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg pt-1 mb-10 lg:mb-0
      "
      >
        <div className="flex justify-end items-center rounded-t">
          <div className="flex ">
            <button
              onClick={handleFeatureNotReady}
              className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center text-white mr-1 text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              Folder
            </button>

            <button
              onClick={handleFeatureNotReady}
              className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center text-white  text-xs mr-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              File
            </button>
          </div>
        </div>
        <div
          className=" text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b h-full"
          style={{ minHeight: "40rem" }}
        >
          <div className="flex flex-wrap ">
            <ResourceItem is_file />
            <ResourceItem is_file />
            <ResourceItem is_file />
            <ResourceItem is_file />
            <ResourceItem is_file />

            <ResourceItem is_file />
            <ResourceItem is_file />
            <ResourceItem is_file />
            <ResourceItem is_file />
            <ResourceItem is_file />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContributeSharedResources;
