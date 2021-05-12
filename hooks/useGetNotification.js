import React from "react";
import { useSelector } from "react-redux";

const useGetNotification = (notification) => {
  const authReducer = useSelector((state) => state.authReducer);
  let connection;
  let user;
  let member_joined;
  let post_owner;
  let contribute_request;
  let many_messages;
  let message;
  switch (notification?.type) {
    case "ME":
      many_messages = notification.messages.length > 1;
      message = "";
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
        link: null,
      };
    case "PM":
      many_messages = notification.post_messages.length > 1;
      message = "";
      if (notification.actor) {
        message = `${
          many_messages
            ? notification.post_messages.length + " messages in contribute room"
            : "New message in contribute room"
        } from ${notification.actor.username}`;
      } else {
        message = `${
          many_messages
            ? notification.post_messages.length +
              " messages from contribute room"
            : "New message from contribute Room"
        }`;
      }
      if (notification.post_messages.length > 0 && !many_messages) {
        message = notification.post_messages[0].text;
      }
      return {
        event_message: many_messages
          ? "New messages from contribute room"
          : "New message from contribute room",
        message: message,
        user: notification.actor,
        link: `/contribute-room/${notification?.post?.id}`,
      };
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
        link: `/user/${connectedUser?.id}`,
      };
    case "NI":
      connection = notification.connection;

      return {
        event_message: `New invitation`,
        message: `${connection.requester.username} has invited you to connect`,
        user: connection.requester,
        link: `/profile/mynetwork`,
      };
    case "CR":
      contribute_request = notification.contribute_request;

      return {
        event_message: `New contribute request`,
        message: `${contribute_request.user.username} has requested to contribute`,
        user: contribute_request.user,
        link: `/profile/posts`,
      };
    case "JM":
      member_joined = notification.member_joined;
      return {
        event_message: `New member joined`,
        message: `${member_joined.username} has joined to your post`,
        user: member_joined,
        link: `/contribute-room/${notification?.post?.id}`,
      };
    case "CA":
      post_owner = notification?.post?.user;
      return {
        event_message: `Contribute request accepted`,
        message: `${post_owner.username} has accepted your contribute request`,
        user: post_owner,
        link: `/contribute-room/${notification?.post?.id}`,
      };
    default:
      return {
        event_message: `New notification`,
        message: null,
        user: null,
        link: null,
      };
  }
};

export default useGetNotification;
