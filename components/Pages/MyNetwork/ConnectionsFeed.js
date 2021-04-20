import React from "react";
import User from "../../Layout/User";

const UsersFeed = ({ page }) => {
  return (
    <div className="mt-4">
      <ul className="space-y-4">
        <li>
          <User page={page} />
        </li>
        <li>
          <User page={page} />
        </li>
      </ul>
    </div>
  );
};

export default UsersFeed;
