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
import {
  createFolder,
  fetchFolders,
  removeCurrentFolder,
  setCurrentFolder,
} from "redux/actions/folders";
import { createFile, fetchFiles } from "redux/actions/files";
import Spinner from "components/Layout/Spinner";
import { useRef } from "react";

const ContributeSharedResources = ({ socketRef, roomID }) => {
  const collaborateRoomReducer = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const filesReducer = useSelector((state) => state.filesReducer);
  console.log(filesReducer);
  const foldersReducer = useSelector((state) => state.foldersReducer);
  console.log(foldersReducer);
  const { access_token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !collaborateRoomReducer.isLoading &&
      collaborateRoomReducer.collaborate_room
    ) {
      const fetchInitialData = async () => {
        await dispatch(fetchFiles());
        await dispatch(fetchFolders());
      };
      fetchInitialData();
    }
  }, []);
  useEffect(() => {
    if (socketRef?.current) {
    }
  }, [socketRef?.current]);
  const handleFeatureNotReady = () => {
    dispatch(createAlert("INFO", "Feature not ready"));
  };
  const handleCreateFolder = () => {
    dispatch(createFolder());
  };

  const refetchDocs = async () => {
    await dispatch(fetchFolders());
    await dispatch(fetchFiles());
  };
  const hanldeEnterFolder = async (folder) => {
    await dispatch(setCurrentFolder(folder.id));
    await refetchDocs();
  };
  const hanldeEnterTopFolder = async () => {
    await dispatch(removeCurrentFolder());
    await refetchDocs();
  };
  const fileRef = useRef();
  const handleCreateFile = (e) => {
    if (e.target.files?.length > 0) {
      console.log(e.target.files);

      const dispatchCreateFile = (values) => dispatch(createFile(values));
      dispatchCreateFile(e.target.files[0]);
    }
    fileRef.current.value = "";
  };

  return (
    <section className="block">
      <div className="w-full bg-gradient-to-r from-orange-500 to-pink-500 dark:bg-gray-700 shadow sm:rounded-lg pt-1 mb-10 lg:mb-0">
        <div className="flex justify-between items-center rounded-t">
          <div>
            {foldersReducer.current_folders.length > 0 && (
              <button
                onClick={hanldeEnterTopFolder}
                className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center text-white ml-1 text-xs"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Go back
              </button>
            )}
          </div>

          <div className="flex ">
            <button
              onClick={handleCreateFolder}
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
            <input
              type="file"
              ref={fileRef}
              id="create-file-input"
              className="hidden"
              onChange={handleCreateFile}
            />
            <label
              for="create-file-input"
              className="bg-gray-800 py-2 px-3 rounded-t cursor-pointer flex items-center text-white  text-xs mr-1"
            >
              {filesReducer.file_creating && (
                <div className="mr-1">
                  <Spinner />
                </div>
              )}
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
            </label>
          </div>
        </div>
        <div
          className=" text-gray-600 dark:text-white text-sm bg-gray-200 dark:bg-gray-800 p-3 rounded-b h-full"
          style={{ minHeight: "40rem" }}
        >
          <div className="flex flex-wrap ">
            {foldersReducer.folders &&
              foldersReducer.folders.map((folder) => (
                <ResourceItem
                  key={folder.id}
                  hanldeEnterFolder={hanldeEnterFolder}
                  item={folder}
                  is_editing={folder.is_editing}
                />
              ))}
            {filesReducer.files &&
              filesReducer.files.map((file) => (
                <ResourceItem is_file key={file.id} item={file} />
              ))}
          </div>
          {/* {(foldersReducer.isLoading || filesReducer.isLoading) && (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default ContributeSharedResources;
