import { useAlert } from "hooks/useAlert";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "redux/actions/user";

const verified_account = () => {
  const router = useRouter();
  const { token } = router.query;
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && !userReducer.is_loading) {
      dispatch(verifyAccount(token, router));
    }
  }, [token, userReducer.is_loading]);
  const alert = useAlert();

  return <>{alert}</>;
};

export default verified_account;
