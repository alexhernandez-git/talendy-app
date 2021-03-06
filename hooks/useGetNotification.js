import React from "react";
import { useSelector } from "react-redux";

const useGetNotification = (notification) => {
  const authReducer = useSelector((state) => state.authReducer);
  let connection;
  let user;
  let member_joined;
  let post_owner;
  let collaborate_request;
  let many_messages;
  let message;
  let post;
  let review_user;
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
            ? notification.post_messages.length +
              " messages in collaborate room"
            : "New message in collaborate room"
        } from ${notification.actor.username}`;
      } else {
        message = `${
          many_messages
            ? notification.post_messages.length +
              " messages from collaborate room"
            : "New message from collaborate Room"
        }`;
      }
      if (notification.post_messages.length > 0 && !many_messages) {
        message = notification.post_messages[0].text;
      }
      return {
        event_message: many_messages
          ? "New messages from collaborate room"
          : "New message from collaborate room",
        message: message,
        user: notification.actor,
        link: `/collaborate-room/${notification?.post?.id}`,
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
      collaborate_request = notification.collaborate_request;

      return {
        event_message: `New collaborate request`,
        message: `${collaborate_request.user.username} has requested to collaborate`,
        user: collaborate_request.user,
        link: `/profile/posts`,
      };
    case "JM":
      member_joined = notification.member_joined;
      return {
        event_message: `New member joined`,
        message: `${member_joined.username} has joined to your post`,
        user: member_joined,
        link: `/collaborate-room/${notification?.post?.id}`,
      };
    case "CA":
      post_owner = notification?.post?.user;
      return {
        event_message: `Contribute request accepted`,
        message: `${post_owner.username} has accepted your collaborate request`,
        user: post_owner,
        link: `/collaborate-room/${notification?.post?.id}`,
      };
    case "PF":
      post = notification?.post;
      return {
        event_message: `Post finalized`,
        message: `${post.user?.username} has finalized the post`,
        user: post.user,
        link: `/collaborate-room/${notification?.post?.id}`,
      };
    case "NR":
      review_user = notification?.review?.review_user;
      return {
        event_message: `New review`,
        message: `You got a new review from ${review_user?.username}`,
        user: review_user,
        link: `/profile/reviews`,
      };
    case "ND":
      const donation = notification?.donation;
      user = donation?.from_user
        ? donation.from_user
        : { username: "anonymous user" };
      return {
        event_message: `New donation`,
        message: `You got a new donation of $${donation.net_amount} from ${user?.username}`,
        user: user,
        link: `/profile/donations`,
      };
    case "CF":
      post = notification?.post;
      return {
        event_message: `A user followed has created a new post`,
        message: `${post.user?.username} has created a new post`,
        user: post.user,
        link: `/post/${notification?.post?.id}`,
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
