import axios from "axios";
import getHeader from "./config";
import store from './store/index'
//import router from './router/index'

const axiosInstance = axios.create({
  headers: {
    Accept: getHeader().Accept,
    Authorization: getHeader().Authorization,
  },
});

// logout if unauthorized user
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
        // I should logout the client 
        localStorage.removeItem("token");
        console.log('Token from axiosInstance : Bearer ' + store.getters.getToken)
        store.commit('REMOVE_CLIENT_DATE');
    }
    return error;
  }
);

export default axiosInstance;
