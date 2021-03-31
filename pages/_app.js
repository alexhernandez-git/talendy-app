import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useEffect } from "react";
function WrappedApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(withReduxSaga(WrappedApp));
