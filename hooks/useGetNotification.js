import React from "react";
import { useSelector } from "react-redux";

const useGetNotification = (notification) => {
  const authReducer = useSelector((state) => state.authReducer);
  console.log(notification);
  let connection;
  let contribute_request;
  switch (notification?.type) {
    case "ME":
      const many_messages = notification.messages.length > 1;
      let message = "";
      if (notification.actor) {
        message = `${
          many_messages
            ? notification.messages.length + " messages"
            : "New message"
        } from ${notification.actor.username}`;
      } else {
        message = `${
          many_messages
            ? notification.messages.length + " messages"
            : "New message"
        }`;
      }
      if (notification.messages.length > 0 && !many_messages) {
        message = notification.messages[0].text;
      }
      return {
        event_message: many_messages ? "New messages" : "New message",
        message: message,
        user: notification.actor,
      };
      break;
    case "NC":
      connection = notification.connection;
      const connectedUser =
        connection.addressee.id === authReducer.user?.id
          ? connection.requester
          : connection.addressee;
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
    case "CR":
      contribute_request = notification.contribute_request;

      return {
        event_message: `New contribute request`,
        message: `${contribute_request.user.username} has requested to contribute`,
        user: contribute_request.user,
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
