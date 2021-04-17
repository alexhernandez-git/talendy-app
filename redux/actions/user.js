import axios from "axios";

import {
  CHANGE_THEME,
  CHANGE_COMMUNITY,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_CHANGE_PASSWORD_ERRORS,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
  STRIPE_CONNECT,
  STRIPE_CONNECT_SUCCESS,
  STRIPE_CONNECT_FAIL,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_AUTH_ERRORS,
  IS_EMAIL_AVAILABLE,
  IS_EMAIL_AVAILABLE_SUCCESS,
  IS_EMAIL_AVAILABLE_FAIL,
  IS_COUPON_AVAILABLE,
  IS_COUPON_AVAILABLE_SUCCESS,
  IS_COUPON_AVAILABLE_FAIL,
  RESET_EMAIL_AVAILABLE,
  IS_USERNAME_AVAILABLE,
  IS_USERNAME_AVAILABLE_SUCCESS,
  IS_USERNAME_AVAILABLE_FAIL,
  RESET_USERNAME_AVAILABLE,
  RESET_COUPON_AVAILABLE,
  SEND_VERIFICATION_EMAIL,
  SEND_VERIFICATION_EMAIL_SUCCESS,
  SEND_VERIFICATION_EMAIL_FAIL,
  VERIFY_ACCOUNT,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAIL,
  VALIDATE_CHANGE_EMAIL,
  VALIDATE_CHANGE_EMAIL_SUCCESS,
  VALIDATE_CHANGE_EMAIL_FAIL,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  INVITE_USER,
  INVITE_USER_SUCCESS,
  INVITE_USER_FAIL,
  RESET_INVITE_USER,
  LOAD_USER_ERROR,
  SET_PENDING_NOTIFICATIONS,
  SET_PENDING_MESSAGES,
  UNSET_PENDING_NOTIFICATIONS,
  UNSET_PENDING_MESSAGES,
  ADD_BILLING_INFORMATION,
  ADD_BILLING_INFORMATION_SUCCESS,
  ADD_BILLING_INFORMATION_FAIL,
  CHANGE_PAYMENT_METHOD,
  CHANGE_PAYMENT_METHOD_SUCCESS,
  CHANGE_PAYMENT_METHOD_FAIL,
  CHANGE_CURRENCY,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL,
  REACTIVATE_SUBSCRIPTION,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_FAIL,
  BECOME_A_SELLER,
  BECOME_A_SELLER_SUCCESS,
  BECOME_A_SELLER_FAIL,
  ADD_PAYMENT_METHOD,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_METHOD_FAIL,
  PAYPAL_CONNECT,
  PAYPAL_CONNECT_SUCCESS,
  PAYPAL_CONNECT_FAIL,
  REMOVE_ACCOUNT,
  REMOVE_ACCOUNT_SUCCESS,
  REMOVE_ACCOUNT_FAIL,
  LEAVE_FEEDBACK,
  LEAVE_FEEDBACK_SUCCESS,
  LEAVE_FEEDBACK_FAIL,
} from "../types";

export const changeTheme = (theme) => async (dispatch, getState) => {
  await dispatch({ type: CHANGE_THEME, payload: theme });
};

export const changeCommunity = (community) => async (dispatch, getState) => {
  await dispatch({ type: CHANGE_COMMUNITY, payload: community });
};

// SET TOKEN
// CHECK TOKEN & LOAD USER
export const loadUser = () => async (dispatch, getState) => {
  // User Loading
  await dispatch({ type: USER_LOADING });
  await axios
    .get(`${process.env.HOST}/api/users/get_user/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: LOAD_USER_ERROR,
      });
    });
};
export const getUserByJwt = (token) => async (dispatch, getState) => {
  // User Loading
  await dispatch({ type: USER_LOADING });
  await axios
    .post(`${process.env.HOST}/api/users/get_user_by_email_jwt/`, {
      token: token,
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {});
};
export const login = (data) => async (dispatch, getState) => {
  console.log(data);
  await axios
    .post(`${process.env.HOST}/api/users/login/`, data)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const isEmailAvailable = (email) => async (dispatch, getState) => {
  dispatch({ type: IS_EMAIL_AVAILABLE });
  await axios
    .post(`${process.env.HOST}/api/users/is_email_available/`, email)
    .then((res) => {
      dispatch({
        type: IS_EMAIL_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: IS_EMAIL_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetEmailAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_EMAIL_AVAILABLE });
};
export const isUsernameAvailable = (email) => async (dispatch, getState) => {
  dispatch({ type: IS_USERNAME_AVAILABLE });
  await axios
    .post(`${process.env.HOST}/api/users/is_username_available/`, email)
    .then((res) => {
      dispatch({
        type: IS_USERNAME_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: IS_USERNAME_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetUsernameAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_USERNAME_AVAILABLE });
};
export const isCouponAvailable = (email) => async (dispatch, getState) => {
  dispatch({ type: IS_COUPON_AVAILABLE });
  await axios
    .post(`${process.env.HOST}/api/users/is_coupon_available/`, email)
    .then((res) => {
      dispatch({
        type: IS_COUPON_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: IS_COUPON_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetCouponAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_COUPON_AVAILABLE });
};

export const register = (data, handleClose, resetForm) => async (
  dispatch,
  getState
) => {
  await dispatch({
    type: REGISTER,
  });
  await axios
    .post(`${process.env.HOST}/api/users/signup/`, data)
    .then(async (res) => {
      await dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      await handleClose();
      await resetForm();
    })
    .catch(async (err) => {
      await dispatch({
        type: REGISTER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const logout = () => async (dispatch, getState) => {
  dispatch({ type: LOGOUT_SUCCESS });
};

export const sendVerificationEmail = () => async (dispatch, getState) => {
  dispatch({ type: SEND_VERIFICATION_EMAIL });
  await axios
    .get(
      `${process.env.HOST}/api/users/send_verification_email/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SEND_VERIFICATION_EMAIL_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: SEND_VERIFICATION_EMAIL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const verifyAccount = (token, router) => async (dispatch, getState) => {
  dispatch({ type: VERIFY_ACCOUNT });
  console.log(token);
  await axios
    .post(`${process.env.HOST}/api/users/verify/`, { token: token })
    .then((res) => {
      dispatch({
        type: VERIFY_ACCOUNT_SUCCESS,
      });

      router.push("/");
    })
    .catch((err) => {
      dispatch({
        type: VERIFY_ACCOUNT_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });

      router.push("/");
    });
};

export const validateChangeEmail = (token, router) => async (
  dispatch,
  getState
) => {
  dispatch({ type: VALIDATE_CHANGE_EMAIL });
  await axios
    .post(`${process.env.HOST}/api/users/validate_change_email/`, {
      token: token,
    })
    .then((res) => {
      dispatch({
        type: VALIDATE_CHANGE_EMAIL_SUCCESS,
        payload: res.data,
      });

      router.push("/");
    })
    .catch((err) => {
      dispatch({
        type: VALIDATE_CHANGE_EMAIL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });

      router.push("/");
    });
};
export const forgetPassword = (values) => async (dispatch, getState) => {
  dispatch({ type: FORGET_PASSWORD });
  await axios
    .post(`${process.env.HOST}/api/users/forget_password/`, values)
    .then((res) => {
      dispatch({
        type: FORGET_PASSWORD_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FORGET_PASSWORD_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetPassword = (values, router) => async (dispatch, getState) => {
  dispatch({ type: RESET_PASSWORD });
  await axios
    .post(`${process.env.HOST}/api/users/reset_password/`, values)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });

      router.push("/login");
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });

      router.push("/login");
    });
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_USER });
  await axios
    .patch(
      `${process.env.HOST}/api/users/${getState().userReducer.user.id}/`,
      user,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      });

      dispatch(resetUsernameAvailable());
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const updateUserPicture = (picture) => async (dispatch, getState) => {
  const fd = new FormData();
  fd.append("picture", picture, picture.name);
  dispatch({ type: UPDATE_USER });
  await axios
    .patch(
      `${process.env.HOST}/api/users/${getState().userReducer.user.id}/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data,
      });

      dispatch(resetUsernameAvailable());
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const changePassword = (data) => async (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: CHANGE_PASSWORD,
  });
  await axios
    .post(
      `${process.env.HOST}/api/users/change_password/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: CHANGE_PASSWORD_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_PASSWORD_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
export const resetChangePasswordErrors = () => async (dispatch) => {
  dispatch({ type: RESET_CHANGE_PASSWORD_ERRORS });
};

export const changeEmail = (data) => async (dispatch, getState) => {
  console.log(data);
  dispatch({
    type: CHANGE_EMAIL,
  });
  await axios
    .post(
      `${process.env.HOST}/api/users/change_email/`,
      data,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: CHANGE_EMAIL_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_EMAIL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const stripeConnect = (auth_code) => async (dispatch, getState) => {
  dispatch({
    type: STRIPE_CONNECT,
  });
  await axios
    .post(
      `${process.env.HOST}/api/users/stripe_connect/`,
      { auth_code: auth_code },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: STRIPE_CONNECT_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: STRIPE_CONNECT_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const paypalConnect = (
  values,
  handleClosePaypalConnectModal,
  resetForm
) => async (dispatch, getState) => {
  await dispatch({
    type: PAYPAL_CONNECT,
  });
  await axios
    .post(
      `${process.env.HOST}/api/users/paypal_connect/`,
      values,
      tokenConfig(getState)
    )
    .then(async (res) => {
      console.log(res.data);
      await dispatch({
        type: PAYPAL_CONNECT_SUCCESS,
        payload: res.data,
      });

      await handleClosePaypalConnectModal();
      await resetForm({});
    })
    .catch(async (err) => {
      await dispatch({
        type: PAYPAL_CONNECT_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const toggleView = () => async (dispatch, getState) => {
  const view = getState().userReducer.user.seller_view;

  await axios
    .patch(
      `${process.env.HOST}/api/users/${getState().userReducer.user.id}/`,
      { seller_view: !view },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      location.reload();
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const inviteUser = (
  values,
  resetForm,
  handleHideInviteContact
) => async (dispatch, getState) => {
  dispatch({
    type: INVITE_USER,
  });
  await axios
    .post(
      `${process.env.HOST}/api/users/invite_user/`,
      values,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: INVITE_USER_SUCCESS,
        payload: res.data,
      });
      resetForm({});
      dispatch(resetInviteUser());

      handleHideInviteContact();
    })
    .catch((err) => {
      dispatch({
        type: INVITE_USER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetInviteUser = (values) => async (dispatch, getState) => {
  dispatch({
    type: RESET_INVITE_USER,
  });
};
export const resetAuthErrors = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_AUTH_ERRORS,
  });
};
export const setPendingNotifications = () => async (dispatch, getState) => {
  dispatch({
    type: SET_PENDING_NOTIFICATIONS,
  });
};

export const setPendingMessages = () => async (dispatch, getState) => {
  dispatch({
    type: SET_PENDING_MESSAGES,
  });
};
export const unsetPendingNotifications = () => async (dispatch, getState) => {
  dispatch({
    type: UNSET_PENDING_NOTIFICATIONS,
  });
};

export const unsetPendingMessages = () => async (dispatch, getState) => {
  dispatch({
    type: UNSET_PENDING_MESSAGES,
  });
};

export const addBillingInformation = (values, payment_method) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: ADD_BILLING_INFORMATION,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/seller_add_payment_method/`,
      {
        ...values,
        payment_method_id: payment_method.id,
      },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ADD_BILLING_INFORMATION_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: ADD_BILLING_INFORMATION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const loadCurrency = () => async (dispatch) => {
  // User Loading
  const currency = localStorage.getItem("currency");
  if (currency) return;
  await axios
    .get(`${process.env.HOST}/api/users/get_currency/`)
    .then(async (res) => {
      await dispatch({
        type: CHANGE_CURRENCY,
        payload: res.data.currency,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: CHANGE_CURRENCY,
        payload: "USD",
      });
    });
};

export const changeCurrency = (currency) => async (dispatch, getState) => {
  await dispatch({
    type: CHANGE_CURRENCY,
    payload: currency,
  });
  if (getState().userReducer.is_authenticated) {
    await dispatch(updateUser({ currency: currency }));
  }
};

export const changePaymentMethod = (
  values,
  handleCloseChangePaymentMethod,
  resetForm
) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_PAYMENT_METHOD,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/seller_change_payment_method/`,
      values,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: CHANGE_PAYMENT_METHOD_SUCCESS,
        payload: res.data,
      });
      resetForm({});
      handleCloseChangePaymentMethod();
    })
    .catch((err) => {
      dispatch({
        type: CHANGE_PAYMENT_METHOD_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const cancelSubscription = (handleHideModal) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: CANCEL_SUBSCRIPTION,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/seller_cancel_subscription/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch();

      dispatch({
        type: CANCEL_SUBSCRIPTION_SUCCESS,
        payload: res.data,
      });
      handleHideModal();
    })
    .catch((err) => {
      dispatch({
        type: CANCEL_SUBSCRIPTION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const reactivateSubscription = () => async (dispatch, getState) => {
  dispatch({
    type: REACTIVATE_SUBSCRIPTION,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/seller_reactivate_subscription/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch();

      dispatch({
        type: REACTIVATE_SUBSCRIPTION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: REACTIVATE_SUBSCRIPTION_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const becomeASeller = () => async (dispatch, getState) => {
  dispatch({
    type: BECOME_A_SELLER,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/become_a_seller/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch();

      dispatch({
        type: BECOME_A_SELLER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: BECOME_A_SELLER_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const attachPlanPaymentMethod = (
  values,
  handleCloseAddPaymentMethod,
  resetForm
) => async (dispatch, getState) => {
  dispatch({
    type: ADD_PAYMENT_METHOD,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/attach_plan_payment_method/`,
      values,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ADD_PAYMENT_METHOD_SUCCESS,
        payload: res.data,
      });
      resetForm({});
      handleCloseAddPaymentMethod();
    })
    .catch((err) => {
      dispatch({
        type: ADD_PAYMENT_METHOD_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const attachPaymentMethod = (
  values,
  handleCloseAddPaymentMethod,
  resetForm
) => async (dispatch, getState) => {
  dispatch({
    type: ADD_PAYMENT_METHOD,
  });
  await axios
    .patch(
      `${process.env.HOST}/api/users/attach_payment_method/`,
      values,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: ADD_PAYMENT_METHOD_SUCCESS,
        payload: res.data,
      });
      resetForm({});
      handleCloseAddPaymentMethod();
    })
    .catch((err) => {
      dispatch({
        type: ADD_PAYMENT_METHOD_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const removeAccount = (router) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ACCOUNT,
  });
  await axios
    .delete(
      `${process.env.HOST}/api/users/${getState().userReducer.user.id}/`,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: REMOVE_ACCOUNT_SUCCESS,
        payload: res.data,
      });
      window.scrollTo(0, 0);
      await router.push("/");
    })
    .catch(async (err) => {
      await dispatch({
        type: REMOVE_ACCOUNT_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const sendFeedback = (
  data,
  resetForm,
  handleCloseLeaveFeedback
) => async (dispatch, getState) => {
  dispatch({
    type: LEAVE_FEEDBACK,
  });
  await axios
    .post(
      `${process.env.HOST}/api/users/leave_feedback/`,
      data,
      tokenConfig(getState)
    )
    .then(async (res) => {
      await dispatch({
        type: LEAVE_FEEDBACK_SUCCESS,
        payload: res.data,
      });
      resetForm({});
      handleCloseLeaveFeedback();
    })
    .catch(async (err) => {
      await dispatch();

      await dispatch({
        type: LEAVE_FEEDBACK_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  let token = getState().userReducer.access_token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
