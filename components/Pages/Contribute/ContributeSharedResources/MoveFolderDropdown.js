import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchFolders,
  moveFile,
  moveFolder,
  removeCurrentFolder,
  setCurrentFolder,
  is_file,
  item,
} from "redux/actions/moveFolders";

const MoveFolderDropdown = ({ handleCloseItemOptions, item, is_file }) => {
  const collaborateRoomReducer = useSelector(
    (state) => state.collaborateRoomReducer
  );
  const moveFoldersReducer = useSelector((state) => state.moveFoldersReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !collaborateRoomReducer.isLoading &&
      collaborateRoomReducer.collaborate_room
    ) {
      const dispatchFetchFolders = () => dispatch(fetchFolders());
      dispatchFetchFolders();
    }
  }, []);
  const hanldeEnterFolder = async (folder) => {
    await dispatch(setCurrentFolder(folder.id));
    await dispatch(fetchFolders());
  };
  const hanldeEnterTopFolder = async () => {
    await dispatch(removeCurrentFolder());
    await dispatch(fetchFolders());
  };
  const handleMoveSubmit = (e) => {
    e.preventDefault();

    if (is_file) {
      dispatch(
        moveFile({
          ...item,
          top_folder:
            moveFoldersReducer.current_folders[
              moveFoldersReducer.current_folders.length - 1
            ],
        })
      );
    } else {
      dispatch(
        moveFolder({
          ...item,
          top_folder:
            moveFoldersReducer.current_folders[
              moveFoldersReducer.current_folders.length - 1
            ],
        })
      );
    }
    handleCloseItemOptions();
  };
  return (
    <>
      {moveFoldersReducer.current_folders.length > 0 && (
        <div className="flex justify-start mb-1">
          <button
            onClick={hanldeEnterTopFolder}
            type="button"
            className="text-gray-800 py-2 px-1 rounded-t cursor-pointer flex items-center dark:text-white ml-1 text-xs"
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
            Back
          </button>
        </div>
      )}
      <div className="">
        {moveFoldersReducer.folders &&
          moveFoldersReducer.folders.map((folder) => (
            <span
              className="cursor-pointer flex items-center justify-between p-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              role="menuitem"
              tabindex="-1"
              id="menu-item-0"
              onClick={hanldeEnterFolder.bind(this, folder)}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                {folder.name}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          ))}
      </div>

      <div className="flex justify-end mt-1">
        <button
          type="button"
          onClick={handleMoveSubmit}
          class="inline-flex w-full items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-3xl text-gray-500 hover:text-gray-500 dark:hover:text-white dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
        >
          Move here
        </button>
      </div>
    </>
  );
};

export default MoveFolderDropdown;
