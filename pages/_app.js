import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "utils/get-stripejs";
import useDispatchInitialData from "hooks/useDispatchInitialData";
function WrappedApp({ Component, pageProps }) {
  // Dispatch initial data
  useDispatchInitialData();

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
