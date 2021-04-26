import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "utils/get-stripejs";
import useDispatchInitialData from "hooks/useDispatchInitialData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addConnection,
  addInvitation,
  setPendingMessages,
  setPendingNotifications,
  substractConnection,
} from "redux/actions/auth";
import { addOrUpdateNotificationToFeed } from "redux/actions/lastNotifications";
import { createAlert } from "redux/actions/alerts";
import { newMessageEvent } from "redux/actions/chats";
function WrappedApp({ Component, pageProps }) {
  // Dispatch initial data
  useDispatchInitialData();
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const chatReducer = useSelector((state) => state.chatReducer);
  const chatsReducer = useSelector((state) => state.chatsReducer);
  const ws = useRef(null);
  const connect = () => {
    ws.current = new WebSocket(
      process.env.WS + "/ws/notifications/" + authReducer.user.id + "/"
    );
  };
  useEffect(() => {
    if (!authReducer.is_loading && authReducer.is_authenticated) {
      connect();
      ws.current.onopen = () => console.log("ws opened");
      ws.current.onclose = () => {
        setTimeout(function () {
          connect();
        }, 1000);
        console.log("ws closed");
      };
      ws.current.onmessage = async function (e) {
        const data = JSON.parse(e.data);
        console.log("data", data);
        switch (data.event) {
          case "MESSAGE_RECEIVED":
            if (chatReducer.chat?.id !== data.chat__pk) {
              console.log(chatReducer);
              console.log(chatsReducer);
              console.log(authReducer);
              console.log(data.chat__pk);
              await dispatch(setPendingMessages());
              await dispatch(setPendingNotifications());
              await dispatch(
                addOrUpdateNotificationToFeed(data.notification__pk)
              );
              await dispatch(
                createAlert(
                  "SUCCESS",
                  "New message from " + data.sent_by__username
                )
              );
              await dispatch(
                newMessageEvent(data.chat__pk, data.message__text)
              );
            }
            break;
          case "NEW_INVITATION":
            await dispatch(addInvitation());
            await dispatch(createAlert("SUCCESS", "New invitation"));
            await dispatch(addOrUpdateNotificationToFeed());
            break;
          case "NEW_CONNECTION":
            await dispatch(addConnection());
            await dispatch(createAlert("SUCCESS", "New connection"));

            await dispatch(addOrUpdateNotificationToFeed());

            break;
          case "CONNECTION_REMOVED":
            await dispatch(substractConnection());
            break;
        }
      };
      if (!authReducer.is_authenticated) {
        ws.current.close();
      }
      return () => {
        ws.current.close();
      };
    }
  }, [authReducer.is_loading, authReducer.is_authenticated]);
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return (
    <Elements stripe={getStripe()}>
      <Component {...pageProps} />
    </Elements>
  );
}
export default wrapper.withRedux(withReduxSaga(WrappedApp));
