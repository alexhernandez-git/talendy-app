import React from "react";
import { useSelector } from "react-redux";
import Invitation from "./Invitation";

const InvitationsFeed = () => {
  const invitationsReducer = useSelector((state) => state.invitationsReducer);
  return (
    <div className="mt-4 bg-white dark:bg-gray-700 rounded-lg shadow">
      <div className="p-6">
        <h2
          id="who-to-follow-heading"
          className="text-base font-medium text-gray-900 dark:text-white"
        >
          Invitations
        </h2>
        <div className="mt-6 flow-root">
          {invitationsReducer.invitations.results.length === 0 ? (
            <span className="text-sm text-gray-500 dark:text-gray-200">
              You have no inviations
            </span>
          ) : (
            <ul className="-my-4 divide-y divide-gray-200">
              {invitationsReducer.invitations.results.map((invitation) => (
                <Invitation />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvitationsFeed;
