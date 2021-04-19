import { useAlert } from "hooks/useAlert";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyAccount } from "redux/actions/auth";

const verified_account = () => {
  const router = useRouter();
  const { token } = router.query;
  const authReducer = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (token && !authReducer.is_loading) {
      dispatch(verifyAccount(token, router));
    }
  }, [token, authReducer.is_loading]);
  const alert = useAlert();

  return <>{alert}</>;
};

export default verified_account;
