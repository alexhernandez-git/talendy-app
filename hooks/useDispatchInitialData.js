import { loadCurrency, loadUser } from "redux/actions/auth";
import { initialDataFetched } from "redux/actions/initialData";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchLastNotifications } from "redux/actions/lastNotifications";

const useDispatchInitialData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(loadUser());
      await dispatch(loadCurrency());
      await dispatch(fetchLastNotifications());
      // Set initial data fetched
      await dispatch(initialDataFetched());
    };
    fetchData();
  }, []);

  return [];
};

export default useDispatchInitialData;
