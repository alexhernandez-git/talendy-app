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
  substractConnection,
} from "redux/actions/auth";
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
          case "NEW_INVITATION":
            await dispatch(addInvitation());
            break;
          case "NEW_CONNECTION":
            await dispatch(addConnection());
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
