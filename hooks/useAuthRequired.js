import { useRouter } from "next/router";
import {
  ACTIVE_CONTRIBUTED_POSTS_PAGE,
  CONNECTIONS_PAGE,
  CONTRIBUTED_POSTS_PAGE,
  COLLABORATION_ROOM_PAGE,
  FOLLOWED_USERS_POSTS_PAGE,
  MY_ACTIVE_POSTS_PAGE,
  MY_NETWORK_PAGE,
  MY_POSTS_PAGE,
  MY_SOLVED_POSTS_PAGE,
  NOTIFICATIONS_PAGE,
  PEOPLE_I_FOLLOW_PAGE,
  REQUESTS_PAGE,
  SETTINGS_PAGE,
  SOLVED_CONTRIBUTED_POSTS_PAGE,
} from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthRequired = (page) => {
  const authReducer = useSelector((state) => state.authReducer);
  const initialDataReducer = useSelector((state) => state.initialDataReducer);

  const { is_authenticated } = authReducer;
  const router = useRouter();
  const [canRender, setCanRender] = useState(false);
  const privatePages = [
    MY_POSTS_PAGE,
    COLLABORATION_ROOM_PAGE,
    NOTIFICATIONS_PAGE,
    MY_ACTIVE_POSTS_PAGE,
    MY_SOLVED_POSTS_PAGE,
    CONTRIBUTED_POSTS_PAGE,
    ACTIVE_CONTRIBUTED_POSTS_PAGE,
    SOLVED_CONTRIBUTED_POSTS_PAGE,
    SETTINGS_PAGE,
    MY_NETWORK_PAGE,
    CONNECTIONS_PAGE,
    PEOPLE_I_FOLLOW_PAGE,
    REQUESTS_PAGE,
  ];
  const matches = privatePages.some((privPage) => privPage === page);
  useEffect(() => {
    if (initialDataReducer.data_fetched) {
      if (!is_authenticated && matches) {
        router.push("/feed");
      } else {
        setCanRender(true);
      }
    }
  }, [initialDataReducer.data_fetched]);
  return [canRender, authReducer, initialDataReducer.data_fetched];
};

export default useAuthRequired;
