import React, { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";


export default function useUsers() {
  const getToken= () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token] = useStateIfMounted(getToken());
  const [user, setUser] = useStateIfMounted();
  


  return {
    user
  };
}