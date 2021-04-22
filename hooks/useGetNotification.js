import React from "react";
import { useSelector } from "react-redux";

const useGetNotification = (notification) => {
  const authReducer = useSelector((state) => state.authReducer);
  switch (notification.type) {
    case "NC":
      const connection = notification.connection;
      const connectedUser =
        connection.addressee.id === authReducer.user?.id
          ? connection.addressee
          : connection.requester;
      return {
        event_message: `New connection`,
        message: `${connectedUser.username} is your new connection`,
        user: connectedUser,
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
