import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL+'/';

const getHome = () => {
  return axios.get(API_URL );
};

const getHello = () => {
  return axios.get(API_URL + 'hello' );
};


export default {
  getHome,
  getHello
};