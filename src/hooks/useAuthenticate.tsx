import { CredentialResponse } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/ApiService";
import { useJwt } from "react-jwt";



const useAuthenticate = () => {
  // check if user is authenticated by checking if token is present in local storage
  const isAuthenticated = localStorage.getItem("at") ? true : false;
  const at = localStorage.getItem("at");
  const navigate = useNavigate();

  const { decodedToken, isExpired } = useJwt(at || "");

  const onLogin = async (data: any) => {
    try {
        const res = await loginUser(data);
        //@ts-ignore
        localStorage.setItem("at", res.at);
        navigate("/dashboard");
    } catch (error) {
        console.log(error);
    }
  }
  const onSignup = (data: any) => {}
  const onLogut = () => {
    // remove token from local storage
    localStorage.removeItem("at");
    navigate("/login");
  }
  const onGoogleLoginSuccess = (data:CredentialResponse) => {}
  const onGoogleLoginError = () => {}

  return {
    isAuthenticated,
    onLogin,
    onSignup,
    onLogut,
    onGoogleLoginSuccess,
    onGoogleLoginError,
    at,
    decodedToken
  };
};

export default useAuthenticate;
