import React, {useState, useEffect} from "react";
import {isLoggedIn} from '../login/LoggedInCheck';
export default function LogOut(){

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());

  useEffect(() => {
    //If user is logged in return to home page
    if(!loggedIn){
      window.location.href = '/';
    }
  }, []);

  localStorage.clear("logged_in", "token");

  window.location.href = '/';

  return null;
}