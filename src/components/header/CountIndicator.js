import React from "react";
import "./header.css";
import jwt_decode from "jwt-decode";


function CountIndicator() {
  let token = localStorage.getItem('products');
  var cartAmount = 0;

  if(token){
    let decoded = jwt_decode(token);
    cartAmount = decoded.productCount;
  }

  if (cartAmount === 0) {
    return null;
  } else {
    return <div id="cartCount">{cartAmount}</div>;
  }
}

export default CountIndicator;
