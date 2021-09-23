import React, {useState} from "react";
import { useHistory } from "react-router-dom";
export default function LogOut(){
  let history = useHistory();

  localStorage.clear("logged_in", "token");

  window.location.href = '/';

  return null;
}