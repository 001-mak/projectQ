import axios from "axios";
import authHeader from "./auth-header";
import { envirnoment } from "../envirnoment";

const baseURL = envirnoment.BaseURL;
/**
 * 
 * @param {*} url  e.g /booking/confirm
 * @param {*} body 
 * @returns 
 */
const post = (url, body) => {
    return axios.post(baseURL + url, body, { headers: authHeader() }).then((response) => {
        return response;
    }).catch(err => {
        if (err.response.status == 401) {
            localStorage.removeItem("user");
            window.location.href = '/';
        }
    });
};

const put = (url, body) => {
    return axios.put(baseURL + url, body, { headers: authHeader() }).then((response) => {
        return response;
    }).catch(err => {
        if (err.response.status == 401) {
            localStorage.removeItem("user");
            window.location.href = '/';
        }
    });
};

const get = (url, extra = {}) => {
    return axios.get(url, { ...extra,  headers: authHeader() }).then((response) => {
        return response;
    }).catch(err => {
        return err;
        // if (err.response.status == 401) {
        //     localStorage.removeItem("user");
        //     window.location.href = '/';
        // }
    });
};

const deleteCall = (url) => {
    return axios.delete(baseURL + url, { headers: authHeader() }).then((response) => {
        return response;
    }).catch(err => {
        if (err.response.status == 401) {
            localStorage.removeItem("user");
            window.location.href = '/';
        }
    });
};

export default {
    get,
    post,
    put,
    deleteCall
};