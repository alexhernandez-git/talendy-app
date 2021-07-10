import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMemberRole } from "redux/actions/members";
import Container from "react-modal-promise";
import useUserConfirmationModal from "hooks/useUserConfirmation";
import { useRef } from "react";
import { useSelector } from "react-redux";

const MemberItem = ({ member, handleSelectMember, membersSelected }) => {
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const handleOpenEdit = () => {
    setIsEdit(true);
  };
  const handleCloseEdit = () => {
    setIsEdit(false);
  };
  const [role, setRole] = useState(member.role);
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
              member.id,
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
    <>
      <Container />

      <tr>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="relative inline-flex items-center bg-white">
            <label for="select-all" className="sr-only">
              Select all
            </label>
            <input
              id="select-all"
              onChange={handleSelectMember.bind(this, member.id)}
              checked={membersSelected.some((id) => id === member.id)}
              type="checkbox"
              name="select-all"
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-8 w-8">
            <svg
              className="h-8 w-8 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm">
            {member?.is_active ? member?.user?.first_name : member?.first_name}{" "}
            {member?.is_active ? member?.user?.last_name : member?.last_name}
          </span>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-sm">
            {member?.is_active ? member?.user?.email : member?.email}
          </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          {member?.is_active ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500 text-center m-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-500 text-center m-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </td>
        {isEdit ? (
          <td className="px-6 py-4 whitespace-nowrap text-center">
            <select name="" id="" value={role} onChange={handleChangeRole}>
              <option value="BA">Basic</option>
              <option value="MA">Manager</option>
              <option value="AD">Admin</option>
            </select>
          </td>
        ) : (
          <td className="px-6 py-4 whitespace-nowrap text-center">
            {member?.role === "BA" && (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase bg-gray-100 text-gray-800">
                BASIC
              </span>
            )}
            {member?.role === "MA" && (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase bg-blue-100 text-gray-800">
                MANAGER
              </span>
            )}
            {member?.role === "AD" && (
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full uppercase bg-green-100 text-gray-800">
                ADMIN
              </span>
            )}
          </td>
        )}
        <td className="px-6 py-4 whitespace-nowrap">
          {authReducer.user?.member?.role === "AD" && (
            <>
              {isEdit ? (
                <svg
                  onClick={handleCloseEdit}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-500 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  onClick={handleOpenEdit}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-orange-500 cursor-pointer"
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
              )}
            </>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {member?.is_active && (
            <a href={`/user/${member?.user?.id}`} target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          )}
        </td>
      </tr>
    </>
  );
};

export default MemberItem;
