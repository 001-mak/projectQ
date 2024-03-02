import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL+'/protected/';

const getSecret = () => {
  return axios.get(API_URL + "secret", { headers: authHeader() });
};


export default {
  getSecret
};