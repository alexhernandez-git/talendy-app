import { useRouter } from "next/router";
import {
  CONTRIBUTE_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  MY_POSTS_PAGE,
  NOTIFICATIONS_PAGE,
} from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthRequired = (page) => {
  const authReducer = useSelector((state) => state.authReducer);
  const initialDataReducer = useSelector((state) => state.initialDataReducer);

  const { is_authenticated } = authReducer;
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);
  const privatePages = [MY_POSTS_PAGE, CONTRIBUTE_PAGE, NOTIFICATIONS_PAGE];
  const matches = privatePages.some((privPage) => privPage === page);
  useEffect(() => {
    if (initialDataReducer.data_fetched) {
      if (!is_authenticated && matches) {
        router.push("/");
      } else {
        setCanRender(true);
      }
    }
  }, [initialDataReducer.data_fetched]);
  return [canRender, authReducer, initialDataReducer.data_fetched];
};

export default useAuthRequired;
