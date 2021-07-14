import Layout from "components/Dashboard/Layout";
import Link from "next/link";
import { MEMBERS_DASHBOARD_PAGE } from "pages";
import React from "react";
import Head from "next/head";
import Spinner from "components/Layout/Spinner";
import useAuthRequired from "hooks/useAuthRequired";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import AddMembersModal from "components/Dashboard/Members/AddMembersModal";
import {
  fetchMembers,
  fetchMembersPagination,
  removeMembers,
  resendAccess,
} from "redux/actions/members";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "components/Layout/Pagination";
import MemberItem from "components/Dashboard/Members/MemberItem";

const users = () => {
  const page = MEMBERS_DASHBOARD_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  const membersReducer = useSelector((state) => state.membersReducer);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };
  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };
  const modalRef = useRef();
  useOutsideClick(modalRef, () => handleCloseModal());
  useEffect(() => {
    const fetchInitialData = async () => {
      if (initialDataFetched) {
        await dispatch(fetchMembers());
      }
    };

    fetchInitialData();
  }, [initialDataFetched]);
  const handleChangePage = (url) => {
    dispatch(fetchMembersPagination(url));
  };

  const [membersSelected, setMembersSelected] = useState([]);
  const handleSelectMember = (id) => {
    if (membersSelected.includes(id)) {
      setMembersSelected(
        membersSelected.filter((member_id) => member_id !== id)
      );
    } else {
      setMembersSelected([...membersSelected, id]);
    }
  };
  const handleSelectAll = () => {
    if (membersSelected.length === membersReducer.members.results.length) {
      setMembersSelected([]);
    } else {
      setMembersSelected(
        membersReducer.members.results.map((member) => member.id)
      );
    }
  };
  const [removeMembersModalOpen, setRemoveMembersModalOpen] = useState(false);
  const handleOpenRemoveMembersModal = () => {
    setRemoveMembersModalOpen(true);
  };
  const handleCloseRemoveMembersModal = () => {
    if (removeMembersModalOpen) {
      setRemoveMembersModalOpen(false);
    }
  };
  const handleToggleRemoveMembersModal = () => {
    setRemoveMembersModalOpen(!removeMembersModalOpen);
  };
  const removeMembersModalRef = useRef();
  useOutsideClick(removeMembersModalRef, () => handleCloseRemoveMembersModal());
  const resetMembersSelected = () => {
    setMembersSelected([]);
  };
  useEffect(() => {
    setMembersSelected([]);
  }, [membersReducer.is_loading]);

  const handleRemoveMembers = () => {
    dispatch(
      removeMembers(
        membersSelected,
        resetMembersSelected,
        handleCloseRemoveMembersModal
      )
    );
  };
  const handleResendAccess = () => {
    dispatch(
      resendAccess(
        membersSelected,
        resetMembersSelected,
        handleCloseRemoveMembersModal
      )
    );
  };

  const [search, setSearch] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setFirstLoad(false);
    if (!firstLoad) {
      const timeoutId = setTimeout(() => {
        dispatch(fetchMembers(search));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>
      {!canRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
          <Layout page={page} search={search} setSearch={setSearch}>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
              <div className="mt-8">
                <div className="max-w-6xl mx-auto">
                  {/* Create user button */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="relative z-0 inline-flex shadow-sm rounded-3xl">
                        <button
                          type="button"
                          disabled={membersSelected.length === 0}
                          onClick={handleResendAccess}
                          className="-ml-px relative inline-flex items-center px-4 py-2 rounded-l-3xl border border-gray-300  text-sm font-medium text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                          Resend access
                        </button>
                        <button
                          type="button"
                          disabled={membersSelected.length === 0}
                          onClick={handleOpenRemoveMembersModal}
                          className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-3xl border border-gray-300  text-sm font-medium text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" />
                          </svg>
                          Remove
                        </button>
                      </span>
                      <div className="ml-2">
                        <span className="text-gray-500 text-xs">
                          {membersSelected.length} of{" "}
                          {membersReducer.members.results.length} selected
                        </span>
                      </div>
                    </div>
                    {authReducer.user?.member?.role === "AD" && (
                      <button
                        onClick={handleOpenModal}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-3xl shadow-sm text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:to-pink-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add member
                      </button>
                    )}
                  </div>

                  {/* Start users table */}
                  <div className="flex flex-col ">
                    <div className="overflow-x-auto">
                      <div className="py-2 align-middle inline-block min-w-full">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <span className="sr-only">Select all</span>
                                  <span className="relative inline-flex items-center bg-white">
                                    <label for="select-all" className="sr-only">
                                      Select all
                                    </label>
                                    <input
                                      id="select-all"
                                      onChange={handleSelectAll}
                                      checked={
                                        membersSelected.length ===
                                          membersReducer.members.results
                                            .length &&
                                        membersReducer.members.results.length >
                                          0
                                      }
                                      type="checkbox"
                                      name="select-all"
                                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                    />
                                  </span>
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  <span className="sr-only">Image</span>
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left  text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Name
                                </th>

                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Email
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Active
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  Role
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  <span className="sr-only">Edit</span>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider "
                                >
                                  <span className="sr-only">See profile</span>
                                </th>
                                {/* 
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th> */}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {/* User item */}
                              {membersReducer.members.results?.length > 0 &&
                                membersReducer.members.results.map((member) => (
                                  <MemberItem
                                    key={member.id}
                                    member={member}
                                    handleSelectMember={handleSelectMember}
                                    membersSelected={membersSelected}
                                  />
                                ))}

                              {/* End user item */}
                            </tbody>
                          </table>
                        </div>
                        {membersReducer.members &&
                          (membersReducer.members.previous ||
                            membersReducer.members.next) && (
                            <Pagination
                              previous={membersReducer.members.previous}
                              next={membersReducer.members.next}
                              changePage={handleChangePage}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                  {/* End users table */}
                </div>
              </div>
            </main>
          </Layout>
          <div
            className={`${
              removeMembersModalOpen ? "block" : "hidden"
            } fixed z-30 inset-0 overflow-y-auto`}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>

              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div
                ref={removeMembersModalRef}
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
                        Remove members
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {membersSelected.length} members will be removed.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    onClick={handleRemoveMembers}
                    type="button"
                    className="w-full inline-flex justify-center rounded-3xl border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Remove
                  </button>
                  <button
                    onClick={handleCloseRemoveMembersModal}
                    type="button"
                    className="mt-3 inline-flex justify-center rounded-3xl border border-gray-300 shadow-sm px-4 py-2 text-base font-medium text-gray-700 sm:mt-0 sm:col-start-1 sm:text-sm bg-white dark:text-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AddMembersModal
            modalOpen={modalOpen}
            handleToggleModal={handleToggleModal}
            modalRef={modalRef}
            handleCloseModal={handleCloseModal}
          />
        </>
      )}
    </>
  );
};

export default users;
