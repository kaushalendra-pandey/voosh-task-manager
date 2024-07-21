// create a global axios instance
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("at"),
    }, 
});

export default axiosInstance;