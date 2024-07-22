import { CredentialResponse } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, loginWithGoogle, signupUser } from "../services/ApiService";
import { useJwt, decodeToken } from "react-jwt";
import { IErrorResponse, ISignupDTO } from "../types/type";
import { useToast } from "./useToast";
import { resetTask } from "../redux/slice/taskSlice";
import { useDispatch } from "react-redux";

const useAuthenticate = () => {
  // check if user is authenticated by checking if token is present in local storage
  const isAuthenticated = localStorage.getItem("at") ? true : false;
  const { toast } = useToast();
  const at = localStorage.getItem("at");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { decodedToken } = useJwt(at || "");

  const onLogin = async (data: any) => {
    try {
      const res = await loginUser(data);
      //@ts-ignore
      localStorage.setItem("at", res.at);
      toast({
        variant: "default",
        title: "Welcome back!",
      });
      navigate("/dashboard");
    } catch (error: any) {
      throw error;
    }
  };
  const onSignup = async (data: ISignupDTO) => {
    try {
      const res = await signupUser(data);
      //@ts-ignore
      localStorage.setItem("at", res.at);
      navigate("/dashboard");
      toast({
        variant: "default",
        title: "Welcome !",
        description: "May you never miss a deadline again",
      });
    } catch (error: any) {
      throw error;
    }
  };
  const onLogut = () => {
    // remove token from local storage
    localStorage.removeItem("at");
    dispatch(resetTask());
    navigate("/login");
  };
  const onGoogleLoginSuccess = async (data: CredentialResponse) => {
    const res = await loginWithGoogle(data);
    //@ts-ignore
    localStorage.setItem("at", res.at);
    toast({
      variant: "default",
      title: "Welcome back!",
    });
    navigate("/dashboard");
  };
  const onGoogleLoginError = () => {
    console.log("error");
    toast({
      variant: "default",
      title: "Error",
      description: "An error occured while logging in",
    });
  };

  return {
    isAuthenticated,
    onLogin,
    onSignup,
    onLogut,
    onGoogleLoginSuccess,
    onGoogleLoginError,
    at,
    decodedToken,
  };
};

export default useAuthenticate;
