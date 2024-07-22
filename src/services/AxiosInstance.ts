// create a global axios instance
import axios, { AxiosResponse } from "axios";

/**
 * Create an axios instance with a base URL and a timeout of 10 seconds
 */
const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("at"),
    }, 
});

/**
 * Add a request interceptor to make sure that the token is added to the request headers
 * before the request is sent
 */
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("at");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Add a response interceptor to handle the response from the server
 * if code is 401, redirect to login page
 */
axiosInstance.interceptors.response.use((response:any) => {
    if (response.status === 401) {
        localStorage.removeItem("at");
        window.location.href = "/login";
        return
    }   
    return response;
})

export default axiosInstance;