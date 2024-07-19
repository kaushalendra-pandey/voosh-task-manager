import { CredentialResponse } from "@react-oauth/google";
import React from "react";
import { useNavigate } from "react-router-dom";


const useAuthenticate = () => {
  // check if user is authenticated by checking if token is present in local storage
  const isAuthenticated = localStorage.getItem("at") ? true : false;
  const navigate = useNavigate();

  const onLogin = (data: any) => {}
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
    onGoogleLoginError
  };
};

export default useAuthenticate;
