import {
  CHANGE_THEME,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  RESET_CHANGE_PASSWORD_ERRORS,
  CHANGE_EMAIL,
  CHANGE_EMAIL_SUCCESS,
  CHANGE_EMAIL_FAIL,
  SET_STRIPE_CUSTOMER_DATA,
  RESET_AUTH_ERRORS,
  TOOGLE_VIEWS,
  IS_EMAIL_AVAILABLE,
  IS_EMAIL_AVAILABLE_SUCCESS,
  IS_EMAIL_AVAILABLE_FAIL,
  RESET_EMAIL_AVAILABLE,
  IS_COUPON_AVAILABLE,
  IS_COUPON_AVAILABLE_SUCCESS,
  IS_COUPON_AVAILABLE_FAIL,
  RESET_COUPON_AVAILABLE,
  IS_USERNAME_AVAILABLE,
  IS_USERNAME_AVAILABLE_SUCCESS,
  IS_USERNAME_AVAILABLE_FAIL,
  RESET_USERNAME_AVAILABLE,
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
  STRIPE_CONNECT,
  STRIPE_CONNECT_SUCCESS,
  STRIPE_CONNECT_FAIL,
  CHANGE_PAYMENT_METHOD,
  CHANGE_PAYMENT_METHOD_SUCCESS,
  CHANGE_PAYMENT_METHOD_FAIL,
  CHANGE_CURRENCY,
  BECOME_A_SELLER,
  BECOME_A_SELLER_SUCCESS,
  BECOME_A_SELLER_FAIL,
  ADD_PAYMENT_METHOD,
  ADD_PAYMENT_METHOD_SUCCESS,
  ADD_PAYMENT_METHOD_FAIL,
  SET_NEW_EARNINGS_TO_USER,
  PAYPAL_CONNECT,
  PAYPAL_CONNECT_SUCCESS,
  PAYPAL_CONNECT_FAIL,
  REMOVE_ACCOUNT,
  REMOVE_ACCOUNT_SUCCESS,
  REMOVE_ACCOUNT_FAIL,
  LEAVE_FEEDBACK,
  LEAVE_FEEDBACK_SUCCESS,
  LEAVE_FEEDBACK_FAIL,
  CHANGE_COMMUNITY_FILTER,
  CHANGE_STATUS_FILTER,
  ADD_KARMA_AMOUNT,
  SUBSTRACT_KARMA_AMOUNT,
  ADD_INVITATION,
  SUBSTRACT_INVITATION,
  ADD_CONNECTION,
  SUBSTRACT_CONNECTION,
  ADD_FOLLOW,
  SUBSTRACT_FOLLOW,
  ADD_POST_COUNT,
  SUBSTRACT_POST_COUNT,
  ADD_CREATED_POST_COUNT,
  SUBSTRACT_CREATED_POST_COUNT,
  ADD_CREATED_ACTIVE_POST_COUNT,
  SUBSTRACT_CREATED_ACTIVE_POST_COUNT,
  ADD_CREATED_SOLVED_POST_COUNT,
  SUBSTRACT_CREATED_SOLVED_POST_COUNT,
  UPDATE_GEOLOCATION,
  UPDATE_GEOLOCATION_SUCCESS,
  UPDATE_GEOLOCATION_FAIL,
  SET_PAYMENT_METHODS,
} from "../types";

const initialState = {
  theme: process.browser && localStorage.getItem("theme"),
  currency: process.browser && localStorage.getItem("currency"),
  community_filter: "",
  status_filter: "",
  access_token: process.browser && localStorage.getItem("access_token"),
  is_authenticated: null,
  is_loading: true,
  user: null,
  error: null,
  registing: false,
  register_error: null,
  is_updating_user: false,
  update_user_error: null,
  is_changing_password: false,
  change_password_error: null,
  is_changing_email: false,
  change_email_error: null,
  stripe_connecting: false,
  stripe_connecting_error: null,
  email_available_loading: false,
  email_available: false,
  email_available_error: null,
  username_available_loading: false,
  username_available: false,
  username_available_error: null,
  coupon_available_loading: false,
  coupon_available: false,
  coupon_available_error: null,
  sending_verification_email: false,
  send_verification_email_error: null,
  verifing_account: false,
  verify_account_error: null,
  validating_change_email: false,
  validate_change_email_error: null,
  sending_forget_password_email: false,
  forget_password_error: null,
  resetting_password: false,
  reset_password_error: null,
  inviting_user: false,
  invite_user_error: null,
  stripe_connecting: false,
  stripe_connect_error: null,
  adding_billing_information: false,
  add_billing_information_error: null,
  changing_payment_method: false,
  change_payment_method_error: null,
  fetching_invoices: false,
  fetch_invoice_error: null,

  becoming_a_seller: false,
  become_a_seller_error: null,
  adding_payment_method: false,
  add_payment_method_error: null,
  paypal_connecting: false,
  paypal_connect_error: null,
  removing_account: false,
  remove_account_error: null,
  leaving_feedback: false,
  leave_feedback_error: null,
  is_updating_geolocation: false,
  update_geolocation_error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    case CHANGE_COMMUNITY_FILTER:
      return {
        ...state,
        community_filter: action.payload,
      };
    case CHANGE_STATUS_FILTER:
      return {
        ...state,
        status_filter: action.payload,
      };
    case CHANGE_CURRENCY:
      localStorage.setItem("currency", action.payload);

      return {
        ...state,
        currency: action.payload,
      };

    case USER_LOADING:
      return {
        ...state,
        is_loading: true,
      };
    case USER_LOADED:
      //   console.log(action.payload);
      action.payload.user.currency &&
        localStorage.setItem("currency", action.payload.user.currency);

      return {
        ...state,
        is_authenticated: true,
        is_loading: false,
        error: null,
        ...action.payload,
        currency: action.payload.user.currency,
      };
    case LOGIN_SUCCESS:
      process.browser &&
        localStorage.setItem("access_token", action.payload.access_token);
      action.payload.user.currency &&
        localStorage.setItem("currency", action.payload.user.currency);
      return {
        ...state,
        user: action.payload.user,
        currency: action.payload.user.currency,
        access_token: action.payload.access_token,
        is_authenticated: true,
        is_loading: false,
        haveAccess: action.payload.have_access,
        error: null,
      };
    case IS_EMAIL_AVAILABLE:
      return {
        ...state,
        email_available_loading: true,
      };
    case IS_EMAIL_AVAILABLE_SUCCESS:
      return {
        ...state,
        email_available_loading: false,

        email_available: action.payload.email,
        email_available_error: null,
      };
    case IS_EMAIL_AVAILABLE_FAIL:
      return {
        ...state,
        email_available_loading: false,

        email_available: false,
        email_available_error: action.payload,
      };
    case RESET_EMAIL_AVAILABLE:
      return {
        ...state,
        email_available: false,
        email_available_error: null,
      };
    case IS_COUPON_AVAILABLE:
      return {
        ...state,
        coupon_available_loading: true,
      };
    case IS_COUPON_AVAILABLE_SUCCESS:
      return {
        ...state,
        coupon_available_loading: false,
        coupon_available: action.payload.coupon,
        coupon_available_error: null,
      };
    case IS_COUPON_AVAILABLE_FAIL:
      return {
        ...state,
        coupon_available_loading: false,

        coupon_available: false,
        coupon_available_error: action.payload,
      };
    case RESET_COUPON_AVAILABLE:
      return {
        ...state,
        coupon_available: false,
        coupon_available_error: null,
      };
    case IS_USERNAME_AVAILABLE:
      return {
        ...state,
        username_available_loading: true,
      };
    case IS_USERNAME_AVAILABLE_SUCCESS:
      return {
        ...state,
        username_available: action.payload.message,
        username_available_error: null,
      };
    case IS_USERNAME_AVAILABLE_FAIL:
      return {
        ...state,
        username_available: false,
        username_available_error: action.payload,
      };
    case RESET_USERNAME_AVAILABLE:
      return {
        ...state,
        username_available: false,
        username_available_error: null,
      };
    case REGISTER:
      return {
        ...state,
        registing: true,
      };
    case REGISTER_SUCCESS:
      console.log("action.payload", action.payload);
      process.browser &&
        localStorage.setItem("access_token", action.payload.access_token);
      action.payload.user.currency &&
        localStorage.setItem("currency", action.payload.user.currency);
      return {
        ...state,
        registing: false,
        register_error: null,
        user: action.payload.user,
        currency: action.payload.user.currency,
        access_token: action.payload.access_token,
        is_authenticated: true,
        is_loading: false,
        error: null,
        haveAccess: action.payload.have_access,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registing: false,
        register_error: action.payload,
        access_token: null,
        user: null,
        rating: null,
        is_authenticated: false,
        is_loading: false,
      };
    case LOAD_USER_ERROR:
      process.browser && localStorage.removeItem("access_token");

      return {
        ...state,
        access_token: null,
        user: null,
        rating: null,
        is_authenticated: false,
        is_loading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
      process.browser && localStorage.removeItem("access_token");
      return {
        ...state,
        access_token: null,
        user: null,
        rating: null,
        is_authenticated: false,
        is_loading: false,
        error: action.payload,
      };
    case RESET_AUTH_ERRORS:
      return {
        ...state,
        error: null,
        register_error: null,
      };
    // case TOOGLE_VIEWS:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       seller_view: action.payload,
    //     },
    //   };
    case SEND_VERIFICATION_EMAIL:
      return {
        ...state,
        sending_verification_email: true,
      };
    case SEND_VERIFICATION_EMAIL_SUCCESS:
      return {
        ...state,
        sending_verification_email: false,
        send_verification_email_error: null,
      };
    case SEND_VERIFICATION_EMAIL_FAIL:
      return {
        ...state,
        sending_verification_email: false,
        send_verification_email_error: action.payload,
      };
    case VERIFY_ACCOUNT:
      return {
        ...state,
        verifing_account: true,
      };
    case VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        verifing_account: false,
        user: {
          ...state.user,
          is_verified: true,
        },
        verify_account_error: null,
      };
    case VERIFY_ACCOUNT_FAIL:
      return {
        ...state,
        verifing_account: false,
        verify_account_error: action.payload,
      };
    case VALIDATE_CHANGE_EMAIL:
      return {
        ...state,
        validating_change_email: true,
      };
    case VALIDATE_CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        validating_change_email: false,
        user: {
          ...state.user,
          email: action.payload.email,
        },
        validate_change_email_error: null,
      };
    case VALIDATE_CHANGE_EMAIL_FAIL:
      return {
        ...state,
        validating_change_email: false,
        validate_change_email_error: action.payload,
      };
    case FORGET_PASSWORD:
      return {
        ...state,
        sending_forget_password_email: true,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        sending_forget_password_email: false,
        user: {
          ...state.user,
          email: action.payload.email,
        },
        forget_password_error: null,
      };
    case FORGET_PASSWORD_FAIL:
      return {
        ...state,
        sending_forget_password_email: false,
        forget_password_error: action.payload,
      };
    case RESET_PASSWORD:
      return {
        ...state,
        resetting_password: true,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetting_password: false,
        user: {
          ...state.user,
          email: action.payload.email,
        },
        reset_password_error: null,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        resetting_password: false,
        reset_password_error: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        is_updating_user: true,
      };
    case UPDATE_USER_SUCCESS:
      action.payload.currency &&
        localStorage.setItem("currency", action.payload.currency);
      return {
        ...state,
        is_updating_user: false,
        user: { ...state.user, ...action.payload },
        currency: action.payload.currency,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        is_updating_user: false,
        update_user_error: action.payload,
      };
    case UPDATE_GEOLOCATION:
      return {
        ...state,
        is_updating_geolocation: true,
      };
    case UPDATE_GEOLOCATION_SUCCESS:
      return {
        ...state,
        is_updating_geolocation: false,
        user: action.payload,
        update_geolocation_error: null,
      };
    case UPDATE_GEOLOCATION_FAIL:
      return {
        ...state,
        is_updating_geolocation: false,
        update_geolocation_error: action.payload,
      };
    case CHANGE_EMAIL:
      return {
        ...state,
        is_changing_email: true,
      };
    case CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        is_changing_email: false,
      };
    case CHANGE_EMAIL_FAIL:
      return {
        ...state,
        is_changing_email: false,
        change_email_error: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        is_changing_password: true,
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        is_changing_password: false,
        change_password_error: null,
      };
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        is_changing_password: false,
        change_password_error: action.payload,
      };
    case RESET_CHANGE_PASSWORD_ERRORS:
      return {
        ...state,
        change_password_error: null,
      };
    case SET_STRIPE_CUSTOMER_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          stripe_customer_id: action.payload.customer_id,
          payment_methods: action.payload.payment_methods,
        },
      };

    case STRIPE_CONNECT:
      return {
        ...state,
        stripe_connecting: true,
      };
    case STRIPE_CONNECT_SUCCESS:
      return {
        ...state,
        stripe_connecting: false,
        user: {
          ...state.user,
          stripe_account_id: action.payload.stripe_account_id,
          stripe_dashboard_url: action.payload.stripe_dashboard_url,
        },
      };
    case STRIPE_CONNECT_FAIL:
      return {
        ...state,
        stripe_connecting: false,
        stripe_connect_error: action.payload,
      };
    case PAYPAL_CONNECT:
      return {
        ...state,
        paypal_connecting: true,
      };
    case PAYPAL_CONNECT_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          paypal_email: action.payload.email,
        },
      };
    case PAYPAL_CONNECT_FAIL:
      return {
        ...state,
        paypal_connecting: false,
        paypal_connect_error: action.payload,
      };
    case INVITE_USER:
      return {
        ...state,
        inviting_user: true,
      };
    case INVITE_USER_SUCCESS:
      return {
        ...state,
        inviting_user: false,
        invite_user_error: null,
      };
    case INVITE_USER_FAIL:
      return {
        ...state,
        inviting_user: false,
        invite_user_error: action.payload,
      };
    case RESET_INVITE_USER:
      return {
        ...state,
        inviting_user: false,
        invite_user_error: null,
      };
    case SET_PENDING_NOTIFICATIONS:
      return {
        ...state,
        user: {
          ...state.user,
          pending_notifications: true,
        },
      };
    case SET_PENDING_MESSAGES:
      return {
        ...state,
        user: {
          ...state.user,
          pending_messages: true,
        },
      };
    case UNSET_PENDING_NOTIFICATIONS:
      return {
        ...state,
        user: {
          ...state.user,
          pending_notifications: false,
        },
      };
    case UNSET_PENDING_MESSAGES:
      return {
        ...state,
        user: {
          ...state.user,
          pending_messages: false,
        },
      };

    case CHANGE_PAYMENT_METHOD:
      return {
        ...state,
        changing_payment_method: true,
      };
    case CHANGE_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        user: action.payload,
        changing_payment_method: false,
      };
    case CHANGE_PAYMENT_METHOD_FAIL:
      return {
        ...state,
        changing_payment_method: false,
        change_payment_method_error: action.payload,
      };

    case BECOME_A_SELLER:
      return {
        ...state,
        becoming_a_seller: true,
      };
    case BECOME_A_SELLER_SUCCESS:
      return {
        ...state,
        becoming_a_seller: false,
        become_a_seller_error: null,
        user: action.payload,
      };
    case BECOME_A_SELLER_FAIL:
      return {
        ...state,
        becoming_a_seller: false,
        become_a_seller_error: action.payload,
      };
    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        adding_payment_method: true,
      };
    case ADD_PAYMENT_METHOD_SUCCESS:
      return {
        ...state,
        adding_payment_method: false,
        add_payment_method_error: null,
        user: action.payload,
      };
    case ADD_PAYMENT_METHOD_FAIL:
      return {
        ...state,
        adding_payment_method: false,
        add_payment_method_error: action.payload,
      };
    case SET_NEW_EARNINGS_TO_USER:
      console.log("withdrawn amount", parseFloat(action.payload));
      return {
        ...state,
        user: {
          ...state.user,
          withdrawn: (
            parseFloat(state.user.withdrawn) + parseFloat(action.payload)
          ).toFixed(2),
          available_for_withdrawal: (
            parseFloat(state.user.available_for_withdrawal) -
            parseFloat(action.payload)
          ).toFixed(2),
        },
      };
    case REMOVE_ACCOUNT:
      return {
        ...state,
        removing_account: true,
      };
    case REMOVE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: null,
        is_authenticated: false,
        removing_account: false,
        remove_account_error: null,
      };
    case REMOVE_ACCOUNT_FAIL:
      return {
        ...state,
        removing_account: false,
        remove_account_error: action.payload,
      };
    case LEAVE_FEEDBACK:
      return {
        ...state,
        leaving_feedback: true,
      };
    case LEAVE_FEEDBACK_SUCCESS:
      return {
        ...state,
        leaving_feedback: false,
        leave_feedback_error: null,
      };
    case LEAVE_FEEDBACK_FAIL:
      return {
        ...state,
        leaving_feedback: false,
        leave_feedback_error: action.payload,
      };
    case ADD_KARMA_AMOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          karma_amount: state.user?.member?.karma_amount + action.payload,
        },
      };
    case SUBSTRACT_KARMA_AMOUNT:
      return {
        ...state,
        user: {
          ...state.user,
          karma_amount: state.user?.member?.karma_amount - action.payload,
        },
      };
    case ADD_INVITATION:
      return {
        ...state,
        user: {
          ...state.user,
          invitations_count: ++state.user.invitations_count,
        },
      };
    case SUBSTRACT_INVITATION:
      return {
        ...state,
        user: {
          ...state.user,
          invitations_count: --state.user.invitations_count,
        },
      };
    case ADD_CONNECTION:
      return {
        ...state,
        user: {
          ...state.user,
          connections_count: ++state.user.connections_count,
        },
      };
    case SUBSTRACT_CONNECTION:
      return {
        ...state,
        user: {
          ...state.user,
          connections_count: --state.user.connections_count,
        },
      };
    case ADD_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following_count: ++state.user.following_count,
        },
      };
    case SUBSTRACT_FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          following_count: --state.user.following_count,
        },
      };
    case ADD_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          posts_count: ++state.user.posts_count,
        },
      };
    case SUBSTRACT_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          posts_count: --state.user.posts_count,
        },
      };
    case ADD_CREATED_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          created_posts_count: ++state.user.created_posts_count,
        },
      };
    case SUBSTRACT_CREATED_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          created_posts_count: --state.user.created_posts_count,
        },
      };
    case ADD_CREATED_ACTIVE_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          created_active_posts_count: ++state.user.created_active_posts_count,
        },
      };
    case SUBSTRACT_CREATED_ACTIVE_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          created_active_posts_count: --state.user.created_active_posts_count,
        },
      };
    case ADD_CREATED_SOLVED_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          created_solved_posts_count: ++state.user.created_solved_posts_count,
        },
      };
    case SUBSTRACT_CREATED_SOLVED_POST_COUNT:
      return {
        ...state,
        user: {
          ...state.user,
          created_solved_posts_count: --state.user.created_solved_posts_count,
        },
      };
    case SET_PAYMENT_METHODS:
      return {
        ...state,
        user: {
          ...state.user,
          payment_methods: action.payload,
        },
      };
    default:
      return state;
  }
}
