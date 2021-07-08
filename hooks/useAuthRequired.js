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
  DASHBOARD_PAGE,
  MEMBERS_DASHBOARD_PAGE,
  POSTS_DASHBOARD_PAGE,
  COMMUNITIES_DASHBOARD_PAGE,
  STATISTICS_DASHBOARD_PAGE,
  SETTINGS_DASHBOARD_PAGE,
  BILLING_DASHBOARD_PAGE,
  USER_DETAIL_DASHBOARD_PAGE,
} from "pages";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthRequired = (page) => {
  const authReducer = useSelector((state) => state.authReducer);
  const initialDataReducer = useSelector((state) => state.initialDataReducer);

  const { is_authenticated, user } = authReducer;
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
  const dashboardPages = [
    // Dashboard
    DASHBOARD_PAGE,
    MEMBERS_DASHBOARD_PAGE,
    POSTS_DASHBOARD_PAGE,
    COMMUNITIES_DASHBOARD_PAGE,
    STATISTICS_DASHBOARD_PAGE,
    SETTINGS_DASHBOARD_PAGE,
    BILLING_DASHBOARD_PAGE,
    USER_DETAIL_DASHBOARD_PAGE,
  ];
  const matches = [...privatePages, ...dashboardPages].some(
    (privPage) => privPage === page
  );
  const dashboardMatches = dashboardPages.some((privPage) => privPage === page);
  useEffect(() => {
    if (initialDataReducer.data_fetched) {
      if (!is_authenticated && matches) {
        router.push("/feed");
      } else {
        if (dashboardMatches) {
          if (user?.member?.role === "AD" || user?.member?.role === "MA") {
            setCanRender(true);
          } else {
            router.push("/feed");
            return;
          }
        }
        setCanRender(true);
      }
    }
  }, [initialDataReducer.data_fetched]);
  return [canRender, authReducer, initialDataReducer.data_fetched];
};

export default useAuthRequired;
