import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../actions/types";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const user = JSON.parse(localStorage.getItem("user"));

const decodedJwt = parseJwt(user?.token);
if(user && decodedJwt){
  user.role = decodedJwt.Role;
  user.verified = decodedJwt.Verified;
}
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const stateObj = (state = initialState, action) => {
  console.log("reducer:",state)
  
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      const decodedJwt = parseJwt(payload?.token);
      if(payload && decodedJwt){
        payload.role = decodedJwt.Role;
        payload.verified = decodedJwt.Verified;
      }
      console.log(payload);
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

export default stateObj;