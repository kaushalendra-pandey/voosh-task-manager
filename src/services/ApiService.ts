import { IErrorResponse, IUser } from "../types/type";
import axios from "axios";
import axiosInstance from "./AxiosInstance";

export const getUserInfo = async (userId: string):Promise<IUser | IErrorResponse> => {
    try {
        const res = await axiosInstance.get(`/user/${userId}`);
        return res.data;
    } catch (error:any) {
        return {
            message: error.message,
            status: error.response.status,
            data: error.response.data,
        }
    }
}

export const loginUser = async (data: any):Promise<{at:string} | IErrorResponse> => {
    try {
        const res = await axiosInstance.post(`/auth/login`, data);
        return res.data;
    } catch (error:any) {
        return {
            message: error.message,
            status: error.response.status,
            data: error.response.data,
        }
    }
}