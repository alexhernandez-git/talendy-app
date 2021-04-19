import { useRouter } from "next/router";
import {
  CONTRIBUTE_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  MY_POSTS_PAGE,
} from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthRequired = (page) => {
  const userReducer = useSelector((state) => state.userReducer);
  const initialDataReducer = useSelector((state) => state.initialDataReducer);

  const { is_authenticated } = userReducer;
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);
  const privatePages = [MY_POSTS_PAGE, CONTRIBUTE_PAGE];
  const matches = privatePages.some((privPage) => privPage === page);
  useEffect(() => {
    if (initialDataReducer.initial_data_fetched) {
      if (!is_authenticated && matches) {
        router.push("/");
      } else {
        setCanRender(true);
      }
    }
  }, [initialDataReducer.initial_data_fetched]);
  return [canRender, userReducer, initialDataReducer.initial_data_fetched];
};

export default useAuthRequired;
