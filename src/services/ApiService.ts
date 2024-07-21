import { IErrorResponse, INewTask, IUser } from "../types/type";
import axios from "axios";
import axiosInstance from "./AxiosInstance";

export const getUserInfo = async (
  userId: string
): Promise<any | IErrorResponse> => {
  try {
    const res = await axiosInstance.get(`/user/${userId}`);
    return res.data;
  } catch (error: any) {
    return {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
};

export const loginUser = async (
  data: any
): Promise<{ at: string } | IErrorResponse> => {
  try {
    const res = await axiosInstance.post(`/auth/login`, data);
    return res.data;
  } catch (error: any) {
    throw {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
};

export const loginWithGoogle = async (
  data: any
): Promise<{ at: string } | IErrorResponse> => {
  try {
    const res = await axiosInstance.post(`/auth/google`, data);
    return res.data;
  } catch (error: any) {
    throw {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
}

export const signupUser = async (
  data: any
): Promise<{ at: string } | IErrorResponse> => {
  try {
    const res = await axiosInstance.post(`/auth/signup`, data);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw  {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
}

export const createTask = async (
  data: INewTask
): Promise<any | IErrorResponse> => {
  try {
    const res = await axiosInstance.post(`/task`, data);
    return res.data;
  } catch (error: any) {
    throw {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
};

export const moveTask = async ({
  taskId,
  boardId,
}: {
  taskId: string;
  boardId: string;
}): Promise<any | IErrorResponse> => {
  try {
    const res = await axiosInstance.post(`/task/${taskId}/move`, { boardId });
    return res.data;
  } catch (error: any) {
    throw {
      message: error.message,
      status: error.response.status,
      data: error.response.data,
    };
  }
};

export const deleteTask = async (
    taskId: string
    ): Promise<any | IErrorResponse> => {
    try {
        const res = await axiosInstance.delete(`/task/${taskId}`);
        return res.data;
    } catch (error: any) {
        throw {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        };
    }
}

export const editTask = async (
    taskId: string,
    data: INewTask
    ): Promise<any | IErrorResponse> => {
    try {
        const res = await axiosInstance.put(`/task/${taskId}`, data);
        return res.data;
    } catch (error: any) {
        throw {
        message: error.message,
        status: error.response.status,
        data: error.response.data,
        };
    }
}
