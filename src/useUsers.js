import React, { useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import api from "./service/api"

export default function useUsers() {
  const getToken= () => {
    const tokenString = localStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token] = useStateIfMounted(getToken());
  const [user, setUser] = useStateIfMounted();
  
  if(token !== undefined){
    api.getUsers().then((res) => {
        setUser(res[0].is_superuser);
    });
  }

  return {
    user
  };
}