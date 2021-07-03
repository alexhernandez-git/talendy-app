import axios from "axios";
import {
  FETCH_PORTAL,
  FETCH_PORTAL_SUCCESS,
  FETCH_PORTAL_FAIL,
  UPDATE_PORTAL,
  UPDATE_PORTAL_SUCCESS,
  UPDATE_PORTAL_FAIL,
  IS_NAME_AVAILABLE,
  IS_NAME_AVAILABLE_SUCCESS,
  IS_NAME_AVAILABLE_FAIL,
  IS_URL_AVAILABLE,
  IS_URL_AVAILABLE_SUCCESS,
  IS_URL_AVAILABLE_FAIL,
  RESET_NAME_AVAILABLE,
  RESET_URL_AVAILABLE,
  ADD_BILLING_INFORMATION,
  ADD_BILLING_INFORMATION_SUCCESS,
  ADD_BILLING_INFORMATION_FAIL,
  SET_PAYMENT_METHODS,
  CHANGE_PAYMENT_METHOD_PORTAL,
  CHANGE_PAYMENT_METHOD_PORTAL_SUCCESS,
  CHANGE_PAYMENT_METHOD_PORTAL_FAIL,
  CHANGE_PLAN,
  CHANGE_PLAN_SUCCESS,
  CHANGE_PLAN_FAIL,
  CANCEL_SUBSCRIPTION,
  CANCEL_SUBSCRIPTION_SUCCESS,
  CANCEL_SUBSCRIPTION_FAIL,
  REACTIVATE_SUBSCRIPTION,
  REACTIVATE_SUBSCRIPTION_SUCCESS,
  REACTIVATE_SUBSCRIPTION_FAIL,
} from "../types";
import { createAlert } from "./alerts";
import { tokenConfig } from "./auth";

export const fetchPortal = () => async (dispatch, getState) => {
  await dispatch({
    type: FETCH_PORTAL,
  });

  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .get(`${process.env.HOST}/api/${subdomain}/portals/${subdomain}/`)
    .then(async (res) => {
      await dispatch({
        type: FETCH_PORTAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: FETCH_PORTAL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const isNameAvailable = (values) => async (dispatch, getState) => {
  await dispatch({ type: IS_NAME_AVAILABLE });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .post(
      `${process.env.HOST}/api/${subdomain}/portals/is_name_available/`,
      values
    )
    .then(async (res) => {
      await dispatch({
        type: IS_NAME_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: IS_NAME_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};
export const resetNameAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_NAME_AVAILABLE });
};

export const isUrlAvailable = (values) => async (dispatch, getState) => {
  await dispatch({ type: IS_URL_AVAILABLE });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .post(
      `${process.env.HOST}/api/${subdomain}/portals/is_url_available/`,
      values
    )
    .then(async (res) => {
      await dispatch({
        type: IS_URL_AVAILABLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch(async (err) => {
      await dispatch({
        type: IS_URL_AVAILABLE_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const resetUrlAvailable = () => async (dispatch, getState) => {
  dispatch({ type: RESET_URL_AVAILABLE });
};

export const updatePortal = (portal) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_PORTAL });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/portals/${
        getState().portalReducer.portal.url
      }/`,
      portal,
      tokenConfig(getState)
    )
    .then(async (res) => {
      console.log(res);
      await dispatch({
        type: UPDATE_PORTAL_SUCCESS,
        payload: res.data,
      });

      await dispatch(resetNameAvailable());
      await dispatch(resetUrlAvailable());
      await dispatch(createAlert("SUCCESS", "Portal succesfully updated"));
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PORTAL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const updatePortaLogo = (logo) => async (dispatch, getState) => {
  const fd = new FormData();
  fd.append("logo", logo, logo.name);
  dispatch({ type: UPDATE_PORTAL });
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/portals/${
        getState().portalReducer.portal.url
      }/`,
      fd,
      tokenConfig(getState)
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: UPDATE_PORTAL_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_PORTAL_FAIL,
        payload: { data: err.response?.data, status: err.response?.status },
      });
    });
};

export const addBillingInformation =
  (values, payment_method) => async (dispatch, getState) => {
    dispatch({
      type: ADD_BILLING_INFORMATION,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .patch(
        `${process.env.HOST}/api/${subdomain}/portals/add_billing_information/`,
        {
          ...values,
          payment_method_id: payment_method.id,
        },
        tokenConfig(getState)
      )
      .then(async (res) => {
        console.log(res.data);
        await dispatch({
          type: ADD_BILLING_INFORMATION_SUCCESS,
          payload: res.data?.portal,
        });
        await dispatch({
          type: SET_PAYMENT_METHODS,
          payload: res.data?.payment_methods,
        });
      })
      .catch(async (err) => {
        await dispatch(
          createAlert("ERROR", "Something went wrong with Stripe")
        );
        await dispatch({
          type: ADD_BILLING_INFORMATION_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const changePaymentMethod =
  (values, handleCloseChangePaymentMethod, resetForm) =>
  async (dispatch, getState) => {
    dispatch({
      type: CHANGE_PAYMENT_METHOD_PORTAL,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .patch(
        `${process.env.HOST}/api/${subdomain}/portals/change_payment_method/`,
        values,
        tokenConfig(getState)
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: CHANGE_PAYMENT_METHOD_PORTAL_SUCCESS,
          payload: res.data,
        });
        resetForm({});
        handleCloseChangePaymentMethod();
      })
      .catch((err) => {
        dispatch(createAlert("ERROR", "Something went wrong"));
        dispatch({
          type: CHANGE_PAYMENT_METHOD_PORTAL_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const changePlan =
  (values, handleClose, router) => async (dispatch, getState) => {
    dispatch({
      type: CHANGE_PLAN,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .patch(
        `${process.env.HOST}/api/${subdomain}/portals/change_plan/`,
        values,
        tokenConfig(getState)
      )
      .then(async (res) => {
        console.log(res.data);
        await dispatch({
          type: CHANGE_PLAN_SUCCESS,
          payload: res.data,
        });
        await handleClose();
        await router.push("/dashboard/billing");
      })
      .catch(async (err) => {
        console.log(err.response);
        await dispatch(createAlert("ERROR", "Something went wrong"));
        await dispatch({
          type: CHANGE_PLAN_FAIL,
          payload: { data: err.response?.data, status: err.response?.status },
        });
      });
  };

export const cancelSubscription =
  (handleHideModal) => async (dispatch, getState) => {
    dispatch({
      type: CANCEL_SUBSCRIPTION,
    });
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    await axios
      .patch(
        `${process.env.HOST}/api/${subdomain}/portals/cancel_subscription/`,
        {},
        tokenConfig(getState)
      )
      .then((res) => {
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
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  await axios
    .patch(
      `${process.env.HOST}/api/${subdomain}/portals/reactivate_subscription/`,
      {},
      tokenConfig(getState)
    )
    .then((res) => {
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
