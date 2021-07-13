import Layout from "components/Dashboard/Layout";
import { COMMUNITIES_DASHBOARD_PAGE } from "pages";
import React, { useEffect } from "react";
import Head from "next/head";
import Spinner from "components/Layout/Spinner";
import useAuthRequired from "hooks/useAuthRequired";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import useOutsideClick from "hooks/useOutsideClick";
import {
  fetchDahboardCommunities,
  fetchDashboardCommunitiesPagination,
} from "redux/actions/dashboardCommunities";
import AddCommunitiesModal from "components/Dashboard/Communities/AddCommunitiesModal";
import Pagination from "components/Layout/Pagination";
const communities = () => {
  const page = COMMUNITIES_DASHBOARD_PAGE;
  const [canRender, authReducer, initialDataFetched] = useAuthRequired(page);
  const dashboardCommunitiesReducer = useSelector(
    (state) => state.dashboardCommunitiesReducer
  );
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
        await dispatch(fetchDahboardCommunities());
      }
    };

    fetchInitialData();
  }, [initialDataFetched]);
  const handleChangePage = (url) => {
    dispatch(fetchDashboardCommunitiesPagination(url));
  };

  const [communitiesSelected, setCommunitiesSelected] = useState([]);
  const handleSelectMember = (id) => {
    if (communitiesSelected.includes(id)) {
      setCommunitiesSelected(
        communitiesSelected.filter((member_id) => member_id !== id)
      );
    } else {
      setCommunitiesSelected([...communitiesSelected, id]);
    }
  };
  const handleSelectAll = () => {
    if (
      communitiesSelected.length ===
      dashboardCommunitiesReducer.communities.results.length
    ) {
      setCommunitiesSelected([]);
    } else {
      setCommunitiesSelected(
        dashboardCommunitiesReducer.communities.results.map(
          (member) => member.id
        )
      );
    }
  };
  const [removeCommunitiesModalOpen, setRemoveCommunitiesModalOpen] =
    useState(false);
  const handleOpenRemoveCommunitiesModal = () => {
    setRemoveCommunitiesModalOpen(true);
  };
  const handleCloseRemoveCommunitiesModal = () => {
    if (removeCommunitiesModalOpen) {
      setRemoveCommunitiesModalOpen(false);
    }
  };
  const handleToggleRemoveCommunitiesModal = () => {
    setRemoveCommunitiesModalOpen(!removeCommunitiesModalOpen);
  };
  const removeCommunitiesModalRef = useRef();
  useOutsideClick(removeCommunitiesModalRef, () =>
    handleCloseRemoveCommunitiesModal()
  );
  const resetCommunitiesSelected = () => {
    setCommunitiesSelected([]);
  };
  useEffect(() => {
    setCommunitiesSelected([]);
  }, [dashboardCommunitiesReducer.is_loading]);

  const handleRemoveCommunities = () => {
    dispatch(
      removeCommunities(
        communitiesSelected,
        resetCommunitiesSelected,
        handleCloseRemoveCommunitiesModal
      )
    );
  };
  const handleResendAccess = () => {
    dispatch(
      resendAccess(
        communitiesSelected,
        resetCommunitiesSelected,
        handleCloseRemoveCommunitiesModal
      )
    );
  };

  const [search, setSearch] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    setFirstLoad(false);
    if (!firstLoad) {
      const timeoutId = setTimeout(() => {
        dispatch(fetchCommunities(search));
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [search]);

  return (
    <>
      <Head>
        <title>Communities</title>
      </Head>
      {!canRender ? (
        <div className="flex justify-center items-center h-screen dark:bg-gray-800">
          <Spinner />
        </div>
      ) : (
        <>
          <Layout page={page}>
            <main className="flex-1 relative pb-8 z-0 overflow-y-auto overflow-x-hidden px-4">
              <div className="mt-8">
                <div className="max-w-6xl mx-auto">
                  {/* Create user button */}

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span class="relative z-0 inline-flex shadow-sm rounded-3xl">
                        <button
                          type="button"
                          disabled={communitiesSelected.length === 0}
                          onClick={handleOpenRemoveCommunitiesModal}
                          class="-ml-px relative inline-flex items-center px-4 py-2 rounded-3xl border border-gray-300  text-sm font-medium text-gray-500 dark:text-white bg-white dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-50"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Remove
                        </button>
                      </span>
                      <div className="ml-2">
                        <span className="text-gray-500 text-xs">
                          {communitiesSelected.length} of{" "}
                          {
                            dashboardCommunitiesReducer.communities.results
                              .length
                          }{" "}
                          selected
                        </span>
                      </div>
                    </div>
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
                      New community
                    </button>
                  </div>
                  {/* End create user button */}
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
                                  <span class="relative inline-flex items-center bg-white">
                                    <label for="select-all" class="sr-only">
                                      Select all
                                    </label>
                                    <input
                                      id="select-all"
                                      type="checkbox"
                                      name="select-all"
                                      class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                    />
                                  </span>
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Name
                                </th>

                                {/* 
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th> */}
                                <th scope="col" className="relative px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {/* User item */}
                              {dashboardCommunitiesReducer.communities.results
                                ?.length > 0 &&
                                dashboardCommunitiesReducer.communities.results.map(
                                  (community) => (
                                    <tr>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span class="relative inline-flex items-center bg-white">
                                          <label
                                            for="select-all"
                                            class="sr-only"
                                          >
                                            Select
                                          </label>
                                          <input
                                            id="select-all"
                                            type="checkbox"
                                            name="select-all"
                                            class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                          />
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500">
                                          {community.name}
                                        </span>
                                        {/* <div className="text-sm text-gray-500">
                              Optimization
                            </div> */}
                                      </td>

                                      {/* <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Admin
                          </td> */}
                                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a
                                          href="#"
                                          className="text-orange-600 hover:text-orange-900 mr-3"
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 inline"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                          >
                                            <path
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              strokeWidth={2}
                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                          </svg>
                                        </a>
                                      </td>
                                    </tr>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                        {dashboardCommunitiesReducer.communities &&
                          (dashboardCommunitiesReducer.communities.previous ||
                            dashboardCommunitiesReducer.communities.next) && (
                            <Pagination
                              previous={
                                dashboardCommunitiesReducer.communities.previous
                              }
                              next={
                                dashboardCommunitiesReducer.communities.next
                              }
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

          <AddCommunitiesModal
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

export default communities;
