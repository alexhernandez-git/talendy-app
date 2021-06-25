import { loadCurrency, loadUser } from "redux/actions/auth";
import { initialDataFetched } from "redux/actions/initialData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLastNotifications } from "redux/actions/lastNotifications";
import { fetchCommunities } from "redux/actions/communities";
import { fetchPortal } from "redux/actions/portal";
import { fetchPlans } from "redux/actions/plans";

const useDispatchInitialData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchPortal());
      // Here load client
      await dispatch(loadUser());
      await dispatch(loadCurrency());
      await dispatch(fetchCommunities());
      await dispatch(fetchPlans());
      // Set initial data fetched
      await dispatch(initialDataFetched());
    };
    fetchData();
  }, []);

  return [];
};

export default useDispatchInitialData;
