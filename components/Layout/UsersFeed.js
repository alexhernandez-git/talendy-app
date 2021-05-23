import { FEED_PAGE } from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchTopKarmaUsers } from "redux/actions/topKarmaUsers";
import { useDispatch } from "react-redux";
import Spinner from "components/Layout/Spinner";
import VisibilitySensor from "react-visibility-sensor";
import User from "./User";
import { fetchMoreUsers } from "redux/actions/users";
const UsersFeed = ({ page }) => {
  const usersReducer = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const handleFetchMoreUsers = () => {
    dispatch(fetchMoreUsers());
  };
  const onChangeVisibility = (visible) => {
    if (visible) {
      handleFetchMoreUsers();
    }
  };
  return (
    <div>
      <h1 className="sr-only">Users feed</h1>
      {usersReducer.is_loading && (
        <div className="flex justify-center space-y-4 w-full mb-4">
          <Spinner />
        </div>
      )}
      {usersReducer.users.results.length > 0 ? (
        <ul className="space-y-4">
          {usersReducer.users.results.map((user) => (
            <User page={page} user={user} />
          ))}
        </ul>
      ) : (
        <div className="flex justify-center">
          <span className="text-gray-500 dark:text-gray-100 text-sm">
            No users found
          </span>
        </div>
      )}

      {!usersReducer.is_fetching_more_users &&
        usersReducer.users.results.length > 0 &&
        usersReducer.users.next && (
          <VisibilitySensor onChange={onChangeVisibility}>
            <div
              className="p-3 flex justify-center"
              onClick={handleFetchMoreUsers}
            >
              <span className="text-gray-500 dark:text-gray-100 text-sm cursor-pointer">
                Load more users
              </span>
            </div>
          </VisibilitySensor>
        )}
      {usersReducer.is_fetching_more_users && (
        <div className="flex justify-center space-y-4 w-full mb-4 p-3">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UsersFeed;
