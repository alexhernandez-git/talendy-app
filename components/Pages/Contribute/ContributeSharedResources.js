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
  return (
    <section className="overflow-auto block">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg p-1">
        <div className="flex justify-end items-center rounded-t">
          <div className="flex ">
            <button className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center text-white mr-1 text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                <path
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 11h4m-2-2v4"
                />
              </svg>
              Folder
            </button>

            <button className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center text-white  text-xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z"
                  clipRule="evenodd"
                />
              </svg>
              File
            </button>
          </div>
        </div>
        <div className="editor text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-900 p-3 rounded-b rounded-l content-container"></div>
      </div>
    </section>
  );
};

export default ContributeSharedResources;
