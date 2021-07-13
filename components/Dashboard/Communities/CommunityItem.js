import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMemberRole } from "redux/actions/members";
import Container from "react-modal-promise";
import useUserConfirmationModal from "hooks/useUserConfirmation";
import { useRef } from "react";
import { useSelector } from "react-redux";

const CommunityItem = ({
  community,
  handleSelectCommunity,
  communitiesSelected,
}) => {
  const authReducer = useSelector((state) => state.authReducer);
  const portalReducer = useSelector((state) => state.portalReducer);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const handleOpenEdit = () => {
    setIsEdit(true);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const [role, setRole] = useState(community.role);
  const newRoleRef = useRef(null);
  const handleChangeRole = async (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // Call the action to save the changes
    newRoleRef.current = e.target.value;
    await useUserConfirmationModal()
      .then(async () => {
        console.log("success");
        if (newRoleRef.current) {
          await dispatch(
            updateMemberRole(
              community.id,
              newRoleRef.current,
              setRole,
              handleCloseEdit
            )
          );
        }
      })
      .catch(async () => {
        console.log("error");
        await handleCloseEdit();
      });
  };
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <span class="relative inline-flex items-center bg-white">
          <label for="select-all" class="sr-only">
            Select
          </label>
          <input
            id="select-all"
            onChange={handleSelectCommunity.bind(this, community.id)}
            checked={communitiesSelected.some((id) => id === community.id)}
            type="checkbox"
            name="select-all"
            class="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
          />
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-500">{community.name}</span>
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
        <a href="#" className="text-orange-600 hover:text-orange-900 mr-3">
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
  );
};

export default CommunityItem;
