import React from "react";
import { useSelector } from "react-redux";

const useGetNotification = (notification) => {
  const authReducer = useSelector((state) => state.authReducer);
  console.log(notification);
  let connection;
  switch (notification.type) {
    case "NC":
      connection = notification.connection;
      connectedUser =
        connection.addressee.id === authReducer.user?.id
          ? connection.addressee
          : connection.requester;
      return {
        event_message: `New connection`,
        message: `${connectedUser.username} is your new connection`,
        user: connectedUser,
      };
    case "NI":
      connection = notification.connection;

      return {
        event_message: `New invitation`,
        message: `${connection.requester.username} has invited you to connect`,
        user: connection.requester,
      };
    default:
      return {
        event_message: `New notification`,
        message: null,
        user: null,
      };
  }
};

export default useGetNotification;
