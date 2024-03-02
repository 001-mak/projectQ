import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (body) => (dispatch) => {
  return AuthService.register(body).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "User detail are invalid";
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (body) => (dispatch) => {
  return AuthService.login(body).then(
    (data) => {
      console.log(data)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user },
      });

      return Promise.resolve();
    },
    (error) => {
      const message = "Email or password incorrect";

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const verifyAccount = (username, code) => (dispatch) => {
  return AuthService.verifyAccount(username, code).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Account verified successfully',
      });

      return Promise.resolve();
    },
    (error) => {
   
      dispatch({
        type: SET_MESSAGE,
        payload: 'Account verified Failed',
      });

      return Promise.reject();
    }
  );
};

export const forgotPassword = (username) => (dispatch) => {
  return AuthService.forgotPassword(username).then(
    (data) => {
      return Promise.resolve();
    },
    (error) => {

      dispatch({
        type: SET_MESSAGE,
        payload: 'Check your inbox for varification code.',
      });

      return Promise.reject();
    }
  );
};

export const confirmPassword = (username, password, code) => (dispatch) => {
  return AuthService.confirmPassword(username, password, code).then(
    (data) => {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Password reset successfull',
      });
      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: SET_MESSAGE,
        payload: 'Failed to reset password',
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
