import { wrapper } from "redux/store";
import withReduxSaga from "next-redux-saga";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
function WrappedApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default wrapper.withRedux(withReduxSaga(WrappedApp));
