import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useEffect } from "react";
function WrappedApp({ Component, pageProps }) {
  useEffect(() => {
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(withReduxSaga(WrappedApp));
