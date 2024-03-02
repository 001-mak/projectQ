import axios from "axios";
import { envirnoment } from "../envirnoment";
const API_URL = process.env.REACT_APP_API_URL+'/auth/'; //"http://localhost:8082/auth/";

const register = async (body) => {
  console.log(body)
  return await axios.post(envirnoment.BaseURL + '/auth/register', body).then((response) => {
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data.value));
    }

    return response.data;
  });
};

const login = (body) => {
  return axios
    .post(envirnoment.BaseURL + '/auth/login', body)
    .then((response) => {
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const verifyAccount = (username, code) => {
  return axios
    .post(API_URL + "verify", {
      username,
      code,
    })
    .then((response) => {
      return response.data;
    });
};

const forgotPassword = (username) => {
  return axios
    .post(API_URL + "forgot-password", {
      username
    })
    .then((response) => {
      return response.data;
    });
};
const confirmPassword = (username, password, code) => {
  return axios
    .post(API_URL + "confirm-password", {
      username,
      password,
      code
    })
    .then((response) => {
      return response.data;
    });
};


const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
  verifyAccount,
  forgotPassword,
  confirmPassword
};
