import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "quill/dist/quill.bubble.css";
import { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import getStripe from "utils/get-stripejs";
function WrappedApp({ Component, pageProps }) {
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
