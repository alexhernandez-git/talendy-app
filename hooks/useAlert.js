import { SuccessAlert, ErrorAlert, InfoAlert } from "components/Layout/Alerts";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAlert } from "redux/actions/alerts";

// browser code
export function useAlert() {
  const { message, type } = useSelector((state) => state.alertsReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(removeAlert());
      }, 3000);
    }
  }, [message]);
  const handleHideAlert = () => {
    dispatch(removeAlert());
  };
  switch (type) {
    case "SUCCESS":
      return (
        <SuccessAlert message={message} handleHideAlert={handleHideAlert} />
      );
    case "INFO":
      return <InfoAlert message={message} handleHideAlert={handleHideAlert} />;
    case "ERROR":
      return <ErrorAlert message={message} handleHideAlert={handleHideAlert} />;
    default:
      break;
  }

  return <></>;
}
