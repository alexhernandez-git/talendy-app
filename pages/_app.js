import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "rc-slider/assets/index.css";
import { useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "utils/get-stripejs";
import useDispatchInitialData from "hooks/useDispatchInitialData";
import { useSelector, useDispatch } from "react-redux";
import {
  addConnection,
  addInvitation,
  setPendingNotifications,
  substractConnection,
} from "redux/actions/auth";
import { addOrUpdateNotificationToFeed } from "redux/actions/lastNotifications";
import { createAlert } from "redux/actions/alerts";
import {
  newMessageEvent,
  newContributeRequestEvent,
  newContributeRoomMessageEvent,
} from "redux/actions/notifications";
import Head from "next/head";

function WrappedApp({ Component, pageProps }) {
  // Dispatch initial data
  useDispatchInitialData();
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
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
            await dispatch(newMessageEvent(data));
            break;

          case "NEW_DONATION":
            await dispatch(createAlert("SUCCESS", "New donation"));
            await dispatch(setPendingNotifications());

            await dispatch(
              addOrUpdateNotificationToFeed(data.notification__pk)
            );
            break;
          case "JOINED_MEMBERSHIP":
            await dispatch(createAlert("SUCCESS", "New member joined"));
            await dispatch(setPendingNotifications());

            await dispatch(
              addOrUpdateNotificationToFeed(data.notification__pk)
            );
            break;

          case "CONTRIBUTE_REQUEST_ACCEPTED":
            await dispatch(
              createAlert(
                "SUCCESS",
                "Your collaborate request has been accepted"
              )
            );
            await dispatch(setPendingNotifications());

            await dispatch(
              addOrUpdateNotificationToFeed(data.notification__pk)
            );
            break;

          case "POST_MESSAGE_RECEIVED":
            await dispatch(setPendingNotifications());
            await dispatch(newContributeRoomMessageEvent(data));

            break;
          case "NEW_CONTRIBUTE_REQUEST":
            await dispatch(setPendingNotifications());

            await dispatch(newContributeRequestEvent(data));
            break;
          case "NEW_INVITATION":
            await dispatch(setPendingNotifications());

            await dispatch(addInvitation());
            await dispatch(createAlert("SUCCESS", "New invitation"));
            await dispatch(
              addOrUpdateNotificationToFeed(data.notification__pk)
            );
            break;
          case "NEW_CONNECTION":
            await dispatch(setPendingNotifications());

            await dispatch(addConnection());
            await dispatch(createAlert("SUCCESS", "New connection"));

            await dispatch(
              addOrUpdateNotificationToFeed(data.notification__pk)
            );

            break;
          case "CONNECTION_REMOVED":
            await dispatch(substractConnection());
            break;
          case "POST_FINALIZED":
            await dispatch(setPendingNotifications());

            await dispatch(createAlert("SUCCESS", "Post finalized"));

            await addOrUpdateNotificationToFeed(data.notification__pk);

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
      <Head>
        <title>Talendy - Collaboration community</title>
      </Head>
      <Component {...pageProps} />
    </Elements>
  );
}
export default wrapper.withRedux(withReduxSaga(WrappedApp));
